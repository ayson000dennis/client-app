import { Component } from '@angular/core';
import { Platform, NavController,NavParams } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsMapPage } from '../page-user-find-deals-map/page-user-find-deals-map';

import * as $ from "jquery";
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-user-filtered-deals',
  templateUrl: 'page-user-filtered-deals.html'
})

export class UserFilteredDealsPage {
  pages: Array<{title: string, component: any}>;
  deals : string[]
  filtered_business : string[];
  // hasData :boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private api : ApiService,
  private storage : Storage){
  }

  ionViewWillEnter(){
    // this.hasData = true;
    this.filtered_business = this.navParams.get('business_category');
    console.log(this.filtered_business);

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

  goMapView() {
    this.navCtrl.setRoot(UserFindDealsMapPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  IonViewDidLoad() {

  }

  getBusiness(business){
    console.log(business)
    this.navCtrl.push(UserDealsPage, {business : business}, {
         animate: true,
         direction: 'forward'
    });
  }
}
