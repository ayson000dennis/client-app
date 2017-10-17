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
import { CategoryMenuPage } from '../page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../page-menu/page-sort-menu/page-sort-menu';
import { ApiService } from '../../service/api.service.component';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserFindDealsMapPage } from '../page-user-find-deals-map/page-user-find-deals-map';
import { Storage } from '@ionic/storage';
var UserFilteredDealsPage = (function () {
    // hasData :boolean = false
    function UserFilteredDealsPage(navCtrl, navParams, platform, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
    }
    UserFilteredDealsPage.prototype.ionViewWillEnter = function () {
        // this.hasData = true;
        this.filtered_business = this.navParams.get('business_category');
        console.log(this.filtered_business);
    };
    UserFilteredDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFilteredDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(CategoryMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(SortMenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(UserFindDealsMapPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.IonViewDidLoad = function () {
    };
    UserFilteredDealsPage.prototype.getBusiness = function (business) {
        console.log(business);
        this.navCtrl.push(UserDealsPage, { business: business }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserFilteredDealsPage;
}());
UserFilteredDealsPage = __decorate([
    Component({
        selector: 'page-user-filtered-deals',
        templateUrl: 'page-user-filtered-deals.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        ApiService,
        Storage])
], UserFilteredDealsPage);
export { UserFilteredDealsPage };
//# sourceMappingURL=page-user-filtered-deals.js.map