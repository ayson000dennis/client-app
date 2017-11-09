import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';

import * as $ from "jquery";
import { Storage } from '@ionic/storage';

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-find-deals-map',
  templateUrl: 'page-user-find-deals-map.html'
})

export class UserFindDealsMapPage {
  deals : string[];
  business_deals: any[];
  searched_business_deals: any[];
  selected_location: any[];

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
  tempMarkers = [];
  mapResults = [];
  selectedMapCenter: {address: any, location: any} = {
    address: '', location: ''
  };

  //place.icon
  googleMarker = {
    url: 'https://cdn.filestackcontent.com/8BeI5gTQrG7u1R98oogt',
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(48, 50)
  };

  memberMarker = {
    url: 'https://cdn.filestackcontent.com/yRYj4h7URfKVAJfxNlLd',
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(48, 50)
  };

  premiumMemberMarker = {
    url: 'https://cdn.filestackcontent.com/spT9FsVTTiqszaTddma0',
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(48, 50)
  };

  thumb: any;
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
    public alertCtrl: AlertController,
    private geolocation: Geolocation,){

  }

  ionViewWillEnter(){

    var self = this;
    this.selectedMapCenter.address = this.navParams.get('map_address');
    this.business_deals = this.navParams.get('business_deals');
    console.log(this.business_deals)
    $('#deal-location2').on('click', function() {
      $(this).get(0).setSelectionRange(0,9999);
      // $(this).select();
      // $('.locations-holder').css('visibility', 'visible');
    });

    // $('.locations-holder').on('mousedown', function() {
    //   self.getLocation();
    // });

    // $('#deal-location2').on('blur', function() {
    //   $('.locations-holder').css('visibility', 'hidden');
    // });

    //location input tweak for ios
    $('#deal-location').on('keypress', function(){
      $('.scroll-content').animate({scrollTop: 1}, 'fast');
      setTimeout(()=>{
        $('.scroll-content').animate({scrollTop: 0}, 'fast');
      }, 50)
    });

    $('#deal-location2').contextmenu(function() {
      return false;
    });

  }

  ionViewDidLoad() {
    var self = this;
    setTimeout(function(){
      self.initMap();
      console.log('map initializing')
      $('#searchBtn2').click();
    }, 650);
  }

  initMap() {

    var self = this;
    var map_center = this.navParams.get('map_center');
    if(map_center !== '') {
      console.log('map center not null')
      var map_center = this.navParams.get('map_center');
      var search_input = this.navParams.get('search_input');

      this.default_location = map_center;
      $('#deal-name2').val(search_input);
      $('#deal-location2').val(this.selectedMapCenter.address);

      if (search_input !== '') {
        console.log('creating searched input')
        var business_deals = this.navParams.get('business_deals');
        setTimeout(function() {
          self.createMarker(business_deals);
        }, 1200);

      } else {
        console.log('creating all')
        // this.storage.get('all_business_deals').then(all_business_deals => {
        //   setTimeout(() => {
        //     this.createMarker(all_business_deals);
        //   });
        // });
      }
    } else {
      console.log('map center null')
      this.storage.get('user_selected_latlng').then(position => {
        this.lat = position.lat;
        this.lng = position.lng;
        this.storage.get('user_short_location').then(address => {
          this.address = address
          if(self.lat != null && self.lng != null) {
            this.default_location = new google.maps.LatLng(self.lat, self.lng);
            this.selectedMapCenter.address = self.address;
            $('#deal-location2').val(self.address);
          } else {
            this.default_location = new google.maps.LatLng(34.0522, -118.2437);
            $('#deal-location2').val('Los Angeles, CA');
          }
        });
      });
      this.storage.get('all_business_deals').then(all_business_deals => {
        setTimeout(() => {
          this.createMarker(all_business_deals);
        });
      });
      // var business_deals = this.navParams.get('business_deals');
      // setTimeout(function() {
      //   self.createMarker(business_deals);
      // }, 1200)
    }

    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: this.default_location,
      zoom: 10
    });

    this.geocoder = new google.maps.Geocoder;

    var deal = document.getElementById('deal-name');
    var location = document.getElementById('deal-location2');

    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: ['us', 'ca']}
    };

    var autocomplete = new google.maps.places.Autocomplete(location, options);
    autocomplete.bindTo('bounds', self.map);
    // var searchBox = new google.maps.places.SearchBox(deal);
    // searchBox.bindTo('bounds', self.map);

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

      self.storage.set('user_selected_latlng', user_selected_latlng)
      self.storage.set('user_short_location', location);
      self.storage.set('user_long_location', place.formatted_address);

      if (!place.geometry) return;

      if (place.geometry.viewport) {
        self.map.setCenter(place.geometry.location);
        self.map.fitBounds(place.geometry.viewport);
        self.map.setZoom(10);
      } else {
        self.map.setCenter(place.geometry.location);
      }

    });

    // need to stop prop of the touchend event (for ios devices)
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        setTimeout(function() {
            var container = document.getElementsByClassName('pac-container')[0];
            container.addEventListener('touchend', function(e) {
                e.stopImmediatePropagation();
            });
        }, 500);
    }

  //   searchBox.addListener('places_changed', function() {
  //     self.mapResults = [];
  //     var places = searchBox.getPlaces();
  //     console.log(places)
  //     if (places.length == 0) {
  //      return;
  //    }
  //    // Clear out the old markers.
  //    self.markers.forEach(marker => {
  //      marker.setMap(null);
  //    });
  //    self.markers = [];
   //
  //    // For each place, get the icon, name and location.
  //    var bounds = new google.maps.LatLngBounds();
   //
  //    var count = 1;
  //    places.forEach(function(place, i) {
  //      if (!place.geometry) {
  //        console.log("Returned place contains no geometry");
  //        return;
  //      }
   //
  //      places[i].count =  count;
  //      count++;
  //      var photo = place.photos[i].getUrl({
  //          'maxWidth' : 120,
  //          'maxHeight' : 120
  //      });
   //
  //      self.mapResults.push({
  //        title: place.name,
  //        address: place.formatted_address,
  //        lat: place.geometry.location.lat(),
  //        lng: place.geometry.location.lng(),
  //        photo: photo,
  //        type: 3
  //      });
   //
  //      if (place.geometry.viewport) {
  //        // Only geocodes have viewport.
  //        bounds.union(place.geometry.viewport);
  //      } else {
  //        bounds.extend(place.geometry.location);
  //      }
  //    });
  //    self.map.fitBounds(self.map);
  //  });

  }

  createMarker(data) {
    var infowindow = new google.maps.InfoWindow();
    data.forEach(d => {
        var position = new google.maps.LatLng(d.lat, d.lng);
        // var inBounds = this.map.getBounds().contains(position);
        // if (inBounds == true) {
          if (d.business_type === '1') {
            var icon = this.premiumMemberMarker;
          }
          else if (d.business_type === '2' || d.business_type === '0') {
            var icon = this.memberMarker;
          }
          else {
            var icon = this.googleMarker;
          }
          var marker = new google.maps.Marker({
            map: this.map,
            position: position,
            icon: icon,
            optimized: false
          });

          this.markers.push(marker);
          if (d.deal_id.length !== 0) {
            d.deal_id.forEach(deal => {
              if(deal.is_featured) {
                var img = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                d.featured_img = img;
              }
            });
            if(d.featured_img !== undefined) {
              this.thumb = d.featured_img;
            } else {
              if(d.deal_id[0].photo.url !== undefined) {
                this.thumb = d.deal_id[0].photo.url;
              } else {
                this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
              }
            }
          } else {
            if(d.files.length !== 0) {
              d.files.forEach(files => {
                var img = files.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                files.url = img;
              });
                this.thumb = d.files[0].url;
            } else {
              this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
            }
          }

          var self = this;
          var address = d.city + ', ' + d.state + ', ' + d.country;
          // var template = d.company_name.replace(/\s+/g, '-').replace(/'/g, "quote").toLowerCase().replace(/[^\w\-]+/g, '') + '&' + d.city.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');

          var content = '<div class="d-flex info-window"><div class="img-holder"><img src="'+this.thumb+'"/></div>' +
                        '<div class="info-holder">' +
                          '<div tappable id="businessInfo"><h3>'+d.company_name+'</h3></div>' +
                          '<p class="address-holder"><i class="fa fa-map-marker">'+d.address+'</p>' +
                          '<p class="phone-holder><i class="fa fa-phone"></i>'+ d.phone_number+'</p>'+
                          '<p class="web-holder><i class="fa fa-globe"></i>'+ d.company_website+'</p>'+
                        '</div></div>';
          marker.addListener('click', () => {
            infowindow.close();
            infowindow.setZIndex(9999);
            infowindow.setContent(content);
            infowindow.open(this.map, marker);

            $('#businessInfo').on('click', function() {
              self.getBusiness(d);
            });

          });

        // }
    });

    this.storage.get('user_selected_latlng').then(user_selected_latlng => {
      var position = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
      // this.map.setCenter(position);
      this.map.panTo(position);
    })

  }

  setMapOnAll(map) {
    this.markers.forEach(marker => {
      marker.setMap(map);
    });
  }

  showMarkers() {
   this.setMapOnAll(this.map);
  }

  removeMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      let position = {lat: lat, lng: lng};

      this.user_lat_lng = position;

      this.storage.set('user_selected_latlng', position);
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
          $('#deal-location').val(location);
          self.storage.set('user_short_location', location);
          self.storage.set('user_long_location', address);
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  selectFirstResult() {
    var self = this;
    var firstResult = $(".pac-container .pac-item:first").text();
    this.geocoder.geocode({"address": firstResult}, function(results, status) {
        if (status === 'OK') {
          var address = results[0].formatted_address;
          var city, state, country;
          console.log(results[0])
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

          self.storage.set('user_short_location', location);
          self.storage.set('user_long_location', address);
          self.storage.set('user_selected_latlng', user_selected_latlng);

          self.map.setCenter(results[0].geometry.location);
          $('#deal-location2').val(location);
        }
    });
  }

  searchBusinessDeals() {
    this.mapResults = [];
    this.removeMarkers();
    if($('#deal-location2').val() === '') {
      $('#deal-location2').addClass('danger');
      $('.alert-holder').fadeIn();
      setTimeout(function() {
        $('#deal-location2').removeClass('danger');
        $('.alert-holder').fadeOut();
      }, 3000);
    } else {
      var comma = $('#deal-location2').val().split(",").length - 1;
      if (comma !== 2) {
        this.selectFirstResult();
        this.searchApi();
      } else {
        this.searchApi();
      }
    }
  }

  searchApi() {
    var spinner = '<i class="fa fa-spinner fa-spin"></i>';

    $('.btn-search-deals').prop('disabled', true);
    // $('.fa.fa-search').hide();
    // $(spinner).appendTo('.search-banner .form-inline .btn-search-deals');

    var loader = '<div id="mapLoader"><div class="icon-holder"><i class="fa fa-spinner fa-spin"></i></div></div>';
    $(loader).appendTo('#mapView');
    $('#mapView div').first().css('opacity', 0.3);

    $('#deal-location2').val(this.selectedMapCenter.address);
    var user_input = $('#deal-name2').val();
    if (user_input !== '') {
      var businessApi = this.api.Business.business_deals_search(user_input);
      console.log(user_input);
    } else {
      console.log('empty deal name');
      var businessApi = this.api.Business.business_deals_list();
    }

    businessApi.then(business => {

      this.searched_business_deals = business.hits.hits;

      var businessHolder = business.hits.hits;

      businessHolder.forEach(bus => {
        this.mapResults.push(bus._source)
      });

      this.createMarker(this.mapResults);
      console.log(this.mapResults);

      $('.btn-search-deals').prop('disabled', false);
      // $('.fa.fa-search').show();
      // $('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();

      $('#mapLoader').remove();
      $('#mapView div:first-of-type').css('opacity', 1);

    });
  }

  getBusiness(business) {
    this.api.Business.business_view(business.u_id).then(business => {
      console.log(business)
      this.navCtrl.push(UserDealsPage, {business: business}, {
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
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

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  goBack() {
    this.navCtrl.setRoot(UserFindDealsPage, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

  showCategoryMenu() {
    this.navCtrl.push(CategoryMenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  showSortMenu() {
    this.navCtrl.push(SortMenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goListView() {
    this.search.input = $('#deal-name2').val();
    this.navCtrl.setRoot(UserFindDealsPage,
      {
        'business_deals': this.business_deals,
        'searched_business_deals': this.searched_business_deals,
        'search_input': this.search.input
      },
      {
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
        }
    );
  }
}
