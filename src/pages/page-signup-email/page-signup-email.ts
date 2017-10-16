import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SignupPage } from '../page-signup/page-signup';
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { SignupSuccessPage } from '../page-signup-success/page-signup-success';
import { SignupMobilePage } from '../page-signup-mobile/page-signup-mobile';

import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-signup-email',
  templateUrl: 'page-signup-email.html'
})

export class SignupEmailPage {
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
    this.navCtrl.setRoot(SignupPage, {}, {
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

  signMeUp() {
    var getFName = this.posts.first_name,
      getLName = this.posts.last_name,
      getEmail = this.posts.email,
      getPass = this.posts.password,
      baseUrl = Config.baseUrl,
      checker = false;

    var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
      emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (getFName && getLName && getEmail && getPass) {
      checker = true;

      $('.form-signup label').each(function() {
        var thisInput = $(this).find('input'),
          thisInputName = thisInput.attr('name'),
          thisPlaceholder = thisInput.attr('placeholder'),
          thisVal = thisInput.val();

        if (thisInputName !== 'password') {
          if (thisInputName == 'first_name' || thisInputName == 'last_name') {
            if (nameRegEx.test(thisVal) == true) {
              thisInput.removeClass('has-error').siblings('.text-validate').text();
              checker = true;
            } else {
              thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
              checker = false;
            }
          } else {
            if (emailRegEx.test(thisVal) == true) {
              thisInput.removeClass('has-error').siblings('.text-validate').text();
              checker = true;
            } else {
              thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
              checker = false;
            }
          }
        } else {
          thisInput.removeClass('has-error').siblings('.text-validate').text();
        }
      });

      if (!$('.form-signup input').hasClass('has-error') && checker == true) {
        if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
          $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }

        this.http.post(baseUrl + 'api/users/add',this.posts).subscribe(res => {
          console.log(res);
          $('.btn-green[type="submit"]').find('.fa-spinner').remove();
          this.navCtrl.setRoot(SignupSuccessPage, {}, {
            animate: true,
            direction: 'forward'
          });
        }, err => {
          console.log(err.json());
          $('.btn-green[type="submit"]').find('.fa-spinner').remove();
          $('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email already exists.');
        });
      }
    } else {
      $('.form-signup label').each(function() {
        var thisInput = $(this).find('input'),
          thisInputName = thisInput.attr('name'),
          thisPlaceholder = thisInput.attr('placeholder');

          console.log(thisInput.val());

        if (thisInputName == 'password') {
          if (thisInput.val().length !== 0) {
            thisInput.removeClass('has-error').siblings('.text-validate').text();
          } else {
            thisInput.addClass('has-error').siblings('.text-validate').text('Password is required.');
          }
        } else {
          if (thisInput.val().length !== 0) {
            thisInput.removeClass('has-error').siblings('.text-validate').text();
          } else {
            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
          }
        }
      });
    }
  }
}
