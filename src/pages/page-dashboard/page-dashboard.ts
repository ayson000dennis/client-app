import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';

import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { UserLoyaltyCardsPage } from '../page-user-loyalty-cards/page-user-loyalty-cards';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { SettingsPage } from '../page-settings/page-settings';

import {SocketService} from "../../providers";

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
  hasNotify : boolean = false;
  firstname : string;
  notifCount = 0;

  constructor(
    public navCtrl: NavController,
    public http : Http,
    private api:ApiService,
    private storage: Storage,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.initInboxNotification();
  }

  ionViewWillEnter() {

    this.socketService.connect();

    this.storage.get('user').then(user => {
      this.user = user;
      this.firstname = user.first_name;
      this.hasData = true;
    });
  }

  initInboxNotification() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      console.log('Notif from business');


      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.user_id == user._id) {
            this.hasNotify = true;
            this.notifCount++;
          }

        }).catch((error) => {
            console.log(error);
        });


      });

    });
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasNotify = false;
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
