import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
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
  selectedMapCenter: any;

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
    public platform: Platform,
    private api : ApiService,
    private storage : Storage,

    public alertCtrl: AlertController,
    private geolocation: Geolocation,){

  }

  ionViewWillEnter(){
    var self = this;
    $('#deal-location2').on('click', function() {
      $('.locations-holder').css('visibility', 'visible');
    });

    $('.locations-holder').on('mousedown', function() {
      self.getLocation();
    });

    $('#deal-location2').on('blur', function() {
      $('.locations-holder').css('visibility', 'hidden');
    });

    self.selectedMapCenter = 'Los Angeles, CA'
  }

  ionViewDidLoad() {
    this.initMap();
    var self = this;
    setTimeout(function(){
      self.initMap();
    }, 650);
  }

  initMap() {

    var self = this;

    this.storage.get('user_position').then(position => {
      this.lat = position.lat;
      this.lng = position.lng;
      console.log(self.lat, self.lng)
      this.storage.get('user_address').then(address => {
        this.address = address
        if(self.lat != null && self.lng != null) {
          this.default_location = new google.maps.LatLng(34.0522, -118.2437);
          $('#deal-location2').val(self.address);
        } else {
          this.default_location = new google.maps.LatLng(self.lat, self.lng);
          $('#deal-location2').val('Los Angeles, CA');
        }
      });
    });

    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: this.default_location,
      zoom: 9
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

    var searchBox = new google.maps.places.SearchBox(deal);
    searchBox.bindTo('bounds', self.map);

    var marker = new google.maps.Marker({
      map: self.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {

      self.removeMarkers();
      var place = autocomplete.getPlace();
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

    searchBox.addListener('places_changed', function() {
      self.mapResults = [];
      var places = searchBox.getPlaces();
      console.log(places)
      if (places.length == 0) {
       return;
     }
     // Clear out the old markers.
     self.markers.forEach(marker => {
       marker.setMap(null);
     });
     self.markers = [];

     // For each place, get the icon, name and location.
     var bounds = new google.maps.LatLngBounds();

     var count = 1;
     places.forEach(function(place, i) {
       if (!place.geometry) {
         console.log("Returned place contains no geometry");
         return;
       }

       places[i].count =  count;
       count++;
       var photo = place.photos[i].getUrl({
           'maxWidth' : 120,
           'maxHeight' : 120
       });

       self.mapResults.push({
         title: place.name,
         address: place.formatted_address,
         lat: place.geometry.location.lat(),
         lng: place.geometry.location.lng(),
         photo: photo,
         type: 3
       });

       if (place.geometry.viewport) {
         // Only geocodes have viewport.
         bounds.union(place.geometry.viewport);
       } else {
         bounds.extend(place.geometry.location);
       }
     });
     self.map.fitBounds(self.map);
   });

  }

  createMarker(data) {
    var infowindow = new google.maps.InfoWindow();
    data.forEach(d => {
      var position = new google.maps.LatLng(d.lat, d.lng);
      var inBounds = this.map.getBounds().contains(position);
      if (inBounds == true) {
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

        if (d.photo !== undefined) {
          this.thumb = d.photo;
        } else {
          this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
        }
        var address = d.city + ', ' + d.state + ', ' + d.country;
        var template = d.company_name.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '') + '&' + d.city.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');

        var content = '<div class="d-flex info-window"><div class="img-holder"><img src="'+this.thumb+'"/></div>' +
                      '<div class="info-holder">' +
                        '<div tappable (click)="getBusiness('+template+')"><h3>'+d.company_name+'</h3></div>' +
                        '<p class="address-holder"><i class="fa fa-map-marker">'+address+'</p>' +
                        '<p class="phone-holder><i class="fa fa-phone"></i>'+d.phone_number+'</p>'+
                        '<p class="web-holder><i class="fa fa-globe"></i>'+d.company_website+'</p>'+
                      '</div></div>';
        marker.addListener('click', () => {
          infowindow.close();
          infowindow.setZIndex(9999);
          infowindow.setContent(content);
          infowindow.open(this.map, marker);
        });
      }
    });

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

      console.log(this.markers)
      console.log(this.map.center.lat(), this.map.center.lng())
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
      $('#deal-location2').val(this.selectedMapCenter);
      var user_input = $('#deal-name').val();

      if (user_input !== '') {
        var businessApi = this.api.Business.business_deals_search(user_input);
        console.log(user_input);
      } else {
        console.log('empty deal name');
        var businessApi = this.api.Business.business_deals_list();
      }

      businessApi.then(business => {
        console.log(business.hits.hits)
        var businessHolder = business.hits.hits;
        console.log(businessHolder)
        businessHolder.forEach(bus => {
          this.mapResults.push(bus._source)
        });
        this.createMarker(this.mapResults);
        console.log(this.mapResults);
      });
    }
  }

  getBusiness(template) {
      const alert = this.alertCtrl.create({
        title: 'Coming Soon',
        subTitle: 'This feature is under construction right now. Check back soon!',
        buttons: ['Dismiss']
      });
      alert.present();
    // console.log(template)
    // this.navCtrl.push(UserDealsPage, {template: template}, {
    //   animate: true,
    //   direction: 'forward'
    // });
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
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

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {
      animate: true,
      direction: 'back'
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

  goListView() {
    this.navCtrl.setRoot(UserFindDealsPage, {}, {
      animate: true,
      direction: 'back'
    });
  }
}
