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
import { Platform, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";
var UserDealsPage = (function () {
    function UserDealsPage(navCtrl, platform, navParams, api, storage) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
    UserDealsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var self = this;
        var businessHolder = this.navParams.get('business');
        this.business = businessHolder.business_id[0];
        this.business_imgs = businessHolder.business_id[0].files;
        this.template = this.navParams.get('template');
        console.log(businessHolder);
        this.api.Deals.deals_list().then(function (deals) {
            _this.deals = deals;
            console.log(deals);
            _this.hasData = true;
            // console.log(this.deals)
        });
        // console.log(this.business);
        // if(this.business.operations[0] !== '2' && this.business.operations.length !== 0 && this.hasData == true){
        //
        //
        //   // this.business.operations.forEach(function(val,key){
        //   //     console.log(val);
        //   //
        //   //   // self.operations[this.days[key]] = val;
        //   //
        //   //   // console.log(self.operations);
        //   //
        //   // })
        //     // this.business.push({sample_data:{}});
        //     this.business['sample_data'] = {};
        //
        //     var sample_data = '';
        //     var length = this.business.operations.length;
        //
        //     // this.business.operations.splice(4,1);
        //
        //     for(var index_days = 0 ;index_days < this.business.operations.length; index_days++){
        //       for( var x = 0; x < this.days.length; x++){
        //         if(Object.keys(this.business.operations[index_days]) == this.days[x]){
        //           // console.log(this.days[x]);
        //           this.business.sample_data[this.days[x]] = this.business.operations[index_days][this.days[x]];
        //         }
        //       }
        //     }
        //
        //     console.log(this.business);
        //   // console.log(this.business.operations);
        // }
        // this.operations = this.business;
    };
    UserDealsPage.prototype.ionViewDidLoad = function () {
        this.initMap();
    };
    UserDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(MenuPage, {
            animate: true,
            direction: 'forward'
        });
    };
    UserDealsPage.prototype.goListView = function () {
        this.navCtrl.setRoot(UserFindDealsPage, {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserDealsPage.prototype.showHours = function () {
        if ($(".operations-list").hasClass("open")) {
            $(".operations-list").removeClass("open");
            $(".toggle-collapse").text("(show more)");
        }
        else {
            $(".operations-list").addClass("open");
            $(".toggle-collapse").text("(show less)");
        }
    };
    UserDealsPage.prototype.initMap = function () {
        var businessHolder2 = this.navParams.get('business');
        var business2 = businessHolder2.business_id[0];
        var lat = business2.lat;
        var lng = business2.lng;
        // var default_location = new google.maps.LatLng(lat, lng);
        var center = { lat: business2.lat, lng: business2.lng };
        var self = this;
        this.map = new google.maps.Map(document.getElementById('dealMapView'), {
            center: center,
            zoom: 9
        });
        var marker = new google.maps.Marker({
            position: center,
            map: this.map,
        });
    };
    return UserDealsPage;
}());
UserDealsPage = __decorate([
    Component({
        selector: 'page-user-deals',
        templateUrl: 'page-user-deals.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Platform,
        NavParams,
        ApiService,
        Storage])
], UserDealsPage);
export { UserDealsPage };
//# sourceMappingURL=page-user-deals.js.map