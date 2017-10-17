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
import { ResetPassPage } from '../page-reset-pass/page-reset-pass';
import { LoginPage } from '../page-login/page-login';
var ResetPassSuccessPage = (function () {
    function ResetPassSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ResetPassSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(ResetPassPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassSuccessPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    return ResetPassSuccessPage;
}());
ResetPassSuccessPage = __decorate([
    Component({
        selector: 'page-reset-pass-success',
        templateUrl: 'page-reset-pass-success.html'
    }),
    __metadata("design:paramtypes", [NavController])
], ResetPassSuccessPage);
export { ResetPassSuccessPage };
//# sourceMappingURL=page-reset-pass-success.js.map