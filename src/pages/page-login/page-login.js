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
import { ResetPassPage } from '../page-reset-pass/page-reset-pass';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";
import 'rxjs/add/operator/map';
import Config from '../../app/config';
var LoginPage = (function () {
    function LoginPage(navCtrl, http, fb, gp, storage, api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.storage = storage;
        this.api = api;
        this.posts = {
            username: '',
            password: ''
        };
    }
    LoginPage.prototype.goSignup = function () {
        this.navCtrl.setRoot(SignupPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    LoginPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = Config.baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '4' }).subscribe(function (res) {
                    _this.getUser(res.json());
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    LoginPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) { return console.log(res); })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    LoginPage.prototype.goReset = function () {
        this.navCtrl.setRoot(ResetPassPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    LoginPage.prototype.logMeIn = function () {
        var _this = this;
        var getUser = this.posts.username, getPass = this.posts.password, baseUrl = Config.baseUrl;
        if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser && getPass) {
            this.http.post(baseUrl + 'api/users/login', this.posts).subscribe(function (res) {
                $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                _this.getUser(res.json());
            }, function (err) {
                $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                $('.form-login label').each(function () {
                    var thisInput = $(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                    if (thisInputName == 'username') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder);
                    }
                    else if (thisInputName == 'password') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid Password.');
                    }
                });
            });
        }
        else {
            $('.btn-green[type="submit"]').find('.fa-spinner').remove();
            $('.form-login label').each(function () {
                var thisInput = $(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                if (thisInputName == 'username') {
                    if (getUser) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                    }
                }
                else {
                    if (getPass) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Password is required .');
                    }
                }
            });
        }
    };
    LoginPage.prototype.getUser = function (token) {
        var _this = this;
        this.api.Users.user(token.user_id).then(function (user) {
            _this.storage.set('user', user);
            _this.navCtrl.setRoot(UserMembershipCardPage, {}, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'page-login.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        Facebook,
        GooglePlus,
        Storage,
        ApiService])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=page-login.js.map