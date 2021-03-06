import { Component, ViewChild } from '@angular/core';
import { Content, Platform, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsMapPage } from '../page-user-find-deals-map/page-user-find-deals-map';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';

import * as $ from "jquery";
import { Storage } from '@ionic/storage';
import { PaginationService } from '../../directives/pagination/index.pagination';
import * as _ from 'lodash';

import * as FastClick from 'fastclick';

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-find-deals',
  templateUrl: 'page-user-find-deals.html'
})

export class UserFindDealsPage {
  //default location
  default_lat: any = 34.0522;
  default_lng: any = -118.24369999999999;
  //google map
  lat: any;
  lng: any;
  map: any;
  address: any;
  geocoder: any;
  user_lat_lng = {};
  default_location: any;
  markers = [];
  selectedMapCenter: {address: any, location: any} = {
    address: '', location: ''
  };
  new_latlng: any;

  @ViewChild(Content) content: Content;

  pages : Array<{title: string, component: any}>;
  count: any;
  business_deals_holder : any[];
  business_deals : any[];
  searched_business_deals: any[];
  hasData : boolean = false;
  user : any;
  favorites : any;
  slice: number = 5;
  showPagination : boolean = true;
  businesses :string[];
  //search
  search: {input: string, location: string} = {
    input: '',
    location: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private api : ApiService,
    private storage : Storage,
    private geolocation: Geolocation,
    private paginationService : PaginationService)
    {
      // this.storage.get('all_business_deals').then(all_business_deals => {
      //   if(all_business_deals === null) {
      //     this.setBusinessDealsStorage();
      //   } else {
      //     return false;
      //   }
      // });
      $(function() {
        FastClick.attach(document.body);
      });
      $(document).on({
            'DOMNodeInserted': function() {
                $('.pac-container .pac-item, .pac-item span', this).addClass('needsclick');
            }
        });
    }


  ionViewWillEnter(){
    // $('.categories-header').hide();

    this.getUser();
    var self = this;
    this.setMapDataStorage();
    // this.dataDisplay();

    //jQuery Get current location
    $('#deal-location').on('click', function() {
      // $(this).select();
      $(this).get(0).setSelectionRange(0,9999);
      $('.pac-container').attr('data-tap-disabled', true);
      // $('.pac-item').attr('data-tap-disabled', true);
      // $('.locations-holder').css('visibility', 'visible');
    });

    $('#deal-location').contextmenu(function() {
      return false;
    });

    //location input tweak for ios
    $('#deal-location').on('keypress', function(){
      $('.scroll-content').animate({scrollTop: 1}, 'fast');
      setTimeout(()=>{
        $('.scroll-content').animate({scrollTop: 0}, 'fast');
      }, 50)
    });

    // $('.locations-holder').on('mousedown', function() {
    //   self.getLocation();
    // });

    //Set value catergory title display
    $('#selected-category').text('All Deals');

  }

  ionViewDidLoad() {
    var self = this;
    setTimeout(function(){
      self.initMap();
      self.dataDisplay();
      console.log('map initializing')
    }, 650);

    $('#deal-location2').val('Los Angeles, CA');

    if ($('.hasdeal-holder').is(':empty')){
      $(".hasdeal-holder").css("display", "none");
    }
  }

  setMapDataStorage() {
    this.storage.get('user_short_location').then(user_short_location => {
      // console.log(user_short_location)
      this.selectedMapCenter.address = user_short_location;
      // $('#deal-location').val(user_short_location);
      this.storage.get('user_selected_latlng').then(user_selected_latlng => {
        // console.log(user_selected_latlng)
        this.selectedMapCenter.location = user_selected_latlng;
      });
    });
  }

