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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as $ from "jquery";
var UserLoyaltyStampCardPage = (function () {
    function UserLoyaltyStampCardPage(navCtrl, navParams, platform, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.title = this.navParams.get('title');
        this.stamps = this.navParams.get('stamps');
        this.stamps_needed = this.navParams.get('stamps_needed');
    }
    UserLoyaltyStampCardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        });
    };
    UserLoyaltyStampCardPage.prototype.ionViewDidEnter = function () {
        for (var x = 1; x <= this.stamps_needed; x++) {
            x == this.stamps_needed ?
                $('.holder-stamps').append('<div class="stamp"><span>FREE</span></div>') :
                $('.holder-stamps').append('<div class="stamp"><span>' + x + '</span></div>');
        }
        for (var x = 0; x <= this.stamps - 1; x++) {
            $('.stamp').eq(x).prepend('<img src="assets/images/stamp.png" alt="" />');
        }
        var stampWidth = $('.stamp').css('width');
        $('.stamp').css({ 'width': stampWidth, 'height': stampWidth });
        if (this.stamps_needed > 10) {
            $('.holder-stamps').css('width', parseInt(stampWidth) * (Math.ceil(this.stamps_needed / 2)));
        }
    };
    UserLoyaltyStampCardPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    return UserLoyaltyStampCardPage;
}());
UserLoyaltyStampCardPage = __decorate([
    Component({
        selector: 'page-user-loyalty-stamp-card',
        templateUrl: 'page-user-loyalty-stamp-card.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        ScreenOrientation])
], UserLoyaltyStampCardPage);
export { UserLoyaltyStampCardPage };
//# sourceMappingURL=page-user-loyalty-stamp-card.js.map