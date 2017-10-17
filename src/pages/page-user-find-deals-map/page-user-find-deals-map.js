var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { MapsAPILoader } from '@agm/core';
var UserFindDealsMapPage = (function () {
    function UserFindDealsMapPage(mapsAPILoader, ngZone, navCtrl, platform, api) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.api = api;
        this.markers = [];
    }
    UserFindDealsMapPage.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 5;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new FormControl();
        //set current position
        this.setCurrentPosition();
        var self = this;
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            //   types: ["address"]
            // });
            var searchBox = new google.maps.places.SearchBox(_this.searchElementRef.nativeElement);
            searchBox.addListener("places_changed", function () {
                // this.ngZone.run(() => {
                //get the place result
                var places = searchBox.getPlaces();
                console.log(places);
                //verify result
                if (places.length == 0) {
                    return;
                }
                // Clear out the old markers.
                self.markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                self.markers = [];
                // For each place, get the icon, name and location.
                //  var bounds = new google.maps.LatLngBounds();
                var count = 1;
                places.forEach(function (place, i) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    //place.icon
                    var nonPartner = {
                        url: 'https://cdn.filestackcontent.com/LMxusLVXREOzfotniwb6',
                        size: new google.maps.Size(80, 80),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(15, 30),
                        scaledSize: new google.maps.Size(24, 20)
                    };
                    places[i].count = count;
                    count++;
                    // Create a marker for each place.
                    self.markers.push(new google.maps.Marker({
                        map: self.map,
                        icon: nonPartner,
                        title: place.name,
                        position: place.geometry.location
                    }));
                    //set latitude, longitude and zoom
                    // this.latitude = place.geometry.location.lat();
                    // this.longitude = place.geometry.location.lng();
                    // this.zoom = 12;
                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    }
                    else {
                        0;
                        ounds.extend(place.geometry.location);
                    }
                });
                this.map.fitBounds(this.map);
            });
        });
    };
    UserFindDealsMapPage.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    UserFindDealsMapPage.prototype.ionViewWillEnter = function () {
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
    };
    UserFindDealsMapPage.prototype.ionViewDidLoad = function () {
        // this.initMap();
        // var self = this;
        // setTimeout(function(){
        //   self.initMap();
        // }, 800);
    };
    // initMap() {
    //   var self = this
    //   this.default_location = new google.maps.LatLng(34.0522, -118.2437);
    //
    //   this.map = new google.maps.Map(document.getElementById('mapView'), {
    //     center: this.default_location,
    //     zoom: 9
    //   });
    //
    //   var geocoder = new google.maps.Geocoder;
    //   var infowindow = new google.maps.InfoWindow();
    //
    //   //Geolocation
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var lat_lng = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };
    //
    //       infowindow.setPosition(lat_lng);
    //       this.map.setCenter(lat_lng);
    //       this.map.setZoom(9);
    //       this.geocodeLatLng(geocoder, this.map, lat_lng);
    //     }, function() {
    //       // handleLocationError(true, infoWindow, map.getCenter());
    //     });
    //   } else {
    //     // Browser doesn't support Geolocation
    //     // handleLocationError(false, infoWindow, map.getCenter());
    //   }
    //
    //   var deal = document.getElementById('deal-name');
    //   var location = document.getElementById('deal-location');
    //
    //   var options = {
    //     types: ['(cities)'],
    //     componentRestrictions: {country: ['us', 'ca']}
    //   };
    //
    //   var autocomplete = new google.maps.places.Autocomplete(location, options);
    //   var searchBox = new google.maps.places.SearchBox(deal);
    //
    //   autocomplete.bindTo('bounds', self.map);
    //   searchBox.bindTo('bounds', self.map);
    //
    //   var infowindowContent = document.getElementById('infowindow-content');
    //   infowindow.setContent(infowindowContent);
    //
    //   var marker = new google.maps.Marker({
    //     map: self.map,
    //     anchorPoint: new google.maps.Point(0, -29)
    //   });
    //
    //   autocomplete.addListener('place_changed', function() {
    //
    //     self.removeMarkers();
    //     var place = autocomplete.getPlace();
    //     console.log(place)
    //
    //     if (!place.geometry) return;
    //
    //     if (place.geometry.viewport) {
    //       console.log(place.geometry.location)
    //       self.map.setCenter(place.geometry.location);
    //       self.map.fitBounds(place.geometry.viewport);
    //       self.map.setZoom(9);
    //     } else {
    //       self.map.setCenter(place.geometry.location);
    //     }
    //
    //   });
    //
    //   searchBox.addListener('places_changed', function() {
    //     var places = searchBox.getPlaces();
    //
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
    //      //place.icon
    //      var nonPartner = {
    //        url: 'https://cdn.filestackcontent.com/LMxusLVXREOzfotniwb6',
    //        size: new google.maps.Size(80, 80),
    //        origin: new google.maps.Point(0, 0),
    //        anchor: new google.maps.Point(15, 30),
    //        scaledSize: new google.maps.Size(24, 20)
    //      };
    //      places[i].count =  count;
    //      count++;
    //      // Create a marker for each place.
    //      self.markers.push(new google.maps.Marker({
    //        map: self.map,
    //        icon: nonPartner,
    //        title: place.name,
    //        position: place.geometry.location
    //      }));
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
    //
    // }
    //
    // createMarker(data) {
    //   data.forEach(d => {
    //     var position = new google.maps.LatLng(d._source.lat, d._source.lng);
    //     var inBounds = this.map.getBounds().contains(position);
    //     if (inBounds == true) {
    //       var marker = new google.maps.Marker({
    //         map: this.map,
    //         position: position
    //       });
    //       this.markers.push(marker);
    //     }
    //   });
    //
    //   // google.maps.event.addListener(marker, 'click', function() {
    //   //   infowindow.setContent(place.name);
    //   //   infowindow.open(this.map, this);
    //   // });
    //
    // }
    //
    // setMapOnAll(map) {
    //   this.markers.forEach(marker => {
    //     marker.setMap(map);
    //   });
    // }
    //
    // showMarkers() {
    //  this.setMapOnAll(this.map);
    // }
    //
    // removeMarkers() {
    //   this.setMapOnAll(null);
    //   this.markers = [];
    //
    //     console.log(this.markers)
    //     console.log(this.map)
    // }
    UserFindDealsMapPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsMapPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(CategoryMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.showSortMenu = function () {
        this.navCtrl.push(SortMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.goListView = function () {
        this.navCtrl.setRoot(UserFindDealsPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    return UserFindDealsMapPage;
}());
__decorate([
    ViewChild("search"),
    __metadata("design:type", ElementRef)
], UserFindDealsMapPage.prototype, "searchElementRef", void 0);
UserFindDealsMapPage = __decorate([
    Component({
        selector: 'page-user-find-deals-map',
        templateUrl: 'page-user-find-deals-map.html'
    }),
    __metadata("design:paramtypes", [MapsAPILoader,
        NgZone,
        NavController,
        Platform,
        ApiService])
], UserFindDealsMapPage);
export { UserFindDealsMapPage };
//# sourceMappingURL=page-user-find-deals-map.js.map