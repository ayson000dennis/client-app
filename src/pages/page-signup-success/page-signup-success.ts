import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupEmailPage } from '../page-signup-email/page-signup-email';
import { LoginPage } from '../page-login/page-login';

@Component({
  selector: 'page-signup-success',
  templateUrl: 'page-signup-success.html'
})
export class SignupSuccessPage {
  constructor(public navCtrl: NavController ){
  }

  goBack() {
    this.navCtrl.setRoot(SignupEmailPage, {}, {
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
}
