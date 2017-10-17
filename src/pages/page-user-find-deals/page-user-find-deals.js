var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Content, Platform, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsMapPage } from '../page-user-find-deals-map/page-user-find-deals-map';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import * as $ from "jquery";
import { Storage } from '@ionic/storage';
import { PaginationService } from '../../directives/pagination/index.pagination';
var UserFindDealsPage = (function () {
    function UserFindDealsPage(navCtrl, navParams, platform, api, storage, sanitizer, paginationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.sanitizer = sanitizer;
        this.paginationService = paginationService;
        this.markers = [];
        this.hasData = false;
        this.showPagination = true;
        // pager object and items
        this.pager = {};
        //search
        this.search = {
            input: '',
            location: ''
        };
    }
    UserFindDealsPage.prototype.ionViewWillEnter = function () {
        this.getFilteredDealsAndFavorites();
        if (this.deals == null) {
            this.getDealsAndFavorites();
            console.log('data from non filtered');
        }
        else {
            this.getFilteredDealsAndFavorites();
            this.setPagination(1);
            console.log('data from filtered');
        }
    };
    UserFindDealsPage.prototype.ionViewDidLoad = function () {
        // this.initMap();
    };
    UserFindDealsPage.prototype.setPagination = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.deals.length, page);
        this.pagedDeals = this.deals.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.content.scrollToTop();
        if (this.pager.totalPages < 2) {
            this.showPagination = false;
        }
        else {
            this.showPagination = true;
        }
        $('.deals-total').text(this.pager.totalItems);
        $('.deals-found').text(this.pagedDeals.length);
    };
    UserFindDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(CategoryMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(SortMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.getDealsAndFavorites = function () {
        var _this = this;
        this.storage.get("user").then(function (user) {
            _this.user = user;
            // this.api.Deals.deals_list().then(deals =>{
            //   this.deals = deals;
            //   this.hasData = true;
            //   this.setPagination(1);
            //   console.log(deals)
            //   this.api.Favorites.favorite_list(user._id).then(favorites => {
            //     this.favorites = favorites;
            //     // console.log(favorites);
            //     if(this.hasData){
            //       this.favorites.forEach(favorite => {
            //         this.deals.forEach(deal =>{
            //             if(deal._id === favorite.deals_id[0]._id){
            //                 deal.is_favorite = true;
            //             }
            //         });
            //       });
            //     }
            //   });
            // });
            _this.api.Deals.deals_count().then(function (count) {
                _this.count = count.count;
            });
            _this.api.Deals.deals_list().then(function (deals) {
                _this.deals = [];
                deals.hits.hits.forEach(function (deal) {
                    _this.deals.push(deal._source);
                });
                _this.hasData = true;
                _this.setPagination(1);
                _this.api.Favorites.favorite_list(user._id).then(function (favorites) {
                    _this.favorites = favorites;
                    if (_this.hasData) {
                        _this.favorites.forEach(function (favorite) {
                            _this.deals.forEach(function (deal) {
                                if (deal.u_id === favorite.deals_id[0]._id) {
                                    deal.is_favorite = true;
                                }
                            });
                        });
                    }
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    UserFindDealsPage.prototype.getFilteredDealsAndFavorites = function () {
        this.deals = this.navParams.get('business_category');
        if (this.deals != null) {
            this.hasData = true;
        }
    };
    UserFindDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(UserFindDealsMapPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.addToFavorites = function (deal) {
        var selectedButton = document.getElementById('addToFavorite' + deal.u_id);
        selectedButton.style.display = "none";
        selectedButton.className += " disabled";
        var deal_body = {
            deals_id: deal.u_id,
            business_id: deal.business_id[0]._id,
            customer_id: this.user._id
        };
        this.api.Favorites.add_to_favorite(deal_body).then(function (favorite) {
            console.log(JSON.stringify(favorite.message));
        })
            .catch(function (error) {
            console.log(error._body);
        });
    };
    UserFindDealsPage.prototype.goToFavorites = function () {
        this.navCtrl.setRoot(UserFavoritesPage, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.getBusiness = function (template) {
        var _this = this;
        this.api.Business.business_deal(template).then(function (business) {
            _this.navCtrl.setRoot(UserDealsPage, { business: business.business }, {
                animate: true,
                direction: 'forward'
            });
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserFindDealsPage.prototype.searchDeals = function () {
        var _this = this;
        this.api.Deals.deals_search(this.search.input).then(function (results) {
            var result = results.hits.hits;
            var filtered_deals = _this.getDealsWithinBound(result);
            if (filtered_deals.length > 0) {
                _this.deals = [];
                filtered_deals.forEach(function (deal) {
                    _this.deals.push(deal._source);
                    _this.setPagination(1);
                });
            }
            else {
                _this.deals.splice(0, 0);
                _this.deals = [];
                _this.setPagination(1);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserFindDealsPage.prototype.initMap = function () {
        var self = this;
        this.default_location = new google.maps.LatLng(34.0522, -118.2437);
        this.map = new google.maps.Map(document.getElementById('mapView'), {
            center: this.default_location,
            zoom: 9
        });
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow();
        //Geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat_lng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infowindow.setPosition(lat_lng);
                this.map.setCenter(lat_lng);
                this.map.setZoom(9);
                this.geocodeLatLng(geocoder, this.map, lat_lng);
            }, function () {
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        }
        else {
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
        var location = document.getElementById('deal-location');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: ['us', 'ca'] }
        };
        var autocomplete = new google.maps.places.Autocomplete(location, options);
        autocomplete.bindTo('bounds', self.map);
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry)
                return;
            if (place.geometry.viewport) {
                self.map.setCenter(place.geometry.location);
                self.map.fitBounds(place.geometry.viewport);
                self.map.setZoom(9);
            }
            else {
                self.map.setCenter(place.geometry.location);
            }
        });
    };
    UserFindDealsPage.prototype.getDealsWithinBound = function (data) {
        var _this = this;
        var filtered_data = [];
        data.forEach(function (d) {
            var position = new google.maps.LatLng(d._source.business_id[0].lat, d._source.business_id[0].lng);
            var inBounds = _this.map.getBounds().contains(position);
            if (inBounds == true) {
                filtered_data.push(d);
            }
        });
        return filtered_data;
    };
    return UserFindDealsPage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], UserFindDealsPage.prototype, "content", void 0);
UserFindDealsPage = __decorate([
    Component({
        selector: 'page-user-find-deals',
        templateUrl: 'page-user-find-deals.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        ApiService,
        Storage,
        DomSanitizer,
        PaginationService])
], UserFindDealsPage);
export { UserFindDealsPage };
//# sourceMappingURL=page-user-find-deals.js.map