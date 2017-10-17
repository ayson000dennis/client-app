var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SignupPage } from '../page-signup/page-signup';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { LoginPage } from '../page-login/page-login';
import { SignupMobileSuccessPage } from '../page-signup-mobile-success/page-signup-mobile-success';
import { SignupEmailPage } from '../page-signup-email/page-signup-email';
import * as $ from "jquery";
import 'rxjs/add/operator/map';
import Config from '../../app/config';
var SignupMobilePage = (function () {
    function SignupMobilePage(navCtrl, http, fb, gp, platform) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.platform = platform;
        this.posts = {
            email: ' ',
            password: '',
            number: '',
            account_type: '1',
            status: '1',
            permission: '3'
        };
        platform.ready().then(function () {
            $('body').on('click', '.country-code, .country-dropdown-val', function () {
                console.log('1');
                $(this).closest('.holder-country-code').toggleClass('showDropdown');
                if ($(this).hasClass('country-dropdown-val')) {
                    var getImg = $(this).find('img').attr('src');
                    $(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
                }
            });
        });
    }
    SignupMobilePage.prototype.goBack = function () {
        this.navCtrl.setRoot(SignupPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupMobilePage.prototype.goLogin = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupMobilePage.prototype.goSignupEmail = function () {
        this.navCtrl.setRoot(SignupEmailPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupMobilePage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = Config.baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3' }).subscribe(function (res) {
                    _this.navCtrl.setRoot(UserMembershipCardPage, {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    SignupMobilePage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(UserMembershipCardPage, {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    SignupMobilePage.prototype.signMeUp = function () {
        var getMobile = $('.form-signup').find('input[name="number"]'), getMobileVal = this.posts.number, mobileRegex = /^[0-9]{5,14}$/;
        if (getMobileVal) {
            getMobile.removeClass('has-error').next('.text-validate').text('');
            if (mobileRegex.test(getMobileVal)) {
                getMobileVal = '+1' + getMobileVal;
                $.ajax({
                    url: '//gopage-api.herokuapp.com/api/users/send_sms/' + getMobileVal,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        number: getMobileVal
                    },
                    beforeSend: function () {
                        getMobile.removeClass('has-error').next('.text-validate').text('');
                        $('.form-signup .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                    }
                }).fail(function (err) {
                    $('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
                    console.log(err);
                }).done(function (res) {
                    $('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
                    var thisCode = res.number.code;
                    console.log(thisCode);
                    $('.form1').fadeOut('fast');
                    setTimeout(function () {
                        $('.form2').fadeIn('slow');
                    }, 250);
                });
            }
            else {
                getMobile.addClass('has-error').next('.text-validate').text('Mobile number is invalid.');
            }
        }
        else {
            getMobile.addClass('has-error').next('.text-validate').text('Please enter your mobile number.');
        }
    };
    SignupMobilePage.prototype.verifyMe = function () {
        var getCode = $('.form-verify').find('input'), getCodeVal = getCode.val();
        if (getCodeVal) {
            $.ajax({
                url: '//gopage-api.herokuapp.com/api/users/verify_sms/' + getCodeVal,
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    $('.holder-verify-phone input').removeClass('has-error').next('.text-validate').text('');
                    $('.form-verify .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                }
            }).fail(function (err) {
                $('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
                getCode.addClass('has-error').next('.text-validate').text('Verification Code is invalid.');
            }).done(function (res) {
                $('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
                console.log('Your mobile number has been verified.');
                getCode.removeClass('has-error').next('.text-validate').text('');
                $('.form2').fadeOut('fast');
                setTimeout(function () {
                    $('.form3').fadeIn('slow');
                }, 250);
            });
        }
        else {
            getCode.addClass('has-error').next('.text-validate').text('Please enter the verification code we sent on your mobile.');
        }
    };
    SignupMobilePage.prototype.createMyPass = function () {
        var getPass = $('.form-password').find('input:first-child'), getPassVal = getPass.val(), getPassConfirm = $('.form-password').find('input:nth-child(2)'), getPassConfirmVal = getPassConfirm.val(), thisPage = this;
        if (getPassVal && getPassConfirmVal) {
            if (getPassVal == getPassConfirmVal) {
                getPassConfirm.removeClass('has-error').next('.text-validate').text('');
                var numberVal = '+1' + this.posts.number;
                $.ajax({
                    url: '//gopage-api.herokuapp.com/api/users/add',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        number: numberVal,
                        password: getPassConfirmVal,
                        email: this.posts.email,
                        account_type: this.posts.account_type,
                        status: this.posts.status,
                        permission: this.posts.permission
                    },
                    beforeSend: function () {
                        console.log(numberVal);
                        $('.form-password input').removeClass('has-error').next('.text-validate').text('');
                        $('.form-password .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                    }
                }).fail(function (err) {
                    $('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();
                    console.log(err);
                }).done(function (res) {
                    $('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();
                    thisPage.navCtrl.setRoot(SignupMobileSuccessPage, {}, {
                        animate: true,
                        direction: 'forward'
                    });
                });
            }
            else {
                $('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Passwords do not match.');
            }
        }
        else {
            $('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Please enter your desired password.');
        }
    };
    return SignupMobilePage;
}());
SignupMobilePage = __decorate([
    Component({
        selector: 'page-signup-mobile',
        templateUrl: 'page-signup-mobile.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        Facebook,
        GooglePlus,
        Platform])
], SignupMobilePage);
export { SignupMobilePage };
//# sourceMappingURL=page-signup-mobile.js.map