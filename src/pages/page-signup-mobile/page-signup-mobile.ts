import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Http }  from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SignupPage } from '../page-signup/page-signup';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { LoginPage } from '../page-login/page-login';
import { SignupMobileSuccessPage } from '../page-signup-mobile-success/page-signup-mobile-success';
import { SignupEmailPage } from '../page-signup-email/page-signup-email';

import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-signup-mobile',
  templateUrl: 'page-signup-mobile.html'
})

export class SignupMobilePage {
  userData: any;
  areaCode: any;

  posts: {email: string, password: string, number: string, account_type: string, status: string, permission: string} = {
    email: ' ',
    password: '',
    number: '',
    account_type: '1',
    status: '1',
    permission: '3'
  }

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private fb: Facebook,
    private gp: GooglePlus,
    public platform: Platform) {

    // platform.ready().then(() => {
    //   $('body').on('click', '.country-code, .country-dropdown-val', function() {
    //     console.log('1');
    //     $(this).closest('.holder-country-code').toggleClass('showDropdown');
    //
    //     if ($(this).hasClass('country-dropdown-val')) {
    //       var getImg = $(this).find('img').attr('src');
    //
    //       $(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
    //     }
    //   });
    // });
  }

  ionViewWillEnter() {
    this.areaCode = '1';
  }

  ionViewDidLoad() {
    console.log()
    var self = this;
    $('body').on('click', '.country-code, .country-dropdown-val', function() {
      $(this).closest('.holder-country-code').toggleClass('showDropdown');
      console.log('yes');

      if ($(this).hasClass('country-dropdown-val')) {
        var getImg = $(this).find('img').attr('src');
        self.areaCode = $(this).data('area');

        $(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
      }
    });
  }

  ionViewWillLeave() {
    $('body').off('click', '.country-code, .country-dropdown-val');
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

  goSignupEmail() {
    this.navCtrl.setRoot(SignupEmailPage, {}, {
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
    var getMobile = $('.form-signup').find('input[name="number"]'),
      getMobileVal = this.posts.number,
      mobileRegex = /^[0-9]{10}$/;

    if (getMobileVal) {
      getMobile.removeClass('has-error').next('.text-validate').text('');
      if (mobileRegex.test(getMobileVal)) {
        getMobileVal = "+" + this.areaCode + getMobileVal;

        $.ajax({
          url: '//gopage-api.herokuapp.com/api/users/send_sms/' + getMobileVal,
          type: 'POST',
          dataType: 'json',
          data: {
            number: getMobileVal
          },
          beforeSend: function() {
            getMobile.removeClass('has-error').next('.text-validate').text('');
            $('.form-signup .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
          }
        }).fail(function(err) {
          $('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
          if (err.status == 406) {
            getMobile.addClass('has-error').next('.text-validate').text('Mobile number has already been used.');
          }
          console.log(err);
        }).done(function(res) {
          $('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
          if (res.status == 400) {
            getMobile.addClass('has-error').next('.text-validate').text('Mobile number does not exist.');
          } else {
            var thisCode = res.number.code;
            console.log(thisCode);
            $('.form1').fadeOut('fast');
            setTimeout(function() {
              $('.form2').fadeIn('slow');
            },250);
          }
        });
      } else {
        getMobile.addClass('has-error').next('.text-validate').text('Mobile number is invalid.');
      }
    } else {
      getMobile.addClass('has-error').next('.text-validate').text('Please enter your mobile number.');
    }
  }

  verifyMe() {
    var getCode = $('.form-verify').find('input'),
      getCodeVal = getCode.val();

    if (getCodeVal) {
      $.ajax({
        url: '//gopage-api.herokuapp.com/api/users/verify_sms/' + getCodeVal,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
          $('.holder-verify-phone input').removeClass('has-error').next('.text-validate').text('');
          $('.form-verify .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
      }).fail(function(err) {
        $('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
        getCode.addClass('has-error').next('.text-validate').text('Verification Code is invalid.');
      }).done(function(res) {
        $('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
        console.log('Your mobile number has been verified.');
        getCode.removeClass('has-error').next('.text-validate').text('');
        $('.form2').fadeOut('fast');
        setTimeout(function() {
          $('.form3').fadeIn('slow');
        },250);
      });
    } else {
      getCode.addClass('has-error').next('.text-validate').text('Please enter the verification code we sent on your mobile.');
    }
  }

  createMyPass() {
    var getPass = $('.form-password').find('input:first-child'),
      getPassVal = getPass.val(),
      getPassConfirm = $('.form-password').find('input:nth-child(2)'),
      getPassConfirmVal = getPassConfirm.val(),
      thisPage = this;

    if (getPassVal && getPassConfirmVal) {
      if (getPassVal == getPassConfirmVal) {
        getPassConfirm.removeClass('has-error').next('.text-validate').text('');
        var numberVal = '+' + this.areaCode + this.posts.number;
        $.ajax({
          url: '//gopage-api.herokuapp.com/api/users/add',
          type: 'POST',
          dataType: 'json',
          data: {
            first_name: ' ',
            last_name: ' ',
            number: numberVal,
            password: getPassConfirmVal,
            email: this.posts.email,
            account_type: this.posts.account_type,
            status: this.posts.status,
            permission: this.posts.permission
          },
          beforeSend: function() {
            console.log(numberVal);
            $('.form-password input').removeClass('has-error').next('.text-validate').text('');
            $('.form-password .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
          }
        }).fail(function(err) {
          $('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();
          console.log(err);
        }).done(function(res) {
          $('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();

          thisPage.navCtrl.setRoot(SignupMobileSuccessPage, {}, {
            animate: true,
            direction: 'forward'
          });
        });
      } else {
        $('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Passwords do not match.');
      }
    } else {
      $('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Please enter your desired password.');
    }
  }
}
