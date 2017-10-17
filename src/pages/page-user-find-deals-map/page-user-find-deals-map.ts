import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';

import * as $ from "jquery";

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-find-deals-map',
  templateUrl: 'page-user-find-deals-map.html'
})

export class UserFindDealsMapPage {
  deals : string[];


  //google map
  map: any;
  default_location: any;
  markers = [];
  tempMarkers = [];

  //place.icon
  memberMarker = {
    url: 'https://cdn.filestackcontent.com/LMxusLVXREOzfotniwb6',
    size: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 30),
    scaledSize: new google.maps.Size(24, 20)
  };

  premiumMemberMarker = {
    url: 'https://cdn.filestackcontent.com/vOZ62vjnSrCsfUs6or1C',
    size: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 30),
    scaledSize: new google.maps.Size(24, 20)
  };

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private api : ApiService){

  }

  ionViewWillEnter(){
    // this.initMap();
    // var self = this;
    // var thisMap = function() {
    //   self.initMap();
    //   console.log('hello')
    // };
    //
    // var refreshIntervalId = setInterval(thisMap, 10000);
    //
    // if($('#viewMap').find('div').length > 0) {
    //   clearInterval(refreshIntervalId);
    // }
  }

  ionViewDidLoad() {
    this.initMap();
    var self = this;
    setTimeout(function(){
      self.initMap();
    }, 650);
  }

  initMap() {
    var self = this
    this.default_location = new google.maps.LatLng(34.0522, -118.2437);

    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: this.default_location,
      zoom: 9
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow();

    //Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat_lng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infowindow.setPosition(lat_lng);
        this.map.setCenter(lat_lng);
        this.map.setZoom(9);
        this.geocodeLatLng(geocoder, this.map, lat_lng);
      }, function() {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }

    var deal = document.getElementById('deal-name');
    var location = document.getElementById('deal-location');

    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: ['us', 'ca']}
    };

    var autocomplete = new google.maps.places.Autocomplete(location, options);
    var searchBox = new google.maps.places.SearchBox(deal);

    autocomplete.bindTo('bounds', self.map);
    searchBox.bindTo('bounds', self.map);

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
      map: self.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {

      self.removeMarkers();
      var place = autocomplete.getPlace();
      console.log(place)

      if (!place.geometry) return;

      if (place.geometry.viewport) {
        console.log(place.geometry.location)
        self.map.setCenter(place.geometry.location);
        self.map.fitBounds(place.geometry.viewport);
        self.map.setZoom(9);
      } else {
        self.map.setCenter(place.geometry.location);
      }

    });

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

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
       // Create a marker for each place.
       self.tempMarkers.push({
         lat: place.geometry.location.lat(),
         lng: place.geometry.location.lng(),
         icon: self.memberMarker
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
    data.forEach(d => {
      var position = new google.maps.LatLng(d.lat, d.lng);
      var inBounds = this.map.getBounds().contains(position);
      if (inBounds == true) {
        var marker = new google.maps.Marker({
          map: this.map,
          position: position,
          icon: d.icon
        });
        this.markers.push(marker);
      }
    });

    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.setContent(place.name);
    //   infowindow.open(this.map, this);
    // });

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
      console.log(this.map)
  }

  search() {

    this.api.Deals.deals_list().then(deals => {
      var businessHolder = deals.hits.hits;
      console.log(businessHolder)
      businessHolder.forEach(bus => {
        this.tempMarkers.push({
          lat: bus._source.business_id[0].lat,
          lng: bus._source.business_id[0].lng,
          icon: this.premiumMemberMarker
        });
      });
      console.log(this.tempMarkers);
      this.createMarker(this.tempMarkers);
    });

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
