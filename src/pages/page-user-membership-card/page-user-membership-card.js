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
import { Platform, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
var UserMembershipCardPage = (function () {
    function UserMembershipCardPage(navCtrl, navParams, platform, barcodeScanner, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.barcodeScanner = barcodeScanner;
        this.api = api;
        this.storage = storage;
        this.qrData = null;
        this.createdCode = null;
        this.scannedCode = null;
        this.hasData = false;
    }
    UserMembershipCardPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserMembershipCardPage.prototype.viewInbox = function () {
        this.navCtrl.setRoot(UserInboxPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserMembershipCardPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserMembershipCardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            console.log(user);
            var makeQr = {
                MembershipNumber: user.membership_number,
                Name: user.first_name + ' ' + user.last_name,
                MemberSince: user.created_at,
            };
            _this.createdCode = JSON.stringify(makeQr);
            _this.hasData = true;
        });
    };
    UserMembershipCardPage.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.scannedCode = barcodeData.text;
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    return UserMembershipCardPage;
}());
UserMembershipCardPage = __decorate([
    Component({
        selector: 'page-user-membership-card',
        templateUrl: 'page-user-membership-card.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        BarcodeScanner,
        ApiService,
        Storage])
], UserMembershipCardPage);
export { UserMembershipCardPage };
//# sourceMappingURL=page-user-membership-card.js.map