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
import * as _ from 'lodash';

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-find-deals',
  templateUrl: 'page-user-find-deals.html'
})

export class UserFindDealsPage {
  //google map
  map: any;
  default_location: any;
  markers = [];

  @ViewChild(Content) content: Content;

  pages : Array<{title: string, component: any}>;
  count: any;
  deals : any[];
  hasData : boolean = false;
  user : any;
  favorites : any;
  showPagination : boolean = true;

  // pager object and items
  pager: any = {};
  pagedDeals: any[];

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
    private sanitizer:DomSanitizer,
    private paginationService : PaginationService)
    {
    }


  ionViewWillEnter(){

    this.getFilteredDealsAndFavorites();

    if (this.deals == null) {
      this.getDealsAndFavorites();
      console.log('data from non filtered')
    } else {
      this.getFilteredDealsAndFavorites();
      this.setPagination(1);
      console.log('data from filtered')
    }

  }

  ionViewDidLoad() {
    this.initMap();
  }

  setPagination(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(this.deals.length, page);

    this.pagedDeals = this.deals.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.content.scrollToTop();

    if (this.pager.totalPages < 2) {
      this.showPagination = false;
    } else {
      this.showPagination = true;
    }

   $('.deals-total').text(this.pager.totalItems);
   $('.deals-found').text(this.pagedDeals.length);

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

  getDealsAndFavorites() {
    this.storage.get("user").then(user => {
      this.user = user;

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
      // this.api.Deals.deals_count().then(count => {
      //   this.count = count.count;
      // });

      this.api.Deals.deals_list().then(deals => {
        this.deals = [];
        deals.hits.hits.forEach(deal => {
          this.deals.push(deal._source);
        });
        this.hasData = true;
        this.setPagination(1);
        this.api.Favorites.favorite_list(user._id).then(favorites => {
          this.favorites = favorites;
          if(this.hasData) {
            this.favorites.forEach(favorite => {
              this.deals.forEach(deal => {
                if(deal.u_id === favorite.deals_id[0]._id){
                  deal.is_favorite = true;
                }
              });
            });
          }
        });
      }).catch(error => {
        console.log(error);
      });

    });
  }



  getFilteredDealsAndFavorites() {
    this.deals = this.navParams.get('business_category');
    if (this.deals != null) {
      this.hasData = true;
    }
  }


  goMapView() {
    this.navCtrl.setRoot(UserFindDealsMapPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  addToFavorites(deal) {

    let selectedButton = document.getElementById('addToFavorite' + deal.u_id);
    selectedButton.style.display = "none";
    selectedButton.className += " disabled";

    let deal_body = {
      deals_id : deal.u_id,
      business_id : deal.business_id[0]._id,
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

  getBusiness(template) {
    this.api.Business.business_deal(template).then(business => {
      this.navCtrl.push(UserDealsPage, {business: business.business}, {
        animate: true,
        direction: 'forward'
      });
    }).catch(error => {
      console.log(error);
    })
  }

  searchDeals() {
    this.api.Deals.deals_search(this.search.input).then(results => {
      var result = results.hits.hits;
      var filtered_deals = this.getDealsWithinBound(result);
      if (filtered_deals.length > 0) {
        this.deals = [];
        filtered_deals.forEach(deal => {
          this.deals.push(deal._source);
          this.setPagination(1);
        });
      } else {
        this.deals.splice(0, 0);
        this.deals = [];
        this.setPagination(1);
      }
    }).catch(error => {
      console.log(error);
    });
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

    var location = document.getElementById('deal-location');

    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: ['us', 'ca']}
    };

    var autocomplete = new google.maps.places.Autocomplete(location, options);

    autocomplete.bindTo('bounds', self.map);

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
      map: self.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {

      var place = autocomplete.getPlace();

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
      var position = new google.maps.LatLng(d._source.business_id[0].lat, d._source.business_id[0].lng);
      var inBounds = this.map.getBounds().contains(position);
      if (inBounds == true) {
        filtered_data.push(d);
      }

    });

    return filtered_data;
  }

}
