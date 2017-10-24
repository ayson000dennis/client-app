import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';

import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { UserLoyaltyCardsPage } from '../page-user-loyalty-cards/page-user-loyalty-cards';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { SettingsPage } from '../page-settings/page-settings';

import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'page-dashboard.html'
})

export class DashboardPage {
  user : string;
  hasData : boolean = false;
  firstname : string;

  constructor(
    public navCtrl: NavController,
    public http : Http,
    private api:ApiService,
    private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.firstname = user.first_name;
      this.hasData = true;
    });
  }

  ToMembership() {
    this.navCtrl.setRoot(UserMembershipCardPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }

  ToLoyalty() {
    this.navCtrl.setRoot(UserLoyaltyCardsPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }

  ToFindDeals() {
    this.navCtrl.setRoot(UserFindDealsPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }

  ToFavorites() {
    this.navCtrl.setRoot(UserFavoritesPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }

  ToInbox() {
    this.navCtrl.setRoot(UserInboxPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }

  ToSettings() {
    this.navCtrl.setRoot(SettingsPage, {}, {
      animate: true,
      direction: ' forward'
    });
  }
}
