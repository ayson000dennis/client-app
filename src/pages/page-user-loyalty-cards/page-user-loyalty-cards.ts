import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';

import * as $ from "jquery";

import Config from '../../app/config';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

import { UserLoyaltyCardDealsPage } from '../page-user-loyalty-card-deals/page-user-loyalty-card-deals';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';

@Component({
  selector: 'page-user-loyalty-cards',
  templateUrl: 'page-user-loyalty-cards.html'
})

export class UserLoyaltyCardsPage {
  pages: Array<{title: string, component: any}>;
  user : string[];
  loyalties : string[];
  hasData:boolean = false;
  business_id : any;

  constructor(
    public navCtrl: NavController,
    private api:ApiService,
    private storage: Storage) {
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      console.log(user._id)
       this.api.Loyalties.business(user._id).then(loyalty => {
        //  console.log(loyalty)
        this.loyalties = loyalty;
        this.hasData = true

        console.log(this.loyalties.length);
      });
    });
  }

  showCardDeals(business_id, business_name) {
    console.log(business_name)
    this.navCtrl.push(UserLoyaltyCardDealsPage, {business_id : business_id, business_name : business_name}, {
      animate: true,
      direction: 'forward'
    });
  }
}
