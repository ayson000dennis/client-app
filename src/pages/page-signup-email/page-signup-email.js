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
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SignupPage } from '../page-signup/page-signup';
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { SignupSuccessPage } from '../page-signup-success/page-signup-success';
import { SignupMobilePage } from '../page-signup-mobile/page-signup-mobile';
import * as $ from "jquery";
import 'rxjs/add/operator/map';
import Config from '../../app/config';
var SignupEmailPage = (function () {
    function SignupEmailPage(navCtrl, http, fb, gp) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.posts = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            number: ' ',
            account_type: '1',
            status: '1',
            permission: '3'
        };
    }
    SignupEmailPage.prototype.goBack = function () {
        this.navCtrl.setRoot(SignupPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupEmailPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupEmailPage.prototype.goSignupMobile = function () {
        this.navCtrl.setRoot(SignupMobilePage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupEmailPage.prototype.fbConnect = function () {
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
    SignupEmailPage.prototype.gpConnect = function () {
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
    SignupEmailPage.prototype.signMeUp = function () {
        var _this = this;
        var getFName = this.posts.first_name, getLName = this.posts.last_name, getEmail = this.posts.email, getPass = this.posts.password, baseUrl = Config.baseUrl, checker = false;
        var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/, emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (getFName && getLName && getEmail && getPass) {
            checker = true;
            $('.form-signup label').each(function () {
                var thisInput = $(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder'), thisVal = thisInput.val();
                if (thisInputName !== 'password') {
                    if (thisInputName == 'first_name' || thisInputName == 'last_name') {
                        if (nameRegEx.test(thisVal) == true) {
                            thisInput.removeClass('has-error').siblings('.text-validate').text();
                            checker = true;
                        }
                        else {
                            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
                            checker = false;
                        }
                    }
                    else {
                        if (emailRegEx.test(thisVal) == true) {
                            thisInput.removeClass('has-error').siblings('.text-validate').text();
                            checker = true;
                        }
                        else {
                            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
                            checker = false;
                        }
                    }
                }
                else {
                    thisInput.removeClass('has-error').siblings('.text-validate').text();
                }
            });
            if (!$('.form-signup input').hasClass('has-error') && checker == true) {
                if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
                    $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                }
                this.http.post(baseUrl + 'api/users/add', this.posts).subscribe(function (res) {
                    console.log(res);
                    $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                    _this.navCtrl.setRoot(SignupSuccessPage, {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err.json());
                    $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                    $('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email already exists.');
                });
            }
        }
        else {
            $('.form-signup label').each(function () {
                var thisInput = $(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                console.log(thisInput.val());
                if (thisInputName == 'password') {
                    if (thisInput.val().length !== 0) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Password is required.');
                    }
                }
                else {
                    if (thisInput.val().length !== 0) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                    }
                }
            });
        }
    };
    return SignupEmailPage;
}());
SignupEmailPage = __decorate([
    Component({
        selector: 'page-signup-email',
        templateUrl: 'page-signup-email.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        Facebook,
        GooglePlus])
], SignupEmailPage);
export { SignupEmailPage };
//# sourceMappingURL=page-signup-email.js.map