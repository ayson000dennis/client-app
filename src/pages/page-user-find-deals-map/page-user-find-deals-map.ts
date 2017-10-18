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
    $('#deal-location2').val('Los Angeles, CA');
  }

  initMap() {

    var self = this
    this.default_location = new google.maps.LatLng(34.0522, -118.24369999999999);

    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: this.default_location,
      zoom: 9
    });

    var geocoder = new google.maps.Geocoder;

    //Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat_lng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

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
       var photo = place.photos[0].getUrl({
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

       // Create a marker for each place.
      //  self.tempMarkers.push({
      //    lat: place.geometry.location.lat(),
      //    lng: place.geometry.location.lng(),
      //    icon: self.googleMarker,
      //    optimized: false
      //  });

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
        if (d.type === '1') {
          var icon = this.premiumMemberMarker;
        }
        else if (d.type === '2' || d.type === '0') {
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

        var content = '<div class="d-flex info-window"><div class="img-holder"><img src="'+d.photo+'"/></div>' +
                      '<div class="info-holder">' +
                        '<h3>'+d.title+'</h3>' +
                        '<p class="address-holder">'+d.address+'</p>' +
                      '</div></div>';
        marker.addListener('click', () => {
          infowindow.close();
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

  search() {
    this.removeMarkers();
    if($('#deal-location2').val() === '') {
      $('#deal-location2').val(this.selectedMapCenter);
    } else {
      $('#deal-location2').val(this.selectedMapCenter);
    }
    this.api.Deals.deals_list1().then(deals => {
      var businessHolder = deals.hits.hits;
      console.log(businessHolder)
      businessHolder.forEach(bus => {
        this.mapResults.push({
          title: bus._source.business_id[0].company_name,
          address: bus._source.business_id[0].city + ', ' + bus._source.business_id[0].state + ', ' + bus._source.business_id[0].country,
          lat: bus._source.business_id[0].lat,
          lng: bus._source.business_id[0].lng,
          photo: bus._source.photo.url,
          type: bus._source.business_id[0].business_type
        })
        // this.tempMarkers.push({
        //   lat: bus._source.business_id[0].lat,
        //   lng: bus._source.business_id[0].lng,
        //   icon: this.premiumMemberMarker
        // });
      });
      console.log(this.mapResults);
      this.createMarker(this.mapResults);
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
