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
      direction: 'back',
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
    this.getFavorites();
  }

  getFavorites() {
    this.storage.get("user").then(user => {
      this.api.Favorites.favorite_list(user._id).then(favorites => {
        console.log(favorites)

          favorites.forEach(fav => {
            if(fav.business_id[0].files.length !=0) {
              var img = fav.business_id[0].files[0].url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
              fav.business_id[0].files[0].url = img;
            }
          });

        this.favorites = favorites;
      });
    });
  }

  getBusiness(business) {
    this.api.Business.business_view(business.business_id[0]._id).then(business => {
      console.log(business)
      this.navCtrl.push(UserDealsPage, {business: business}, {
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
      });
    });
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
