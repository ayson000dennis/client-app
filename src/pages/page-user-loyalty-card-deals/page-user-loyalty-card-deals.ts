import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'

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
  selector: 'page-page-user-loyalty-card-deals',
  templateUrl: 'page-user-loyalty-card-deals.html',
})
export class UserLoyaltyCardDealsPage {
  deals: string[];
  business_id : any;
  hasData : boolean = true; 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api:ApiService,
    private storage: Storage) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.business_id = this.navParams.get('business_id')
    this.storage.get('user').then(user => {

    this.api.Loyalties.loyalty_customer_list(user._id,this.business_id).then(deal => {
        this.deals = deal;
        this.hasData = true;
        console.log(deal)
      });

    });
  }

  backToLoyaltyCards() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

}
