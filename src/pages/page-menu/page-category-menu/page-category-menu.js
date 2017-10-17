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
//database service
import { ApiService } from '../../../service/api.service.component';
import { UserFindDealsPage } from '../../page-user-find-deals/page-user-find-deals';
var CategoryMenuPage = (function () {
    function CategoryMenuPage(navCtrl, api) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.hasData = false;
        this.first_word = [];
    }
    CategoryMenuPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.api.BusinessCategory.business_category().then(function (business_category) {
            _this.business_category = business_category;
            _this.hasData = true;
            business_category.forEach(function (business) {
                var category = business.name;
                var chena = category.split(/[ ,]+/);
                _this.first_word.push(chena[0].toLowerCase());
            });
            console.log(_this.first_word);
            _this.first_word.forEach(function (first_word) {
                console.log(first_word);
                _this.business_category.push(first_word);
                console.log(business_category);
            });
        });
    };
    CategoryMenuPage.prototype.seeAll = function () {
        this.navCtrl.setRoot(UserFindDealsPage, { business_category: null }, {
            animate: true,
            direction: 'back'
        });
    };
    CategoryMenuPage.prototype.goFilterBusiness = function (business_name) {
        var _this = this;
        // console.log(business_category);
        var business_category = {
            'category': business_name,
            'sort': '1'
        };
        var filtered = [];
        this.api.BusinessCategoryFilter.business_category_filter(business_category).then(function (business_filter) {
            _this.business_filter_data = business_filter;
            business_filter.forEach(function (filter) {
                if (filter.business_id.length !== 0) {
                    filtered.push(filter);
                }
            });
            _this.navCtrl.setRoot(UserFindDealsPage, { business_category: filtered }, {
                animate: true,
                direction: 'back'
            });
        });
    };
    CategoryMenuPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    return CategoryMenuPage;
}());
CategoryMenuPage = __decorate([
    Component({
        selector: 'page-category-menu',
        templateUrl: 'page-category-menu.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ApiService])
], CategoryMenuPage);
export { CategoryMenuPage };
//# sourceMappingURL=page-category-menu.js.map