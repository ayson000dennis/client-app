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
import { SignupPage } from '../page-signup/page-signup';
import * as $ from 'jquery';
var SliderPage = (function () {
    function SliderPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SliderPage.prototype.signUp = function () {
        this.navCtrl.setRoot(SignupPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.signIn = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.onSlideNext = function (slider) {
        if (slider.isEnd()) {
            $('.btn-green').trigger('click');
        }
    };
    return SliderPage;
}());
SliderPage = __decorate([
    Component({
        selector: 'page-slider',
        templateUrl: 'page-slider.html'
    }),
    __metadata("design:paramtypes", [NavController])
], SliderPage);
export { SliderPage };
//# sourceMappingURL=page-slider.js.map