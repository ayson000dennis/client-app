var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as io from "socket.io-client";
import { SOCKET_HOST } from "./constants";
import { UtilService } from "./util.service";
import { DatabaseService } from "./database.service";
var SocketService = (function () {
    function SocketService(databaseService) {
        var _this = this;
        this.databaseService = databaseService;
        this.messages = Observable.create(function (observer) {
            _this.socketObserver = observer;
        });
        this.notify = Observable.create(function (observerNotify) {
            _this.socketObserverNotify = observerNotify;
        });
        this.init();
    }
    SocketService.prototype.init = function () {
        var _this = this;
        this.socket = io(SOCKET_HOST, { autoConnect: true });
        this.socket.on("connect", function () {
            console.debug('***Socket Connected***');
        });
        this.socket.on("reconnecting", function (attempt) {
            console.debug('***Socket Reconnecting***', attempt);
        });
        this.socket.on("reconnect_failed", function () {
            console.debug('***Socket Reconnect failed***');
        });
        this.socket.on('disconnect', function () {
            console.debug('***Socket Disconnected***');
        });
        // Get Message Response
        this.socket.on('message', function (response) {
            var chatMessage = response;
            // console.log(chatMessage);
            chatMessage.epoch = UtilService.getEpoch();
            _this.socketObserver.next(chatMessage);
        });
        // Real time notification
        this.socket.on('notify', function (response) {
            var chatNofitication = response;
            // console.log(chatMessage);
            _this.socketObserverNotify.next(chatNofitication);
        });
    };
    SocketService.prototype.newRequest = function (chatMessage) {
        // Send message
        chatMessage.epoch = UtilService.getEpoch();
        this.socketObserver.next(chatMessage);
        this.socket.emit('message_send', chatMessage);
    };
    SocketService.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    SocketService.prototype.connect = function () {
        this.socket.connect();
    };
    SocketService.prototype.joinRoom = function (room_id) {
        this.socket.emit('joinroom', room_id);
    };
    return SocketService;
}());
SocketService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], SocketService);
export { SocketService };
//# sourceMappingURL=socket.service.js.map