  dataDisplay() {
    this.storage.get('user_short_location').then(user_short_location => {
      this.selectedMapCenter.address = user_short_location;

      this.storage.get('user_selected_latlng').then(user_selected_latlng => {
        this.selectedMapCenter.location = user_selected_latlng;

        if(this.selectedMapCenter.address !== null) {

          this.default_location = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
          this.map.setCenter(this.default_location);
          $('#deal-location').val(user_short_location);

          // console.log(this.selectedMapCenter.address, this.selectedMapCenter.location)
          //business deals data from map view
          var searched_business_deals = this.navParams.get('searched_business_deals');
          if(searched_business_deals !== undefined) {

            console.log('searched deals from map');
            // console.log(searched_business_deals);
            var search_input = this.navParams.get('search_input');
            $('#deal-name').val(search_input);
            var filtered_searched_business_deals = this.getDealsWithinBound(searched_business_deals);
            if (filtered_searched_business_deals.length > 0) {
              this.business_deals = [];
              this.sortData(filtered_searched_business_deals);
            } else {
              console.log('empty searched')
              this.business_deals = [];
            }
          } else {
            this.getFilteredDealsAndFavorites();
            var business_deals = this.navParams.get('business_deals');
            if(business_deals !== undefined) {
              console.log('deals from find deals to map to find deals');
              this.business_deals = business_deals;
              this.hasData = true;
            } else {
              this.getFilteredDealsAndFavorites();

              if (this.business_deals === undefined) {
                this.storage.get('user_short_location').then(user_short_location => {
                  if (user_short_location !== null) {
                    this.searchBusinessDeals();
                  } else {
                    this.getBusinessDeals();
                  }
                });
                console.log('data from non filtered')
              } else {
                this.getFilteredDealsAndFavorites();
                console.log('data from filtered')
              }
            }
          }
        } else {

          this.storage.get('user_selected_latlng').then(user_selected_latlng => {
            this.storage.get('user_short_location').then(user_short_location => {
              // console.log('first enter find deals')
              if (user_short_location !== null) {
                this.default_location = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
                this.map.setCenter(this.default_location);
                $('#deal-location').val(user_short_location);
              } else {

                // console.log('ask permission')
                this.getBusinessDeals();
                this.getLocation();
                this.geocodeLatLng();
              }
            });

          }).catch(error => {
            console.log(error)
          });
        }

      });
    });
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  showCategoryMenu() {
    var user_input = $('#deal-name').val();
    this.navCtrl.push(CategoryMenuPage, {user_input: user_input, business_deals: this.business_deals}, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  showSortMenu() {
    this.navCtrl.push(SortMenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  getUser() {
    this.storage.get("user").then(user => {
      this.user = user;
    });
  }

  doInfinite(infiniteScroll) {
    if(this.business_deals.length <= this.slice) {
      infiniteScroll.complete();
    } else {
      setTimeout(() => {
        this.slice += 10;
        infiniteScroll.complete();
      }, 500);
    }
 }

 sortData(data) {
   var filtered_business_deals = [];
   var all_data = [];

   data = $.grep(data, function(val, i) {
     if (val._source.deal_id.length == 0) {
       filtered_business_deals.push(val);
     } else {
       return true;
     }
   });

   var sorted_business_deals = data.concat(filtered_business_deals);
   sorted_business_deals.forEach(business => {
     business._source.deal_id.forEach(deal => {
      var img = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
      deal.photo.url = img;
       if(deal.is_featured){
         business._source.featured_deal = deal;
       }
     });
    all_data.push(business._source);
   });

   this.api.Favorites.favorite_list(this.user._id).then(favorites => {
     this.favorites = favorites;
     if(this.hasData) {
       this.favorites.forEach(favorite => {
        all_data.forEach(business => {
           if(business.u_id === favorite.business_id[0]._id){
             business.is_favorite = true;
           }
         });
       });
     }
   });
   this.business_deals = all_data;
   this.hasData = true;
 }

 getBusinessDeals() {
   this.getUser();
   this.api.Business.business_deals_list().then(deals => {
     this.business_deals = [];
     var all_business_deals = deals;
     this.getFavorites();
     this.sortData(all_business_deals);
     this.hasData = true;
   }).catch(error => {
     console.log(error);
   });
 }

 // setBusinessDealsStorage() {
 //   this.getUser();
 //   this.api.Business.business_deals_list().then(deals => {
 //     var all_data = [];
 //     var all_business_deals = deals.hits.hits;
 //     all_business_deals.forEach(all => {
 //         all_data.push(all._source)
 //     });
 //    //  console.log(all_data);
 //     this.storage.set('all_business_deals', all_data);
 //   }).catch(error => {
 //     console.log(error);
 //   });
 // }

 getFavorites() {
   this.api.Favorites.favorite_list(this.user._id).then(favorites => {
     this.favorites = favorites;
     if(this.hasData) {
       this.favorites.forEach(favorite => {
         this.business_deals.forEach((business, i) => {
           if(business.u_id === favorite.business_id[0]._id){
             business.is_favorite = true;
           }
         });
       });
     }
   });
 }

  getFilteredDealsAndFavorites() {
    let filtered_business_deals = this.navParams.get('filtered_business_deals');
    let catergory_name = this.navParams.get('business_cat');
    if (filtered_business_deals != null) {
      var data = this.getDealsWithinBound(filtered_business_deals);
      this.sortData(data);
      //Set value catergory title display
      $('#selected-category').text(catergory_name);
      this.hasData = true;
    }
  }


  goMapView() {
    this.navCtrl.setRoot(UserFindDealsMapPage, {
      'business_deals': this.business_deals,
      'map_address': this.selectedMapCenter.address,
      'map_center': this.selectedMapCenter.location,
      'search_input': this.search.input
    }, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  addToFavorites(business) {
    let selectedButton = document.getElementById('addToFavorite' + business.u_id);
    selectedButton.style.display = "none";
    selectedButton.className += " disabled";

    var deal_id = [];
    var member_full_name = this.user.first_name + " " + this.user.last_name;

    if (business.deal_id.length !== 0) {
      business.deal_id.forEach(id => {
        deal_id.push(id)
      });
    } else {
      deal_id = [];
    }

    let deal_body = {
      deals_id : deal_id,
      business_id : business.u_id,
      customer_id : this.user._id,
      member_full_name : member_full_name
    };


    this.api.Favorites.add_to_favorite(deal_body).then(favorite => {
      console.log(JSON.stringify(favorite.message));
    })
    .catch(error => {
      console.log(error._body);
    });

  }

  goToFavorites() {
      this.navCtrl.setRoot(UserFavoritesPage, {
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
      });
  }

  getBusiness(business) {
    this.api.Business.business_view(business.u_id).then(business => {
      // console.log(business)
      this.navCtrl.push(UserDealsPage, {business: business}, {
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
      });
    });
  }

  searchBusinessDeals() {
    if($('#deal-location').val() === '') {
      $('#deal-location').addClass('danger');
      $('.alert-holder').fadeIn();
      setTimeout(function() {
        $('#deal-location').removeClass('danger');
        $('.alert-holder').fadeOut();
      }, 3000);
    } else {
      var comma = $('#deal-location').val().split(",").length - 1;
      if (comma !== 2) {
        this.selectFirstResult();
        this.searchApi();
        this.hasData = true;
      } else {
        this.searchApi();
        this.hasData = true;
      }
    }
  }

  searchApi() {
    var btn_spinner = '<i class="fa fa-spinner fa-spin"></i>';
    var main_spinner = '<div class="loader-holder">Loading &nbsp; <i class="fa fa-spinner fa-spin"></i></div>';

    $('.fa.fa-search').hide();
    $('.btn-search-deals').attr('disabled', true);
    $('#deal-location').attr('disabled', true);
    $(btn_spinner).appendTo('.search-banner .form-inline .btn-search-deals');
    $(main_spinner).appendTo('.scroll-content .categories-main');
    var businessApi;
    if (this.search.input !== '') {
      businessApi = this.api.Business.business_deals_search(this.search.input);
    } else {
      businessApi = this.api.Business.business_deals_list();
    }

    businessApi.then(results => {
      var result = results;
      var filtered_deals = this.getDealsWithinBound(result);
      if (filtered_deals.length !== 0) {
        this.business_deals = [];
        this.sortData(filtered_deals);
      } else {
        // this.business_deals.splice(0, 0);
        this.business_deals = [];
        // this.hasData = false;
      }

      $('.btn-search-deals').removeAttr('disabled');
      $('#deal-location').removeAttr('disabled');
      $('.fa.fa-search').show();
      $('.categories-header').show();
      $('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();
      $('.scroll-content .categories-main .loader-holder').remove();

    }).catch(error => {
      this.api.Business.catch(error).then(res => {
        alert(res.json());
      });
      this.hasData = false;
      $('.btn-search-deals').removeAttr('disabled');
      $('#deal-location').removeAttr('disabled');
      $('.fa.fa-search').show();
      $('.categories-header').show();
      $('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();
      $('.scroll-content .categories-main .loader-holder').remove();
      console.log(error);
    });
  }

  initMap() {
    var self = this

    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: self.default_location,
      zoom: 9
    });

    this.geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow();

    var location = document.getElementById('deal-location');
    var deal = document.getElementById('deal-name2');

    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: ['us', 'ca']}
    };

    var autocomplete = new google.maps.places.Autocomplete(location, options);
    // var searchBox = new google.maps.places.SearchBox(deal);

    autocomplete.bindTo('bounds', self.map);

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
      map: self.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      // need to stop prop of the touchend event
      if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        setTimeout(function() {
			        var container = document.getElementsByClassName('pac-container')[0];
			        console.log(container);
			        container.addEventListener('touchstart', function(e) {
			            e.stopImmediatePropagation();
			            setTimeout(function(){
                  },300);
			        });
			    }, 500);
      }
      var place = autocomplete.getPlace();
      var city, state, country;
      place.address_components.forEach(result => {
        if(result.types[0]=="locality") {
          city = result.long_name;
        }
        if(result.types[0]=="administrative_area_level_1") {
          state = result.short_name;
        }
        if(result.types[0]=="country") {
          country = result.long_name;
        }
      });

      var location = city + ', ' + state + ', ' + country;

      self.selectedMapCenter.address = location;
      self.selectedMapCenter.location = place.geometry.location;

      var selected_lat = place.geometry.location.lat();
      var selected_lng = place.geometry.location.lng();
      var user_selected_latlng = {lat: selected_lat, lng: selected_lng};
      this.new_latlng = user_selected_latlng;

      self.storage.set('user_selected_latlng', user_selected_latlng);
      self.storage.set('user_short_location', location);
      self.storage.set('user_long_location', place.formatted_address);

      $('#deal-location').val(location);
      $("#searchBtn").click();

      if (!place.geometry) return;

      if (place.geometry.viewport) {
        self.map.setCenter(place.geometry.location);
        self.map.fitBounds(place.geometry.viewport);
        self.map.setZoom(9);
      } else {
        self.map.setCenter(place.geometry.location);
      }

    });

  }

  getDealsWithinBound(data) {
    var filtered_data = [];

    data.forEach(d => {
      var position = new google.maps.LatLng(d._source.lat, d._source.lng);
      var inBounds = this.map.getBounds().contains(position);
      if (inBounds == true) {
        filtered_data.push(d);
      } else {
        // console.log('out of bounds')
      }

    });

    return filtered_data;
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      let position = {lat: lat, lng: lng};

      this.user_lat_lng = position;

      this.storage.set('user_selected_latlng', position);
      this.geocodeLatLng();
    }).catch((error) => {
      let lat = this.default_lat;
      let lng = this.default_lng;
      let position = {lat: lat, lng: lng};
      this.storage.set('user_selected_latlng', position);
      this.default_location = new google.maps.LatLng(34.0522, -118.2437);
      $('#deal-location').val('Los Angeles, CA');
      // console.log('Error getting location', error);
    });
  }


