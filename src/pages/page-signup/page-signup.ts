import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SliderPage } from '../page-slider/page-slider';
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { SignupEmailPage } from '../page-signup-email/page-signup-email';
import { SignupMobilePage } from '../page-signup-mobile/page-signup-mobile';

import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-signup',
  templateUrl: 'page-signup.html'
})

export class SignupPage {
  userData: any;

  posts: {first_name: string, last_name: string, email: string, password: string, number: string, account_type: string, status: string, permission: string} = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    number: ' ',
    account_type: '1',
    status: '1',
    permission: '3'
  }

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private fb: Facebook,
    private gp: GooglePlus) {
  }

  goBack() {
    this.navCtrl.setRoot(SliderPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goLogin() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  goSignupEmail() {
    this.navCtrl.setRoot(SignupEmailPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  goSignupMobile() {
    this.navCtrl.setRoot(SignupMobilePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  fbConnect() {
    var baseUrl = Config.baseUrl;

    this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,email', []).then(profile => {
        this.http.post(baseUrl + 'api/users/login',{email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3'}).subscribe(res => {
          this.navCtrl.setRoot(UserMembershipCardPage, {}, {
            animate: true,
            direction: 'forward'
          });
        }, err => {
          console.log(err);
        });
      });
    }).catch(err => {
      console.log('Error logging into Facebook', err)
    });
  }

  gpConnect() {
    this.gp.login({})
      .then(res =>
        console.log(res));
        this.navCtrl.setRoot(UserMembershipCardPage, {}, {
          animate: true,
          direction: 'forward'
        })
      .catch(err => console.log('error -- ' + err));
  }
}
