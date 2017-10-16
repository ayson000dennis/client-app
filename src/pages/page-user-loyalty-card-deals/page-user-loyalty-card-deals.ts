import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UserLoyaltyStampCardPage } from '../page-user-loyalty-stamp-card/page-user-loyalty-stamp-card';

import * as $ from "jquery";

import Config from '../../app/config';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

/**
 * Generated class for the PageUserLoyaltyCardDealsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-loyalty-card-deals',
  templateUrl: 'page-user-loyalty-card-deals.html',
})
export class UserLoyaltyCardDealsPage {
  deals: string[];
  business_id : any;
  hasData : boolean = true;
  business_name : string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api:ApiService,
    private storage: Storage,
    public platform: Platform,
    public screenOrientation: ScreenOrientation) {
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });

    this.business_id = this.navParams.get('business_id')
    this.business_name = this.navParams.get('business_name')
    console.log(this.business_name)

    this.storage.get('user').then(user => {

    this.api.Loyalties.loyalty_customer_list(user._id,this.business_id).then(deal => {
        this.deals = deal;
        this.hasData = true;
        console.log(deal)
      });

    });
  }

  goPrevious() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  goCard(title, stamps, stamps_needed) {
    this.navCtrl.push(UserLoyaltyStampCardPage, {title, stamps, stamps_needed,}, {
      animate: true,
      direction: 'forward'
    });
  }
}
