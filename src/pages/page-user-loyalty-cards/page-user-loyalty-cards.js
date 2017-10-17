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
import { MenuPage } from '../page-menu/page-menu';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
import { UserLoyaltyCardDealsPage } from '../page-user-loyalty-card-deals/page-user-loyalty-card-deals';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
var UserLoyaltyCardsPage = (function () {
    function UserLoyaltyCardsPage(navCtrl, api, storage) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
    }
    UserLoyaltyCardsPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserLoyaltyCardsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(UserMembershipCardPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserLoyaltyCardsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            // console.log(user)
            _this.api.Loyalties.business(user._id).then(function (loyalty) {
                //  console.log(loyalty)
                _this.loyalties = loyalty;
                _this.hasData = true;
                // console.log(loyalty[0].busines)
            });
        });
    };
    UserLoyaltyCardsPage.prototype.showCardDeals = function (business_id, business_name) {
        console.log(business_name);
        this.navCtrl.push(UserLoyaltyCardDealsPage, { business_id: business_id, business_name: business_name }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserLoyaltyCardsPage;
}());
UserLoyaltyCardsPage = __decorate([
    Component({
        selector: 'page-user-loyalty-cards',
        templateUrl: 'page-user-loyalty-cards.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ApiService,
        Storage])
], UserLoyaltyCardsPage);
export { UserLoyaltyCardsPage };
//# sourceMappingURL=page-user-loyalty-cards.js.map