  geocodeLatLng() {
    var self = this;
    this.geocoder.geocode({'location': this.user_lat_lng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          var address = results[0].formatted_address;
          var city, state, country;
          results[0].address_components.forEach(result => {
            if(result.types[0]=="locality") {
              city = result.long_name;
            }
            if(result.types[0]=="administrative_area_level_2") {
              state = result.short_name;
            }
            if(result.types[0]=="country") {
              country = result.long_name;
            }
          });
          var location = city + ', ' + state + ', ' + country;
          self.selectedMapCenter.address = location;
          $('#deal-location').val(location);
          self.storage.set('user_short_location', location);
          self.storage.set('user_long_location', address);
        } else {
          // window.alert('No results found');
        }
        // self.searchBusinessDeals();
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  selectFirstResult() {
    var self = this;
    var firstResult = $(".pac-container .pac-item:first").text();
    this.geocoder.geocode({"address":firstResult }, function(results, status) {
        if (status === 'OK') {
          var address = results[0].formatted_address;
          var city, state, country;

          results[0].address_components.forEach(result => {
            if(result.types[0]=="locality") {
              city = result.long_name;
            }
            if(result.types[0]=="administrative_area_level_1") {
              state = result.short_name;
            }
            if(result.types[0]=="country") {
              country = result.long_name;
            }
          });

          var location = city + ', ' + state + ', ' + country;
          var user_selected_latlng = {lat: results[0].geometry.location.lat(),  lng: results[0].geometry.location.lng()}

          self.selectedMapCenter.address = location;
          self.selectedMapCenter.location = results[0].geometry.location;
          // console.log(location)
          // console.log(user_selected_latlng)
          self.storage.set('user_short_location', location);
          self.storage.set('user_long_location', address);
          self.storage.set('user_selected_latlng', user_selected_latlng);

          self.map.setCenter(results[0].geometry.location);
          $('#deal-location').val(location);
        }
    });
  }
}
