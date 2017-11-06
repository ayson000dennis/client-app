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
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      // console.log(user)
       this.api.Loyalties.business(user._id).then(loyalty => {

      //  var biz_id = [];
       //
      //  for (var x = 0; x < loyalty.length; x++) {
      //    if ($.inArray(loyalty[x].business_id[0]._id, biz_id[x]) == -1) {
      //      console.log(biz_id);
      //      biz_id.push(loyalty[x].business_id[0]._id);
      //    }
      //  }
       //
      //  console.log(biz_id)

        this.loyalties = loyalty;
        this.hasData = true

        console.log(loyalty)
      });
    });
  }

  showCardDeals(business_id, business_name) {
    console.log(business_name)
    this.navCtrl.push(UserLoyaltyCardDealsPage, {business_id : business_id, business_name : business_name}, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }
}
