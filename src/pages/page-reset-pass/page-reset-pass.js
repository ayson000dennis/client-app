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
import { ResetPassSuccessPage } from '../page-reset-pass-success/page-reset-pass-success';
import { Http } from '@angular/http';
import * as $ from "jquery";
import 'rxjs/add/operator/map';
import Config from '../../app/config';
var ResetPassPage = (function () {
    function ResetPassPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.posts = {
            email: ''
        };
    }
    ResetPassPage.prototype.goBack = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassPage.prototype.resetMe = function () {
        var _this = this;
        var getUser = this.posts.email, baseUrl = Config.baseUrl;
        if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser) {
            this.http.post(baseUrl + 'api/users/sendemail', this.posts).subscribe(function (res) {
                $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                _this.navCtrl.setRoot(ResetPassSuccessPage, {}, {
                    animate: true,
                    direction: 'forward'
                });
            }, function (err) {
                $('.btn-green[type="submit"]').find('.fa-spinner').remove();
                $('.form-reset label').each(function () {
                    var thisInput = $(this).find('input'), thisPlaceholder = thisInput.attr('placeholder');
                    thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder + '. Are you sure you are registered?');
                });
            });
        }
        else {
            $('.btn-green[type="submit"]').find('.fa-spinner').remove();
            $('.form-reset label').each(function () {
                var thisInput = $(this).find('input'), thisPlaceholder = thisInput.attr('placeholder');
                thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
            });
        }
    };
    return ResetPassPage;
}());
ResetPassPage = __decorate([
    Component({
        selector: 'page-reset-pass',
        templateUrl: 'page-reset-pass.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http])
], ResetPassPage);
export { ResetPassPage };
//# sourceMappingURL=page-reset-pass.js.map