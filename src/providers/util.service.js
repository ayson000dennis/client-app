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
import moment from "moment";
var UtilService = (function () {
    function UtilService() {
    }
    UtilService.getEpoch = function () {
        return moment().unix();
    };
    UtilService.getCalendarDay = function (epoch) {
        if (!epoch) {
            return null;
        }
        var timeString = 'h:mm A';
        return moment(epoch * 1000).calendar(null, {
            sameDay: '[Today] ' + timeString,
            lastDay: '[Yesterday] ' + timeString,
            sameElse: 'MM/DD ' + timeString
        });
    };
    UtilService.formatMessageRequest = function (user_id, business_id, first_name, last_name, message) {
        return {
            user_id: user_id,
            business_id: business_id,
            first_name: first_name,
            last_name: last_name,
            message: message,
            is_read: false,
            message_by: "member"
        };
    };
    return UtilService;
}());
UtilService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UtilService);
export { UtilService };
//# sourceMappingURL=util.service.js.map