import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { UserLoyaltyCardsPage } from '../page-user-loyalty-cards/page-user-loyalty-cards';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-menu',
  templateUrl: 'page-menu.html'
})

export class MenuPage {
  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController) {

    this.pages = [
      { title: 'membership card', component: UserMembershipCardPage },
      { title: 'loyalty cards', component: UserLoyaltyCardsPage },
      { title: 'find deals', component: UserFindDealsPage },
      { title: 'favorites', component: UserFavoritesPage },
      { title: 'inbox', component: UserInboxPage }
    ];
  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component, {}, {
      animate: true,
      direction: 'back'
    });
  }

  logOut() {
    this.navCtrl.push(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }
}
