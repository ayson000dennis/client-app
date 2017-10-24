import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { DashboardPage } from '../page-dashboard/page-dashboard';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { MenuPage } from '../page-menu/page-menu';
import { UserDealsPage } from '../page-user-deals/page-user-deals';

import { ApiService } from '../../service/api.service.component';
import * as $ from "jquery";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-user-favorites',
  templateUrl: 'page-user-favorites.html'
})

export class UserFavoritesPage {
  pages: Array<{title: string, component: any}>;
  favorites : any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    private api : ApiService,
    private storage : Storage)
    {}

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
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

  ionViewWillEnter() {
    this.getFavorites();
  }

  getFavorites() {
    this.storage.get("user").then(user => {
      this.api.Favorites.favorite_list(user._id).then(favorites => {
        this.favorites = favorites;
      });
    });
  }

  getBusiness(business) {
    const alert = this.alertCtrl.create({
      title: 'Coming Soon',
      subTitle: 'This feature is under construction right now. Check back soon!',
      buttons: ['Dismiss']
    });
    alert.present();
    // console.log(business)
    // var template;
    // if(business.business_id[0].deal_id.length !== 0) {
    //   var temp = business.business_id[0].deal_id[0].template;
    //   var b_template = temp.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
    //   template = b_template;
    // } else {
    //   var name = business.business_id[0].company_name;
    //   var b_name = name.replace(/\s+/g, '-').toLowerCase();
    //   var city = business.business_id[0].city;
    //   var b_city = city.toLowerCase();
    //   template = b_name + '&' + b_city;
    // }
    // this.navCtrl.push(UserDealsPage, {template: template}, {
    //   animate: true,
    //   direction: 'forward'
    // });
  }

  removeFavorite(id, index) {
    const remove = this.alertCtrl.create({
     title : 'Are you sure you want to remove this in your favorites?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.api.Favorites.remove_to_favorites(id).then(response => {
              console.log(response);
            });
            this.favorites.splice(index, 1);
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data => {
            console.log('canceled');
          }
        }
      ]
    });

    remove.present();
  }
}
