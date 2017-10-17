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
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { UserLoyaltyCardsPage } from '../page-user-loyalty-cards/page-user-loyalty-cards';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
var MenuPage = (function () {
    function MenuPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.pages = [
            { title: 'membership card', component: UserMembershipCardPage },
            { title: 'loyalty cards', component: UserLoyaltyCardsPage },
            { title: 'find deals', component: UserFindDealsPage },
            { title: 'favorites', component: UserFavoritesPage },
            { title: 'inbox', component: UserInboxPage }
        ];
    }
    MenuPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.openPage = function (page) {
        this.navCtrl.setRoot(page.component, {}, {
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.logOut = function () {
        this.navCtrl.push(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Component({
        selector: 'page-menu',
        templateUrl: 'page-menu.html'
    }),
    __metadata("design:paramtypes", [NavController])
], MenuPage);
export { MenuPage };
//# sourceMappingURL=page-menu.js.map