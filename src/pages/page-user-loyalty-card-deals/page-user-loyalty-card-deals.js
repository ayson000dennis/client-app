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
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UserLoyaltyStampCardPage } from '../page-user-loyalty-stamp-card/page-user-loyalty-stamp-card';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
/**
 * Generated class for the PageUserLoyaltyCardDealsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserLoyaltyCardDealsPage = (function () {
    function UserLoyaltyCardDealsPage(navCtrl, navParams, api, storage, platform, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.hasData = true;
    }
    UserLoyaltyCardDealsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
        });
        this.business_id = this.navParams.get('business_id');
        this.business_name = this.navParams.get('business_name');
        console.log(this.business_name);
        this.storage.get('user').then(function (user) {
            _this.api.Loyalties.loyalty_customer_list(user._id, _this.business_id).then(function (deal) {
                _this.deals = deal;
                _this.hasData = true;
                console.log(deal);
            });
        });
    };
    UserLoyaltyCardDealsPage.prototype.goPrevious = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    UserLoyaltyCardDealsPage.prototype.goCard = function (title, stamps, stamps_needed) {
        this.navCtrl.push(UserLoyaltyStampCardPage, { title: title, stamps: stamps, stamps_needed: stamps_needed, }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserLoyaltyCardDealsPage;
}());
UserLoyaltyCardDealsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-user-loyalty-card-deals',
        templateUrl: 'page-user-loyalty-card-deals.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ApiService,
        Storage,
        Platform,
        ScreenOrientation])
], UserLoyaltyCardDealsPage);
export { UserLoyaltyCardDealsPage };
//# sourceMappingURL=page-user-loyalty-card-deals.js.map