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
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { UserMembershipCardPage } from '../page-user-membership-card/page-user-membership-card';
import { MenuPage } from '../page-menu/page-menu';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
var UserFavoritesPage = (function () {
    function UserFavoritesPage(navCtrl, navParams, platform, alertCtrl, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.storage = storage;
    }
    UserFavoritesPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFavoritesPage.prototype.goBack = function () {
        this.navCtrl.setRoot(UserMembershipCardPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFavoritesPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFavoritesPage.prototype.ionViewWillEnter = function () {
        this.getFavorites();
    };
    UserFavoritesPage.prototype.getFavorites = function () {
        var _this = this;
        this.storage.get("user").then(function (user) {
            _this.api.Favorites.favorite_list(user._id).then(function (favorites) {
                _this.favorites = favorites;
                console.log(favorites);
            });
        });
    };
    UserFavoritesPage.prototype.getBusiness = function (business) {
        this.navCtrl.push(UserDealsPage, { business: business }, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFavoritesPage.prototype.removeFavorite = function (id, index) {
        var _this = this;
        var remove = this.alertCtrl.create({
            title: 'Are you sure you want to remove this in your favorites?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.api.Favorites.remove_to_favorites(id).then(function (response) {
                            console.log(response);
                        });
                        _this.favorites.splice(index);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'Cancel',
                    handler: function (data) {
                        console.log('canceled');
                    }
                }
            ]
        });
        remove.present();
    };
    return UserFavoritesPage;
}());
UserFavoritesPage = __decorate([
    Component({
        selector: 'page-user-favorites',
        templateUrl: 'page-user-favorites.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        AlertController,
        ApiService,
        Storage])
], UserFavoritesPage);
export { UserFavoritesPage };
//# sourceMappingURL=page-user-favorites.js.map