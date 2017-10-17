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
import { SliderPage } from '../page-slider/page-slider';
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { SignupEmailPage } from '../page-signup-email/page-signup-email';
import { SignupMobilePage } from '../page-signup-mobile/page-signup-mobile';
import 'rxjs/add/operator/map';
import Config from '../../app/config';
var SignupPage = (function () {
    function SignupPage(navCtrl, http, fb, gp) {
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
    SignupPage.prototype.goBack = function () {
        this.navCtrl.setRoot(SliderPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupEmail = function () {
        this.navCtrl.setRoot(SignupEmailPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupMobile = function () {
        this.navCtrl.setRoot(SignupMobilePage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.fbConnect = function () {
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
    SignupPage.prototype.gpConnect = function () {
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
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-signup',
        templateUrl: 'page-signup.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        Facebook,
        GooglePlus])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=page-signup.js.map