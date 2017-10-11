import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

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

@Component({
  selector: 'page-user-find-deals',
  templateUrl: 'page-user-find-deals.html'
})

export class UserFindDealsPage {
  pages: Array<{title: string, component: any}>;
  deals : any[];
  hasData : boolean = false;
  user : any;
  favorites : any;

  // pager object and items
  pager: any = {};
  pagedDeals: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private api : ApiService,
    private storage : Storage,

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
      console.log(this.pagedDeals)
    }

  }

  setPagination(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(this.deals.length, page);

    this.pagedDeals = this.deals.slice(this.pager.startIndex, this.pager.endIndex + 1);


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

      this.api.Deals.deals_list().then(deals =>{
        this.deals = deals;
        this.hasData = true;
        this.setPagination(1);
        console.log(deals)
        this.api.Favorites.favorite_list(user._id).then(favorites => {
          this.favorites = favorites;
          // console.log(favorites);
          if(this.hasData){
            this.favorites.forEach(favorite => {
              this.deals.forEach(deal =>{
                  if(deal._id === favorite.deals_id[0]._id){
                      deal.is_favorite = true;
                  }
              });
            });
          }
        });
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

    let selectedButton = document.getElementById('addToFavorite' + deal._id);
    selectedButton.style.display = "none";
    selectedButton.className += " disabled";


    let deal_body = {
      deals_id : deal._id,
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
}
