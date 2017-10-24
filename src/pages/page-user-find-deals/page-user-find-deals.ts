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

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-find-deals',
  templateUrl: 'page-user-find-deals.html'
})

export class UserFindDealsPage {
  //google map
  lat: any;
  lng: any;
  map: any;
  address: any;
  geocoder: any;
  user_lat_lng = {};
  default_location: any;
  markers = [];
  selectedMapCenter: any;

  @ViewChild(Content) content: Content;

  pages : Array<{title: string, component: any}>;
  count: any;
  business_deals_holder : any[];
  business_deals : any[];
  hasData : boolean = false;
  user : any;
  favorites : any;
  slice: number = 5;
  showPagination : boolean = true;

  // pager object and items
  pager: any = {};
  pagedDeals: any[];
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
    }


  ionViewWillEnter(){
    var self = this;
    $('#deal-location').on('click', function() {
      $('.locations-holder').css('visibility', 'visible');
    });

    $('.locations-holder').on('mousedown', function() {
      self.getLocation();
    });

    $('#deal-location').on('blur', function() {
      $('.locations-holder').css('visibility', 'hidden');
    });

    this.getLocation();

    this.getFilteredDealsAndFavorites();

    if (this.business_deals == null) {
      this.getBusinessDeals();
      console.log('data from non filtered')
    } else {
      this.getFilteredDealsAndFavorites();
      console.log('data from filtered')
    }

  }

  ionViewDidLoad() {
    this.initMap();
    $('#deal-location2').val('Los Angeles, CA');

    if ($('.hasdeal-holder').is(':empty')){
      $(".hasdeal-holder").css("display", "none");
    }
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {
      animate: true,
      direction: 'back'
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  showCategoryMenu() {
    this.navCtrl.push(CategoryMenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  showSortMenu() {
    this.navCtrl.push(SortMenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  getUser() {
    this.storage.get("user").then(user => {
      this.user = user;
    });
  }

  doInfinite(infiniteScroll) {
   console.log('Begin async operation');

   setTimeout(() => {
     this.slice += 10;
     console.log(this.business_deals)
     console.log('Async operation has ended');
     infiniteScroll.complete();
   }, 500);
 }

 getBusinessDeals() {

   this.getUser();

   this.api.Business.business_deals_list().then(deals => {
     this.business_deals = [];
     var all_data = [];

     var all_business_deals = deals.hits.hits;
     var filtered_business_deals = [];

     all_business_deals = $.grep(all_business_deals, function(val, i) {
       if (val._source.deal_id.length == 0) {
         filtered_business_deals.push(val);
       } else {
         return true;
       }
     });

     var sorted_business_deals = all_business_deals.concat(filtered_business_deals);
     sorted_business_deals.forEach(all => {
         all_data.push(all._source);
     });

     this.business_deals = all_data;

     this.hasData = true;

     this.getFavorites();

   }).catch(error => {
     console.log(error);
   });

 }

 getFavorites() {
   this.api.Favorites.favorite_list(this.user._id).then(favorites => {
     this.favorites = favorites;
     if(this.hasData) {
       this.favorites.forEach(favorite => {
         this.business_deals.forEach(business => {
           if(business.u_id === favorite.business_id[0]._id){
             business.is_favorite = true;
           }
         });
       });
     }
   });
 }

  getFilteredDealsAndFavorites() {
    this.business_deals = this.navParams.get('business_category');
    if (this.business_deals != null) {
      this.hasData = true;
    }
  }


  goMapView() {
    this.navCtrl.setRoot(UserFindDealsMapPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  addToFavorites(business_id) {
    console.log(business_id)
    let selectedButton = document.getElementById('addToFavorite' + business_id);
    selectedButton.style.display = "none";
    selectedButton.className += " disabled";

    let deal_body = {
      deals_id : null,
      business_id : business_id,
      customer_id : this.user._id
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
        direction: 'back'
      });
  }

  getBusiness(business) {
    var template;
    if(business.deal_id.length !== 0) {
      var temp = business.deal_id[0].template;
      var b_template = temp.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
      template = b_template;
    } else {
      var name = business.company_name;
      var b_name = name.replace(/\s+/g, '-').toLowerCase();
      var city = business.city;
      var b_city = city.toLowerCase();
      template = b_name + '&' + b_city;
    }
    this.navCtrl.push(UserDealsPage, {template: template}, {
      animate: true,
      direction: 'forward'
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
      $('#deal-location').val(this.selectedMapCenter);
      this.api.Business.business_deals_search(this.search.input).then(results => {
        var result = results.hits.hits;
        console.log(results)
        var filtered_deals = this.getDealsWithinBound(result);
        console.log(filtered_deals)
        if (filtered_deals.length > 0) {
          this.business_deals = [];
          filtered_deals.forEach(deal => {
            this.business_deals.push(deal);
          });
        } else {
          this.business_deals.splice(0, 0);
          this.business_deals = [];
        }
      }).catch(error => {
        console.log(error);
      });
    }

  }

  initMap() {
    var self = this

    this.storage.get('user_position').then(position => {
      this.lat = position.lat;
      this.lng = position.lng;
      console.log(self.lat, self.lng)
      this.storage.get('user_address').then(address => {
        this.address = address
        if(self.lat != null && self.lng != null) {
          this.default_location = new google.maps.LatLng(34.0522, -118.2437);
          $('#deal-location').val(self.address);
          console.log('user position not null')
        } else {
          this.default_location = new google.maps.LatLng(self.lat, self.lng);
          $('#deal-location').val('Los Angeles, CA');
          console.log('user position null')
        }
      });
    }).catch(error => {
      console.log(error)
    });

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
    var searchBox = new google.maps.places.SearchBox(deal);

    autocomplete.bindTo('bounds', self.map);

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
      map: self.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {

      var place = autocomplete.getPlace();
      console.log(place.geometry.location.lat(), place.geometry.location.lng())
      self.selectedMapCenter = place.formatted_address;
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
      var position = new google.maps.LatLng(d.lat, d.lng);
      var inBounds = this.map.getBounds().contains(position);
      if (inBounds == true) {
        filtered_data.push(d);
      } else {
        console.log('out of bounds')
      }

    });
    console.log(filtered_data)
    return filtered_data;
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      let position = {lat: lat, lng: lng};

      this.user_lat_lng = position;

      this.storage.set('user_position', position);
      this.geocodeLatLng();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  geocodeLatLng() {
    var self = this;
    this.geocoder.geocode({'location': this.user_lat_lng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          var address = results[0].formatted_address;
          $('#deal-location').val(address);
          self.storage.set('user_address', address);
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
