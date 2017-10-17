var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../page-menu/page-menu';
import { UserChatPage } from '../page-user-chat/page-user-chat';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
// import { ApiServiceChat } from '../../service/api.service.component.chat';
import { SocketService } from "../../providers";
import * as $ from "jquery";
var UserInboxPage = (function () {
    function UserInboxPage(navCtrl, storage, api, _zone, socketService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.api = api;
        this._zone = _zone;
        this.socketService = socketService;
        this.hasData = false;
        this.hasNotify = false;
        this.message = [];
        this.init();
    }
    UserInboxPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            console.log(user);
            _this.api.Message.business_list(user._id).then(function (business) {
                _this.businessList = business;
                console.log(business);
                // var room_id = user._id +
                _this.hasData = true;
                _this.socketService.connect();
                $('body').find('.fa.loader').remove();
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserInboxPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
    };
    UserInboxPage.prototype.init = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    // if(chatNotification.user_id == user._id) {
                    //     this.hasNotify = true;
                    //     console.log('notify')
                    // }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.viewMessage = function (businessDetail, userDetail) {
        this.navCtrl.push(UserChatPage, {
            animate: true,
            direction: 'forward',
            "businessDetail": businessDetail,
            "userDetail": userDetail
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Component({
        selector: 'page-user-inbox',
        templateUrl: 'page-user-inbox.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Storage,
        ApiService,
        NgZone,
        SocketService])
], UserInboxPage);
export { UserInboxPage };
//# sourceMappingURL=page-user-inbox.js.map