var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../page-menu/page-menu';
import { Storage } from '@ionic/storage';
//chat
import { Component, EventEmitter, NgZone, ViewChild } from "@angular/core";
import { DatabaseService, SocketService, UtilService } from "../../providers";
import * as $ from "jquery";
import { ApiService } from '../../service/api.service.component';
var UserChatPage = (function () {
    function UserChatPage(navCtrl, navParams, _zone, databaseService, socketService, storage, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._zone = _zone;
        this.databaseService = databaseService;
        this.socketService = socketService;
        this.storage = storage;
        this.api = api;
        this.hasData = false;
        this.hasNotify = false;
        this.businessDetail = this.navParams.get("businessDetail");
        this.userDetail = this.navParams.get("userDetail");
        this.btnEmitter = new EventEmitter();
        this.messages = [];
        this.chatBox = "";
        this.init();
        // console.log(this.businessDetail);
        // console.log(this.userDetail);
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var room_id = this.userDetail._id + this.businessDetail._id;
        // GET MESSAGES FROM DATABASE
        this.api.Message.fetch_chats(room_id).then(function (chats) {
            _this.messages = chats;
            _this.hasData = true;
            $('body').find('.fa.loader').remove();
            _this.scrollToBottom();
        }).catch(function (error) {
            console.log(error);
        });
        this.socketService.connect();
        this.socketService.joinRoom(room_id);
    };
    UserChatPage.prototype.init = function () {
        var _this = this;
        // Get real time message response
        this.socketService.messages.subscribe(function (chatMessage) {
            _this._zone.run(function () {
                _this.messages.push(chatMessage);
            });
            _this.scrollToBottom();
        });
    };
    UserChatPage.prototype.sendMessage = function () {
        this.btnEmitter.emit("sent clicked");
        this.txtChat.setFocus();
        var message = this.txtChat.content;
        this.send(message);
        this.txtChat.clearInput();
    };
    UserChatPage.prototype.send = function (message) {
        var user_id = this.userDetail._id, first_name = this.userDetail.first_name, last_name = this.userDetail.last_name, business_id = this.businessDetail._id;
        this.socketService.newRequest(UtilService.formatMessageRequest(user_id, business_id, first_name, last_name, message));
        this.chatBox = '';
        this.scrollToBottom();
    };
    UserChatPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
    };
    UserChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            });
        });
    };
    UserChatPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserChatPage;
}());
__decorate([
    ViewChild('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    ViewChild('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Component({
        selector: 'page-user-chat',
        templateUrl: 'page-user-chat.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        NgZone,
        DatabaseService,
        SocketService,
        Storage,
        ApiService])
], UserChatPage);
export { UserChatPage };
//# sourceMappingURL=page-user-chat.js.map