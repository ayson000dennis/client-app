webpackJsonp([1],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//database service


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
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], { business_category: filtered }, {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-category-menu',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/'<ion-content padding class="content-category-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list class="menu-list">\n\n    <ul class="categories-list" >\n\n      <li><a href="#"><img src="assets/icon/icon-alldeals.svg">All Deals</a></li>\n\n      <div *ngFor="let business of business_category; let k = index;">\n\n        <li (click)="goFilterBusiness(business.name)"><a href="#"><img src="assets/icon/icon-category-{{first_word[k]}}.svg">  {{ business.name }}</a></li>\n\n      </div>\n\n    </ul>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */]])
], CategoryMenuPage);

//# sourceMappingURL=page-category-menu.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SortMenuPage = (function () {
    function SortMenuPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SortMenuPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    return SortMenuPage;
}());
SortMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sort-menu',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-menu\page-sort-menu\page-sort-menu.html"*/'<ion-content padding class="content-sort-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list>\n\n    <h5>Sort by</h5>\n\n    <ion-item>\n\n      <ion-label>Sort by Relevance</ion-label>\n\n      <ion-checkbox [(ngModel)]="relevance"></ion-checkbox>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Sort by Distance</ion-label>\n\n      <ion-checkbox [(ngModel)]="distance"></ion-checkbox>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Sort by Favorites</ion-label>\n\n      <ion-checkbox [(ngModel)]="favorites"></ion-checkbox>\n\n    </ion-item>\n\n\n\n    <div class="sortby-button">\n\n      <button class="btn cancel-btn" role="button" (click)="goBack()">Cancel</button>\n\n      <button class="btn done-btn" role="button" (click)="goBack()">Done</button>\n\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-menu\page-sort-menu\page-sort-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SortMenuPage);

//# sourceMappingURL=page-sort-menu.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







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
        console.log(location);
        this.business = this.navParams.get('business');
        this.template = this.navParams.get('template');
        var self = this;
        console.log(this.business);
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
        console.log(this.operations);
    };
    UserDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserDealsPage.prototype.goPrevious = function () {
        this.navCtrl.pop();
    };
    UserDealsPage.prototype.showHours = function () {
        if (__WEBPACK_IMPORTED_MODULE_6_jquery__(".operations-list").hasClass("open")) {
            __WEBPACK_IMPORTED_MODULE_6_jquery__(".operations-list").removeClass("open");
            __WEBPACK_IMPORTED_MODULE_6_jquery__(".toggle-collapse").text("(show more)");
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_jquery__(".operations-list").addClass("open");
            __WEBPACK_IMPORTED_MODULE_6_jquery__(".toggle-collapse").text("(show less)");
        }
    };
    return UserDealsPage;
}());
UserDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/'<ion-header>\n\n  <ion-navbar *ngIf="hasData">\n\n    <i class="fa fa-chevron-left fa-lg" (click)="goPrevious()"></i>\n\n    <span class="business-title">{{business.company_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="deals-page">\n\n  <div *ngIf="hasData">\n\n    <ion-slides>\n\n      <ion-slide>\n\n        <img src="{{business.files.url !== unknown ? business.files.url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n      </ion-slide>\n\n    </ion-slides>\n\n\n\n    <div class="row">\n\n      <div class="col-12">\n\n        <h4 class="deal-title">{{template}}</h4>\n\n      </div>\n\n\n\n      <!-- <div class="col-12">\n\n        <div class="media" *ngFor="let deal of deals">\n\n          <img src="{{deal.photo.url !== unknown ? deal.photo.url : \'assets/images/placeholder.jpg\'}}" alt="{{deal.template}}">\n\n          <div class="media-body">\n\n            <a href="#"><h5>{{deal.template}}</h5></a>\n\n          </div>\n\n        </div>\n\n      </div> -->\n\n\n\n      <div class="col-12 share-deal">\n\n        <p>Share this deal</p>\n\n        <ul class="social-list">\n\n          <li><a href="#"><i class="fa fa-facebook fa-lg"></i></a></li>\n\n          <li><a href="#"><i class="fa fa-twitter fa-lg"></i></a></li>\n\n          <li><a href="#"><i class="fa fa-envelope fa-lg"></i></a></li>\n\n          <li><a href="#"><i class="fa fa-pinterest fa-lg"></i></a></li>\n\n        </ul>\n\n      </div>\n\n\n\n      <div class="col-12 about-business">\n\n        <h5 class="about-title">About {{business.company_name}}</h5>\n\n        <p class="about-description">{{business.description}}</p>\n\n\n\n        <ul class="social-links list-unstyled">\n\n          <li>\n\n            <i class="fa fa-map-marker fa-2x"></i>\n\n            <span class="business-name">{{business.company_name}}</span> <br>\n\n            <span class="business-address"> {{business.state}}, {{business.country}}, {{business.zip_postal}} </span>\n\n          </li>\n\n          <!-- <li *ngIf="business.operations.length === 0">\n\n          </li>\n\n          <li *ngIf="business.operations[0] === \'2\'">\n\n            <i class="fa fa-clock-o fa-2x"></i>\n\n            Open 24 Hours\n\n          </li>\n\n          <li *ngIf="business.operations[0] !== \'2\' && business.operations.length !== 0 && hasData === true">\n\n            <i class="fa fa-clock-o fa-2x"></i>\n\n              Opening Hours\n\n              <a class="toggle-collapse" (click)="showHours()">(show more)</a> -->\n\n              <!-- *ngFor="let operations of business.operations; let i = index" -->\n\n              <!-- <ul class="list-unstyled operations-list"> -->\n\n                 <!-- {{ business.sample_data.Monday.start }} -  {{ business.sample_data.Monday.end}}  -->\n\n                <!-- <li *ngIf="business.sample_data.Monday != null"><strong>Monday</strong> {{ business.sample_data.Monday.start }} -  {{ business.sample_data.Monday.end}}  </li>\n\n                <li *ngIf="business.sample_data.Tuesday != null"><strong>Tuesday</strong>  {{ business.sample_data.Tuesday.start }} -  {{ business.sample_data.Tuesday.end}}  </li>\n\n                <li *ngIf="business.sample_data.Wednesday != null"><strong>Wednesday</strong> {{ business.sample_data.Wednesday.start }} -  {{ business.sample_data.Wednesday.end}} </li>\n\n                <li *ngIf="business.sample_data.Thursday != null"><strong>Thursday</strong> {{ business.sample_data.Thursday.start }} -  {{ business.sample_data.Thursday.end}}</li>\n\n                <li *ngIf="business.sample_data.Friday != null"><strong>Friday</strong> {{ business.sample_data.Friday.start }} -  {{ business.sample_data.Friday.end}}</li>\n\n                <li *ngIf="business.sample_data.Saturday != null"><strong>Saturday</strong> {{ business.sample_data.Saturday.start }} -  {{ business.sample_data.Saturday.end}}</li>\n\n                <li *ngIf="business.sample_data.Sunday != null"><strong>Sunday</strong> {{ business.sample_data.Sunday.start }} -  {{ business.sample_data.Sunday.end}}</li>\n\n              </ul>\n\n          </li> -->\n\n          <li>\n\n            <i class="fa fa-phone fa-2x"></i>\n\n            {{business.phone_number}}\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-globe fa-2x"></i>\n\n            {{business.company_website}}\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-envelope fa-2x"></i>\n\n            {{business.business_email}}\n\n          </li>\n\n          <!-- <li>\n\n            <i class="fa fa-facebook fa-2x"></i>\n\n            GoPageApp\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-twitter fa-2x"></i>\n\n            @gopageapp\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-instagram fa-2x"></i>\n\n            @gopageco\n\n          </li> -->\n\n        </ul>\n\n      </div>\n\n\n\n      <div class="col-12 location-map">\n\n        <h5>Location</h5>\n\n        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1301.4096210792902!2d-123.1095483788257!3d49.27982224000646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x77c545b8651d683a!2sT%26T+Supermarket!5e0!3m2!1sen!2sph!4v1505114924507" id="google-map" frameborder="0" allowfullscreen></iframe>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(294);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(162);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__sql__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(163);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(753);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(295);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(411);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__socket_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SliderPage = (function () {
    function SliderPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SliderPage.prototype.signUp = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.signIn = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.onSlideNext = function (slider) {
        if (slider.isEnd()) {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('.btn-green').trigger('click');
        }
    };
    return SliderPage;
}());
SliderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-slider',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/'<!-- <ion-header no-shadow>\n\n  <ion-navbar>\n\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content no-bounce class="page-slider text-center">\n\n  <ion-slides pager="true" (ionSlideNextStart)="onSlideNext($event)">\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <!-- <p class="subtitle">\n\n        Helping members &amp; small<br> business win\n\n      </p> -->\n\n      <img class="slider-img main-image" src="assets/images/member-main-image.png" alt="">\n\n      <h3 class="main-title">Your Go To App for Local</h3>\n\n      <h3 class="main-title">Loyalty Deals &amp; Discounts</h3>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n\n\n      <img class="slider-img" src="assets/images/member-iphone-login.png" alt="">\n\n      <p class="subtitle">\n\n        With GoPage you are a preferred <br>customer and receive the best deals and <br> alerts from your favorite business.\n\n      </p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-qrcode.png" alt="">\n\n      <p class="subtitle">\n\n        Get rewarded for your loyalty! Use your <br>loyalty punchcard and redeem your <br> loyalty rewards from your favorite local <br> businesses.\n\n      </p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-map.png" alt="">\n\n      <p class="subtitle">\n\n        Your GoPage App finds the deals you are<br> looking for from registered GoPage <br>businesses.\n\n      </p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-messages.png" alt="">\n\n      <p class="subtitle">\n\n        Your favorite businesses alert <br>you first about deals, discounts <br>or events so you never miss out!\n\n      </p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n    </ion-slide>\n\n  </ion-slides>\n\n  <button class="btn-slider btn-green" (click)="signUp()">Get Started</button>\n\n  <button class="btn-slider btn-green-out" (click)="signIn()">Sign In</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFindDealsMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_find_deals_page_user_find_deals__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserFindDealsMapPage = (function () {
    function UserFindDealsMapPage(navCtrl, platform, api) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.api = api;
        this.hasData = false;
    }
    UserFindDealsMapPage.prototype.ionViewWillEnter = function () {
    };
    UserFindDealsMapPage.prototype.ionViewDidLoad = function () {
        this.initMap();
    };
    UserFindDealsMapPage.prototype.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 20
        });
        var input = document.getElementById('pac-input');
        // var card = document.getElementById('pac-card');
        // var types = document.getElementById('type-selector');
        // var strictBounds = document.getElementById('strict-bounds-selector');
        // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        // var infowindowContent = document.getElementById('infowindow-content');
        // infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            // infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17); // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            // infowindowContent.children['place-icon'].src = place.icon;
            // infowindowContent.children['place-name'].textContent = place.name;
            // infowindowContent.children['place-address'].textContent = address;
            // infowindow.open(map, marker);
        });
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        // function setupClickListener(id, types) {
        //   var radioButton = document.getElementById(id);
        //   radioButton.addEventListener('click', function() {
        //     autocomplete.setTypes(types);
        //   });
        // }
        // setupClickListener('changetype-all', []);
        // setupClickListener('changetype-address', ['address']);
        // setupClickListener('changetype-establishment', ['establishment']);
        // setupClickListener('changetype-geocode', ['geocode']);
        // document.getElementById('use-strict-bounds')
        //     .addEventListener('click', function() {
        //       console.log('Checkbox clicked! New state=' + this.checked);
        //       autocomplete.setOptions({strictBounds: this.checked});
        //     });
    };
    UserFindDealsMapPage.prototype.showMap = function () {
        //location lat -
        var location = new google.maps.LatLng(15.135524, 120.589630);
        //map options
        var options = {
            center: location,
            zoom: 20,
            mapTypeId: 'roadmap'
        };
        var map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarker(location, map);
        this.setupSearchBox();
        var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        var markers = [];
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
            var bounds = new google.map.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log('returned place contains no geometry');
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    };
    UserFindDealsMapPage.prototype.addMarker = function (position, map) {
        return new google.maps.Marker({
            position: position,
            map: map
        });
    };
    UserFindDealsMapPage.prototype.setupSearchBox = function () {
    };
    UserFindDealsMapPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsMapPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.goListView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return UserFindDealsMapPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], UserFindDealsMapPage.prototype, "mapRef", void 0);
UserFindDealsMapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-find-deals-map',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" placeholder="Search GoPage Deals">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" id="pac-input" placeholder="Los Angeles, CA">\n\n      </label>\n\n      <button class="fa fa-search btn-search-deals" type="submit"></button>\n\n    </form>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goListView()"><i class="fa fa-list"></i> Back to list</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1301.4096210792902!2d-123.1095483788257!3d49.27982224000646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x77c545b8651d683a!2sT%26T+Supermarket!5e0!3m2!1sen!2sph!4v1505114924507" id="google-map" frameborder="0" allowfullscreen></iframe> -->\n\n\n\n  <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box"> -->\n\n  <div #map id="map"></div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */]])
], UserFindDealsMapPage);

//# sourceMappingURL=page-user-find-deals-map.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFavoritesPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFavoritesPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-favorites',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="favorites-holder">\n\n    <p class="page-title">Favorites</p>\n\n    <div class="favorites media" *ngFor="let favorite of favorites; let i = index">\n\n      <div class="col-xs-8">\n\n        <div class="img-holder" tappable (click)="getBusiness(favorite.business_id[0])">\n\n          <img class="d-flex mr-3" [src]="favorite.deals_id[0].photo.url" alt="">\n\n        </div>\n\n        <div class="text-holder media-body" tappable (click)="getBusiness(favorite.business_id[0])">\n\n          <h3 class="title-text">{{favorite.deals_id[0].business_name}}</h3>\n\n          <div class="company-text">{{favorite.deals_id[0].title}}</div>\n\n          <div class="location-text">{{favorite.business_id[0].country}}</div>\n\n          <div class="expiration-text"><i class="fa fa-clock-o"></i> Expires {{favorite.deals_id[0].end_date | date : \'MM/dd/yyyy\'}}</div>\n\n          <i class="fa fa-chevron-right fa-2x"></i>\n\n        </div>\n\n      </div>\n\n\n\n      <div class="favorites-button">\n\n        <a class="btn remove-btn" tappable (click)="removeFavorite(favorite._id, i)">Remove</a>\n\n        <a class="btn btn-more" tappable (click)="getBusiness(favorite.business_id[0])">More Deals <i class="fa fa-chevron-right"></i></a>\n\n      </div>\n\n\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], UserFavoritesPage);

//# sourceMappingURL=page-user-favorites.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { ApiServiceChat } from '../../service/api.service.component.chat';


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
                __WEBPACK_IMPORTED_MODULE_7_jquery__('body').find('.fa.loader').remove();
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.viewMessage = function (businessDetail, userDetail) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
            animate: true,
            direction: 'forward',
            "businessDetail": businessDetail,
            "userDetail": userDetail
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /> <span *ngIf="hasNotify" class="count-msg">!</span> </a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <!-- <span [ngClass]="[customersList ? \'hidden\' : \'visible\']"> Inbox is empty </span> -->\n\n\n\n    <ion-list id="inbox-list">\n\n      <ion-item  *ngFor="let business of businessList;" tappable (click)="viewMessage(business.business_id[0],business.user_id[0])">\n\n        <span class="name" *ngIf="business.business_id[0] && business.business_id[0].company_name"> {{business.business_id[0].company_name}}  </span>\n\n\n\n        <span class="name" *ngIf="business.business_id[0] && !business.business_id[0].company_name"> No Company Name </span>\n\n\n\n        <span class="name" *ngIf="business.business_id && business.business_id.length == 0"> No Business Data </span>\n\n\n\n        <!-- <button id="btn-message" ion-button [disabled]="business.business_id && business.business_id.length == 0" (click)="viewMessage(business.business_id[0],business.user_id[0])"> MESSAGE </button> -->\n\n      </ion-item>\n\n\n\n      <!-- <ion-item>\n\n        <span class="name-new"> John Devera </span>\n\n\n\n        <span class="date-time-new"> 7:12am &nbsp;&nbsp; 10/30/17 </span>\n\n\n\n        <p class="message-new">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget velit leo. Etiam a ipsum et elit maximus volutpat non quis leo. Morbi viverra auctor nibh egestas finibus. Maecenas egestas augue in posuere hendrerit. Cras posuere fermentum dui, nec posuere nisl facilisis ut. Duis aliquam, diam tristique faucibus venenatis, mi ante mollis elit, non pulvinar leo orci pharetra augue. Donec dignissim eu velit id imperdiet. Donec sit amet facilisis quam. Duis non risus sodales ante sollicitudin rhoncus et a nulla. </p>\n\n\n\n      </ion-item> -->\n\n      <span class="fa fa-spinner fa-spin loader"></span>\n\n    </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_6__providers__["c" /* SocketService */]])
], UserInboxPage);

//# sourceMappingURL=page-user-inbox.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sql; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DB_NAME = '__mojoapp';
var win = window;
var Sql = (function () {
    function Sql(platform) {
        var _this = this;
        this.platform = platform;
        this._dbPromise = new Promise(function (resolve, reject) {
            try {
                var _db_1;
                _this.platform.ready().then(function () {
                    if (_this.platform.is('cordova') && win.sqlitePlugin) {
                        _db_1 = win.sqlitePlugin.openDatabase({
                            name: DB_NAME,
                            location: 'default'
                        });
                    }
                    else {
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db_1 = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db_1);
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }
    // Initialize the DB with our required tables
    Sql.prototype._tryInit = function () {
        this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(function (err) {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    };
    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._dbPromise.then(function (db) {
                    db.transaction(function (tx) {
                        tx.executeSql(query, params, function (tx, res) { return resolve({ tx: tx, res: res }); }, function (tx, err) { return reject({ tx: tx, err: err }); });
                    }, function (err) { return reject({ err: err }); });
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
    };
    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.get = function (key) {
        return this.query('select key, value from kv where key = ? limit 1', [key]).then(function (data) {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    };
    /**
     * Set the value in the database for the given key. Existing values will be overwritten.
     * @param {string} key the key
     * @param {string} value The value (as a string)
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.set = function (key, value) {
        return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    };
    Sql.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                throw e; // rethrowing exception so it can be handled with .catch()
            }
        });
    };
    Sql.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    /**
     * Remove the value in the database for the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.remove = function (key) {
        return this.query('delete from kv where key = ?', [key]);
    };
    /**
     * Clear all keys/values of your database.
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.clear = function () {
        return this.query('delete from kv');
    };
    return Sql;
}());
Sql = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
], Sql);

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatabaseService = (function () {
    function DatabaseService(_db) {
        this._db = _db;
    }
    //
    // Shared getter setter
    //
    DatabaseService.prototype.set = function (key, value) {
        return this._db.set(key, value)
            .then(function () { return true; })
            .catch(function (err) {
            console.error('[Error] Saving ' + key + ' - ' + JSON.stringify(err));
            return false;
        });
    };
    DatabaseService.prototype.get = function (key) {
        return this._db.get(key)
            .then(function (value) {
            if (value) {
                return value;
            }
            else {
                throw new Error('Undefined value');
            }
        })
            .catch(function (err) {
            console.error('[Error] Getting ' + key + ' - ' + JSON.stringify(err));
            return null;
        });
    };
    DatabaseService.prototype.remove = function (key) {
        return this._db.remove(key)
            .then(function () { return true; })
            .catch(function (err) {
            console.error('[Error] Removing ' + key + ' - ' + JSON.stringify(err));
            return false;
        });
    };
    DatabaseService.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (err) {
                console.error('Storage getJson(): unable to parse value for key', key, ' as JSON');
                return null;
            }
        });
    };
    DatabaseService.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (err) {
            return Promise.resolve(false);
        }
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sql__["a" /* Sql */]])
], DatabaseService);

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupMobilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_email_page_signup_email__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SignupMobilePage = (function () {
    function SignupMobilePage(navCtrl, http, fb, gp, platform) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.platform = platform;
        this.posts = {
            email: ' ',
            password: '',
            number: '',
            account_type: '1',
            status: '1',
            permission: '3'
        };
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('body').on('click', '.country-code, .country-dropdown-val', function () {
                console.log('1');
                __WEBPACK_IMPORTED_MODULE_10_jquery__(this).closest('.holder-country-code').toggleClass('showDropdown');
                if (__WEBPACK_IMPORTED_MODULE_10_jquery__(this).hasClass('country-dropdown-val')) {
                    var getImg = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('img').attr('src');
                    __WEBPACK_IMPORTED_MODULE_10_jquery__(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
                }
            });
        });
    }
    SignupMobilePage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupMobilePage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupMobilePage.prototype.goSignupEmail = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_signup_email_page_signup_email__["a" /* SignupEmailPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupMobilePage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_12__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3' }).subscribe(function (res) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    SignupMobilePage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    SignupMobilePage.prototype.signMeUp = function () {
        var getMobile = __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup').find('input[name="number"]'), getMobileVal = this.posts.number, mobileRegex = /^[0-9]{5,14}$/;
        if (getMobileVal) {
            getMobile.removeClass('has-error').next('.text-validate').text('');
            if (mobileRegex.test(getMobileVal)) {
                getMobileVal = '+1' + getMobileVal;
                __WEBPACK_IMPORTED_MODULE_10_jquery__["ajax"]({
                    url: '//gopage-api.herokuapp.com/api/users/send_sms/' + getMobileVal,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        number: getMobileVal
                    },
                    beforeSend: function () {
                        getMobile.removeClass('has-error').next('.text-validate').text('');
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                    }
                }).fail(function (err) {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
                    console.log(err);
                }).done(function (res) {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup .btn-green[type="submit"]').find('.fa-spinner').remove();
                    var thisCode = res.number.code;
                    console.log(thisCode);
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form1').fadeOut('fast');
                    setTimeout(function () {
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('.form2').fadeIn('slow');
                    }, 250);
                });
            }
            else {
                getMobile.addClass('has-error').next('.text-validate').text('Mobile number is invalid.');
            }
        }
        else {
            getMobile.addClass('has-error').next('.text-validate').text('Please enter your mobile number.');
        }
    };
    SignupMobilePage.prototype.verifyMe = function () {
        var getCode = __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-verify').find('input'), getCodeVal = getCode.val();
        if (getCodeVal) {
            __WEBPACK_IMPORTED_MODULE_10_jquery__["ajax"]({
                url: '//gopage-api.herokuapp.com/api/users/verify_sms/' + getCodeVal,
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.holder-verify-phone input').removeClass('has-error').next('.text-validate').text('');
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-verify .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                }
            }).fail(function (err) {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
                getCode.addClass('has-error').next('.text-validate').text('Verification Code is invalid.');
            }).done(function (res) {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-verify .btn-green[type="submit"]').find('.fa-spinner').remove();
                console.log('Your mobile number has been verified.');
                getCode.removeClass('has-error').next('.text-validate').text('');
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.form2').fadeOut('fast');
                setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form3').fadeIn('slow');
                }, 250);
            });
        }
        else {
            getCode.addClass('has-error').next('.text-validate').text('Please enter the verification code we sent on your mobile.');
        }
    };
    SignupMobilePage.prototype.createMyPass = function () {
        var getPass = __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password').find('input:first-child'), getPassVal = getPass.val(), getPassConfirm = __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password').find('input:nth-child(2)'), getPassConfirmVal = getPassConfirm.val(), thisPage = this;
        if (getPassVal && getPassConfirmVal) {
            if (getPassVal == getPassConfirmVal) {
                getPassConfirm.removeClass('has-error').next('.text-validate').text('');
                var numberVal = '+1' + this.posts.number;
                __WEBPACK_IMPORTED_MODULE_10_jquery__["ajax"]({
                    url: '//gopage-api.herokuapp.com/api/users/add',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        number: numberVal,
                        password: getPassConfirmVal,
                        email: this.posts.email,
                        account_type: this.posts.account_type,
                        status: this.posts.status,
                        permission: this.posts.permission
                    },
                    beforeSend: function () {
                        console.log(numberVal);
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password input').removeClass('has-error').next('.text-validate').text('');
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password .btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                    }
                }).fail(function (err) {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();
                    console.log(err);
                }).done(function (res) {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password .btn-green[type="submit"]').find('.fa-spinner').remove();
                    thisPage.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Passwords do not match.');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-password').find('input').addClass('has-error').siblings('.text-validate').text('Please enter your desired password.');
        }
    };
    return SignupMobilePage;
}());
SignupMobilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup-mobile',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup-mobile\page-signup-mobile.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <div class="form1">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n    </p>\n\n    <p class="text-center subtitle">\n\n      Sign up with <a href="#" (click)="fbConnect()">Facebook</a>, <a href="#" (click)="gpConnect()">Google</a> or <a href="#" (click)="goSignupEmail()">email address</a>\n\n    </p>\n\n    <div class="divider">\n\n      <span>or</span>\n\n    </div>\n\n    <p class="description">Enter your mobile number</p>\n\n    <form class="form-signup">\n\n      <label>\n\n        <div class="holder-country-code">\n\n          <div class="country-code">\n\n            <img src="assets/images/icon-flag-us.jpg" alt=""/>\n\n            <span class="fa fa-caret-down"></span>\n\n          </div>\n\n          <ul class="country-dropdown">\n\n            <li class="country-dropdown-val">\n\n              <img src="assets/images/icon-flag-us.jpg" alt=""/><span class="country-name">U.S. </span><span class="country-area-code">(+1)</span>\n\n            </li>\n\n            <li class="country-dropdown-val">\n\n              <img src="assets/images/icon-flag-ca.jpg" alt=""/><span class="country-name">Canada </span><span class="country-area-code">(+1)</span>\n\n            </li>\n\n          </ul>\n\n        </div>\n\n        <input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.number"/>\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="signMeUp()">Sign Up</button>\n\n    </form>\n\n    <hr class="hr" />\n\n    <p class="description">Already have an account? <a href="#" (click)="goLogin()">Log In</a></p>\n\n  </div>\n\n\n\n  <div class="form2">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n      Verify Your Mobile Number\n\n    </p>\n\n    <form class="form-verify">\n\n      <label>\n\n        <input type="text" placeholder="Verification Code">\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="verifyMe()">Verify</button>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="form3">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n      Create a Password\n\n    </p>\n\n    <form class="form-password">\n\n      <label>\n\n        <input id="enter-password" class="input-mobile" type="password" placeholder="Enter password" />\n\n        <input id="confirm-password" class="input-mobile" type="password" placeholder="Confirm password" />\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="createMyPass()">Submit</button>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup-mobile\page-signup-mobile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
], SignupMobilePage);

//# sourceMappingURL=page-signup-mobile.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ResetPassPage = (function () {
    function ResetPassPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.posts = {
            email: ''
        };
    }
    ResetPassPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassPage.prototype.resetMe = function () {
        var _this = this;
        var getUser = this.posts.email, baseUrl = __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* default */].baseUrl;
        if (__WEBPACK_IMPORTED_MODULE_5_jquery__('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser) {
            this.http.post(baseUrl + 'api/users/sendemail', this.posts).subscribe(function (res) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */], {}, {
                    animate: true,
                    direction: 'forward'
                });
            }, function (err) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset label').each(function () {
                    var thisInput = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).find('input'), thisPlaceholder = thisInput.attr('placeholder');
                    thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder + '. Are you sure you are registered?');
                });
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).find('input'), thisPlaceholder = thisInput.attr('placeholder');
                thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
            });
        }
    };
    return ResetPassPage;
}());
ResetPassPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reset-pass',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-reset-pass\page-reset-pass.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Reset Password\n\n  </p>\n\n  <form class="form-reset">\n\n    <label><input type="email" name="email" placeholder="Email or Mobile number" [(ngModel)]="posts.email" /><span class="text-validate">Email address is required.</span></label>\n\n    <button class="btn-green" type="submit" (click)="resetMe()">Send</button>\n\n  </form>\n\n  <p class="description text-center">Enter the email address or mobile number associated with your account, and we’ll email or text your new random generated password.<p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-reset-pass\page-reset-pass.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PageUserLoyaltyCardDealsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserLoyaltyCardDealsPage = (function () {
    function UserLoyaltyCardDealsPage(navCtrl, navParams, api, storage, platform, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.hasData = true;
    }
    UserLoyaltyCardDealsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
        });
        this.business_id = this.navParams.get('business_id');
        this.business_name = this.navParams.get('business_name');
        console.log(this.business_name);
        this.storage.get('user').then(function (user) {
            _this.api.Loyalties.loyalty_customer_list(user._id, _this.business_id).then(function (deal) {
                _this.deals = deal;
                _this.hasData = true;
                console.log(deal);
            });
        });
    };
    UserLoyaltyCardDealsPage.prototype.goPrevious = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    UserLoyaltyCardDealsPage.prototype.goCard = function (title, stamps, stamps_needed) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */], { title: title, stamps: stamps, stamps_needed: stamps_needed, }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserLoyaltyCardDealsPage;
}());
UserLoyaltyCardDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-card-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/'<!--\n\n  Generated template for the PageUserLoyaltyCardDealsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <!-- <div class="back-btn-holder" tappable (click)="backToLoyaltyCards()">\n\n    <ion-icon ios="ios-arrow-back"></ion-icon>\n\n    <p>Back to Loyalty Cards</p>\n\n  </div> -->\n\n  <ion-navbar *ngIf="hasData">\n\n    <i class="fa fa-chevron-left fa-lg" (click)="goPrevious()"></i>\n\n    <span class="business-title">{{business_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="card-deals-holder" *ngIf="hasData">\n\n    <div class="card-deal" *ngFor="let deal of deals" (click)="goCard(deal.deals_id[0].template, deal.loyalty_details.stamp, deal.deals_id[0].buy_pcs)">\n\n      <div class="img-holder">\n\n        <img [src]="deal.deals_id[0].photo.url" alt="">\n\n      </div>\n\n      <div class="text-holder">\n\n        <h3 class="deal-title-text">{{deal.deals_id[0].template}}</h3>\n\n         <span class="card-stamp-text">{{deal.loyalty_details.stamp}} of {{deal.deals_id[0].buy_pcs}}</span>\n\n        <span class="card-expiration-text">Expires {{deal.deals_id[0].end_date | date : \'MM/dd/yyyy\'}}</span>\n\n        <i class="fa fa-chevron-right fa-2x"></i>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
], UserLoyaltyCardDealsPage);

//# sourceMappingURL=page-user-loyalty-card-deals.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_reset_pass_page_reset_pass__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var LoginPage = (function () {
    function LoginPage(navCtrl, http, fb, gp, storage, api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.storage = storage;
        this.api = api;
        this.posts = {
            username: '',
            password: ''
        };
    }
    LoginPage.prototype.goSignup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    LoginPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_12__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '4' }).subscribe(function (res) {
                    _this.getUser(res.json());
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    LoginPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) { return console.log(res); })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    LoginPage.prototype.goReset = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_reset_pass_page_reset_pass__["a" /* ResetPassPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    LoginPage.prototype.logMeIn = function () {
        var _this = this;
        var getUser = this.posts.username, getPass = this.posts.password, baseUrl = __WEBPACK_IMPORTED_MODULE_12__app_config__["a" /* default */].baseUrl;
        if (__WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser && getPass) {
            this.http.post(baseUrl + 'api/users/login', this.posts).subscribe(function (res) {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                _this.getUser(res.json());
            }, function (err) {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-login label').each(function () {
                    var thisInput = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                    if (thisInputName == 'username') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder);
                    }
                    else if (thisInputName == 'password') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid Password.');
                    }
                });
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-login label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                if (thisInputName == 'username') {
                    if (getUser) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                    }
                }
                else {
                    if (getPass) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Password is required .');
                    }
                }
            });
        }
    };
    LoginPage.prototype.getUser = function (token) {
        var _this = this;
        this.api.Users.user(token.user_id).then(function (user) {
            _this.storage.set('user', user);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-login\page-login.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card>\n\n\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goSignup()">\n\n    Welcome Back\n\n  </p>\n\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n  <form class="form-login">\n\n    <label><input type="email" name="username" placeholder="Email or Phone" [(ngModel)]="posts.username" /><span class="text-validate">Email address is required.</span></label>\n\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span></label>\n\n    <button class="btn-green" type="submit" (click)="logMeIn()">Log In</button>\n\n  </form>\n\n  <a class="description forgot-pass" (click)="goReset()">Forgot your password?</a>\n\n  <hr class="hr" />\n\n  <p class="description">Don\'t have an account? <a href="#" (click)="goSignup()">Sign Up</a></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-login\page-login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */]])
], LoginPage);

//# sourceMappingURL=page-login.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module": [
		804,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 224;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyStampCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserLoyaltyStampCardPage = (function () {
    function UserLoyaltyStampCardPage(navCtrl, navParams, platform, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.title = this.navParams.get('title');
        this.stamps = this.navParams.get('stamps');
        this.stamps_needed = this.navParams.get('stamps_needed');
    }
    UserLoyaltyStampCardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        });
    };
    UserLoyaltyStampCardPage.prototype.ionViewDidEnter = function () {
        for (var x = 1; x <= this.stamps_needed; x++) {
            x == this.stamps_needed ?
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').append('<div class="stamp"><span>FREE</span></div>') :
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').append('<div class="stamp"><span>' + x + '</span></div>');
        }
        for (var x = 0; x <= this.stamps - 1; x++) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').eq(x).prepend('<img src="assets/images/stamp.png" alt="" />');
        }
        var stampWidth = __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').css('width');
        __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').css({ 'width': stampWidth, 'height': stampWidth });
        if (this.stamps_needed > 10) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').css('width', parseInt(stampWidth) * (Math.ceil(this.stamps_needed / 2)));
        }
    };
    UserLoyaltyStampCardPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    return UserLoyaltyStampCardPage;
}());
UserLoyaltyStampCardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-stamp-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/'<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    <span *ngIf="this.title">{{this.title}}</span>\n\n  </p>\n\n  <div class="stamps-window">\n\n    <div class="holder-stamps"></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]) === "function" && _d || Object])
], UserLoyaltyStampCardPage);

var _a, _b, _c, _d;
//# sourceMappingURL=page-user-loyalty-stamp-card.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApiService = (function () {
    function ApiService(http) {
        var _this = this;
        this.http = http;
        this.Users = {
            user: function (userId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/view/" + userId).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Deals = {
            deals_list: function () {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/list_all/").map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.BusinessCategory = {
            business_category: function () {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_category/list/").map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Loyalties = {
            loyalty_list: function (customerId, businessId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/loyalties/list/" + customerId + "/" + businessId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business: function (customerId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/loyalties/business/" + customerId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            loyalty_customer_list: function (customerId, businessId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/loyalties/list/customer/" + customerId + "/" + businessId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            loyalty_deal: function (customerId, accountType) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.LoyaltyCards = {};
        this.LoyaltyDeals = {
            loyaltyDeal: function (customerId, accountType) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Favorites = {
            add_to_favorite: function (deal_body) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/favorites/add", deal_body).map(function (response) {
                    console.log(response);
                    return response.json();
                }).toPromise();
            },
            favorite_list: function (customer_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/favorites/list/" + customer_id).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            remove_to_favorites: function (id) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/favorites/delete/" + id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        //Deals Business CategoryMenuPage
        this.BusinessCategoryFilter = {
            business_category_filter: function (business_category) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/filter?" + __WEBPACK_IMPORTED_MODULE_4_jquery__["param"](business_category)).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Message = {
            business_list: function (user_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/list/" + user_id).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/inbox/members/" + room_id).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ApiService);

//# sourceMappingURL=api.service.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserLoyaltyCardsPage = (function () {
    function UserLoyaltyCardsPage(navCtrl, api, storage) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
    }
    UserLoyaltyCardsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserLoyaltyCardsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserLoyaltyCardsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            // console.log(user)
            _this.api.Loyalties.business(user._id).then(function (loyalty) {
                //  console.log(loyalty)
                _this.loyalties = loyalty;
                _this.hasData = true;
                // console.log(loyalty[0].busines)
            });
        });
    };
    UserLoyaltyCardsPage.prototype.showCardDeals = function (business_id, business_name) {
        console.log(business_name);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */], { business_id: business_id, business_name: business_name }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserLoyaltyCardsPage;
}());
UserLoyaltyCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-cards',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="title-holder">\n\n    <p class="title">\n\n      Loyalty Cards\n\n    </p>\n\n  </div>\n\n\n\n  <div class="business-cards-holder" *ngIf="hasData">\n\n    <div class="business-cards" *ngFor="let loyalty of loyalties; let i = index;" tappable (click)="showCardDeals(loyalty.business_id[0]._id,loyalty.business_id[0].company_name)">\n\n      <div class="img-holder">\n\n        <img [src]="loyalty.deals_id[0].photo.url" alt="">\n\n      </div>\n\n      <div class="text-holder">\n\n        <h3 class="card-title-text">{{loyalty.business_id[0].company_name}}</h3>\n\n        <span class="card-location-text">{{loyalty.business_id[0].country}}</span>\n\n        <span class="card-count-text">{{loyalty.loyalties_row}} loyalty cards</span>\n\n        <i class="fa fa-chevron-right fa-2x"></i>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserLoyaltyCardsPage);

//# sourceMappingURL=page-user-loyalty-cards.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(751);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pagination__["a"]; });

//# sourceMappingURL=index.pagination.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//chat




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
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["w" /* EventEmitter */]();
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
            __WEBPACK_IMPORTED_MODULE_5_jquery__('body').find('.fa.loader').remove();
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
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_4__providers__["e" /* UtilService */].formatMessageRequest(user_id, business_id, first_name, last_name, message));
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    return UserChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-user-chat',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a> -->\n\n    <span class=\'title\'> {{ businessDetail?.company_name }}</span>\n\n\n\n    <span class=\'title\'></span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content id="messages" #content>\n\n  <div *ngIf="hasData">\n\n    <ion-list no-lines>\n\n\n\n      <ion-item *ngFor="let msg of messages">\n\n        <chat-bubble [chatMessage]="msg"></chat-bubble>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n\n\n    <span class="fa fa-spinner fa-spin loader"></span>\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="hasData" no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n\n  <ion-toolbar>\n\n\n\n    <ion-item no-lines>\n\n      <ion-label style="margin:0px;"></ion-label>\n\n      <div item-content style="width:100%;">\n\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-buttons right style="margin-left:10px">\n\n      <button ion-button icon-only\n\n              [disabled]="txtChat.content.trim().length<1"\n\n              (click)="sendMessage()">\n\n              SEND\n\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
var SOCKET_HOST = "http://localhost:3000";
// export const SOCKET_HOST = "https://chat-gopage-server.herokuapp.com/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilService = (function () {
    function UtilService() {
    }
    UtilService.getEpoch = function () {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()().unix();
    };
    UtilService.getCalendarDay = function (epoch) {
        if (!epoch) {
            return null;
        }
        var timeString = 'h:mm A';
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(epoch * 1000).calendar(null, {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilService);

//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MenuPage = (function () {
    function MenuPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.pages = [
            { title: 'membership card', component: __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */] },
            { title: 'loyalty cards', component: __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */] },
            { title: 'find deals', component: __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */] },
            { title: 'favorites', component: __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */] },
            { title: 'inbox', component: __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */] }
        ];
    }
    MenuPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.openPage = function (page) {
        this.navCtrl.setRoot(page.component, {}, {
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.logOut = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-menu\page-menu.html"*/'<ion-content padding class="content-page-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list class="menu-list">\n\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n      <span class="label-{{p.title}}">{{p.title}}</span>\n\n    </button>\n\n  </ion-list>\n\n\n\n  <hr class="divider">\n\n  <a class="logout" href="#" (click)="logOut()">Logout</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-menu\page-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], MenuPage);

//# sourceMappingURL=page-menu.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SocketService = (function () {
    function SocketService(databaseService) {
        var _this = this;
        this.databaseService = databaseService;
        this.messages = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.socketObserver = observer;
        });
        this.notify = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observerNotify) {
            _this.socketObserverNotify = observerNotify;
        });
        this.init();
    }
    SocketService.prototype.init = function () {
        var _this = this;
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* SOCKET_HOST */], { autoConnect: true });
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
            chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
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
        chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__database_service__["a" /* DatabaseService */]])
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupSuccessPage = (function () {
    function SignupSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SignupSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__["a" /* SignupEmailPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupSuccessPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    return SignupSuccessPage;
}());
SignupSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup-success',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup-success\page-signup-success.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Sign Up Success\n\n  </p>\n\n  <p class="description text-center">We’ve just emailed you a link. <br>Please check your inbox and confirm your email<p>\n\n  <a class="btn btn-green text-center" (click)="goLogin()">Okay</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup-success\page-signup-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SignupSuccessPage);

//# sourceMappingURL=page-signup-success.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupMobileSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupMobileSuccessPage = (function () {
    function SignupMobileSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SignupMobileSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__["a" /* SignupEmailPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupMobileSuccessPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    return SignupMobileSuccessPage;
}());
SignupMobileSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup-mobile-success',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup-mobile-success\page-signup-mobile-success.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Sign Up Success\n\n  </p>\n\n  <p class="description text-center">You have successfully registered. <br>You can now log-in.<p>\n\n  <a class="btn btn-green text-center" (click)="goLogin()">Okay</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup-mobile-success\page-signup-mobile-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SignupMobileSuccessPage);

//# sourceMappingURL=page-signup-mobile-success.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPassSuccessPage = (function () {
    function ResetPassSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ResetPassSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__["a" /* ResetPassPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassSuccessPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return ResetPassSuccessPage;
}());
ResetPassSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reset-pass-success',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Reset Password Success\n\n  </p>\n\n  <p class="description text-center">You should receive an email/text from us shortly. <br>We’ll meet you back here.<p>\n\n  <a class="btn btn-green text-center" (click)="goHome()">Back to Login</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], ResetPassSuccessPage);

//# sourceMappingURL=page-reset-pass-success.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemDetailsPage = (function () {
    function ItemDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    return ItemDetailsPage;
}());
ItemDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-item-details',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\item-details\item-details.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button menuToggle *ngIf="!selectedItem">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Item Details</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <h3 text-center *ngIf="selectedItem">\n\n    {{selectedItem.title}}\n\n    <ion-icon [name]="selectedItem.icon"></ion-icon>\n\n  </h3>\n\n  <h4 text-center *ngIf="selectedItem">\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </h4>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\item-details\item-details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], ItemDetailsPage);

//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(440);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_email_page_signup_email__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_mobile_page_signup_mobile__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_menu_page_category_menu_page_category_menu__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_item_details_item_details__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_page_user_find_deals_page_user_find_deals__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_page_user_filtered_deals_page_user_filtered_deals__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_page_user_favorites_page_user_favorites__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_page_user_deals_page_user_deals__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_list_list__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__directives_pagination_index_pagination__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_screen_orientation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ngx_qrcode2__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_barcode_scanner__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_page_user_chat_page_user_chat__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_elasticTextarea__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_chatBubble__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__directives__ = __webpack_require__(802);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_filtered_deals_page_user_filtered_deals__["a" /* UserFilteredDealsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_41__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_42__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_43__directives__["a" /* KeyboardAttachDirective */],
            __WEBPACK_IMPORTED_MODULE_39__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module#UserLoyaltyCardDealsPageModule', name: 'UserLoyaltyCardDealsPage', segment: 'page-user-loyalty-card-deals', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_35_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_filtered_deals_page_user_filtered_deals__["a" /* UserFilteredDealsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_41__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_42__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_39__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_37__service_api_service_component__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_40__providers__["d" /* Sql */],
            __WEBPACK_IMPORTED_MODULE_40__providers__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_40__providers__["c" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_40__providers__["e" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_31__directives_pagination_index_pagination__["a" /* PaginationService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMembershipCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserMembershipCardPage = (function () {
    function UserMembershipCardPage(navCtrl, navParams, platform, barcodeScanner, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.barcodeScanner = barcodeScanner;
        this.api = api;
        this.storage = storage;
        this.qrData = null;
        this.createdCode = null;
        this.scannedCode = null;
        this.hasData = false;
    }
    UserMembershipCardPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserMembershipCardPage.prototype.viewInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserMembershipCardPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserMembershipCardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            console.log(user);
            var makeQr = {
                MembershipNumber: user.membership_number,
                Name: user.first_name + ' ' + user.last_name,
                MemberSince: user.created_at,
            };
            _this.createdCode = JSON.stringify(makeQr);
            _this.hasData = true;
        });
    };
    UserMembershipCardPage.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.scannedCode = barcodeData.text;
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    return UserMembershipCardPage;
}());
UserMembershipCardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-membership-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox" (click)="viewInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="holder-qrcode" *ngIf="hasData" >\n\n    <!-- <p class="member-name">{{user.first_name}} {{user.last_name}}</p> -->\n\n    <ion-card *ngIf="createdCode">\n\n    <ngx-qrcode [qrc-value]="createdCode"></ngx-qrcode>\n\n    </ion-card>\n\n    <p class="qrcode-id">{{user.membership_number}}</p>\n\n  </div>\n\n</ion-content>\n\n\n\n<!-- <button ion-button full icon-left (click)="createCode()"><ion-icon name="barcode"></ion-icon>Create Code</button> -->\n\n  <!-- <button ion-button full icon-left (click)="scanCode()" color="secondary"><ion-icon name="qr-scanner"></ion-icon>Scan Code</button> -->\n\n <!--  <ion-item>\n\n\n\n    <ion-input type="text" placeholder="MY QR Code data" [(ngModel)]="qrData">\n\n    </ion-input>\n\n  </ion-item>\n\n -->\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], UserMembershipCardPage);

//# sourceMappingURL=page-user-membership-card.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    baseUrl: 'https://gopage-api.herokuapp.com/',
    // baseUrl : 'http://localhost:5015/',
    // ChatBaseUrl : 'http://localhost:3001/',
    ChatBaseUrl: 'https://chat-gopage-server-api.herokuapp.com/'
};
/* harmony default export */ __webpack_exports__["a"] = (config);
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_email_page_signup_email__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var SignupPage = (function () {
    function SignupPage(navCtrl, http, fb, gp) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.posts = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            number: ' ',
            account_type: '1',
            status: '1',
            permission: '3'
        };
    }
    SignupPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__["a" /* SliderPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupEmail = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_signup_email_page_signup_email__["a" /* SignupEmailPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupMobile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_11__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3' }).subscribe(function (res) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    SignupPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup\page-signup.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">Sign Up\n\n  </p>\n\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n  <button class="btn btn-green" (click)="goSignupEmail()"><span class="fa fa-envelope-o"></span> Sign Up with Email</button>\n\n  <button class="btn btn-green" (click)="goSignupMobile()"><span class="fa fa-mobile"></span> Sign Up with Mobile number</button>\n\n\n\n  <!-- <form class="form-signup">\n\n    <label>\n\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n\n      <span class="text-validate">First name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n\n      <span class="text-validate">Last name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n\n      <span class="text-validate">Email address is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n\n    </label>\n\n    <input class="btn-green" type="submit" value="Sign Up" (click)="signMeUp()" />\n\n  </form> -->\n\n  <!-- <p class="description">By signing up, you agree to GoPage\'s <br><a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></p> -->\n\n  <hr class="hr" />\n\n  <p class="description">Already have an account? <a href="#" (click)="goLogin()">Log In</a></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup\page-signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupPage);

//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_service__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sql__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__ = __webpack_require__(411);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen, screenOrientation, keyboard) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.screenOrientation = screenOrientation;
        this.keyboard = keyboard;
        // make SliderPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__["a" /* SliderPage */];
        platform.ready().then(function () {
            _this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
        });
        this.initializeApp();
        // set our app's pages
        // this.pages = [
        //   { title: 'LOYALTY', component: UserMembershipCardPage }
        // ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('nav'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\client-app\src\app\app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n\n\n\n<!-- <ion-menu [content]="nav">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Pages</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu> -->\n\n'/*ion-inline-end:"E:\Projects\client-app\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_7__providers_database_service__["a" /* DatabaseService */], __WEBPACK_IMPORTED_MODULE_8__providers_sql__["a" /* Sql */], __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__["a" /* SocketService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__["a" /* ScreenOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__["a" /* ScreenOrientation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */]) === "function" && _g || Object])
], MyApp);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

var PaginationService = (function () {
    function PaginationService() {
    }
    PaginationService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 2; }
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = __WEBPACK_IMPORTED_MODULE_0_lodash__["range"](startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return PaginationService;
}());

//# sourceMappingURL=pagination.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageType; });
var MessageType = (function () {
    function MessageType() {
    }
    return MessageType;
}());

MessageType.MSG_REQ = "message_request";
MessageType.MSG_RES = "message_response";
//# sourceMappingURL=model.js.map

/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 296,
	"./af.js": 296,
	"./ar": 297,
	"./ar-dz": 298,
	"./ar-dz.js": 298,
	"./ar-kw": 299,
	"./ar-kw.js": 299,
	"./ar-ly": 300,
	"./ar-ly.js": 300,
	"./ar-ma": 301,
	"./ar-ma.js": 301,
	"./ar-sa": 302,
	"./ar-sa.js": 302,
	"./ar-tn": 303,
	"./ar-tn.js": 303,
	"./ar.js": 297,
	"./az": 304,
	"./az.js": 304,
	"./be": 305,
	"./be.js": 305,
	"./bg": 306,
	"./bg.js": 306,
	"./bn": 307,
	"./bn.js": 307,
	"./bo": 308,
	"./bo.js": 308,
	"./br": 309,
	"./br.js": 309,
	"./bs": 310,
	"./bs.js": 310,
	"./ca": 311,
	"./ca.js": 311,
	"./cs": 312,
	"./cs.js": 312,
	"./cv": 313,
	"./cv.js": 313,
	"./cy": 314,
	"./cy.js": 314,
	"./da": 315,
	"./da.js": 315,
	"./de": 316,
	"./de-at": 317,
	"./de-at.js": 317,
	"./de-ch": 318,
	"./de-ch.js": 318,
	"./de.js": 316,
	"./dv": 319,
	"./dv.js": 319,
	"./el": 320,
	"./el.js": 320,
	"./en-au": 321,
	"./en-au.js": 321,
	"./en-ca": 322,
	"./en-ca.js": 322,
	"./en-gb": 323,
	"./en-gb.js": 323,
	"./en-ie": 324,
	"./en-ie.js": 324,
	"./en-nz": 325,
	"./en-nz.js": 325,
	"./eo": 326,
	"./eo.js": 326,
	"./es": 327,
	"./es-do": 328,
	"./es-do.js": 328,
	"./es.js": 327,
	"./et": 329,
	"./et.js": 329,
	"./eu": 330,
	"./eu.js": 330,
	"./fa": 331,
	"./fa.js": 331,
	"./fi": 332,
	"./fi.js": 332,
	"./fo": 333,
	"./fo.js": 333,
	"./fr": 334,
	"./fr-ca": 335,
	"./fr-ca.js": 335,
	"./fr-ch": 336,
	"./fr-ch.js": 336,
	"./fr.js": 334,
	"./fy": 337,
	"./fy.js": 337,
	"./gd": 338,
	"./gd.js": 338,
	"./gl": 339,
	"./gl.js": 339,
	"./gom-latn": 340,
	"./gom-latn.js": 340,
	"./he": 341,
	"./he.js": 341,
	"./hi": 342,
	"./hi.js": 342,
	"./hr": 343,
	"./hr.js": 343,
	"./hu": 344,
	"./hu.js": 344,
	"./hy-am": 345,
	"./hy-am.js": 345,
	"./id": 346,
	"./id.js": 346,
	"./is": 347,
	"./is.js": 347,
	"./it": 348,
	"./it.js": 348,
	"./ja": 349,
	"./ja.js": 349,
	"./jv": 350,
	"./jv.js": 350,
	"./ka": 351,
	"./ka.js": 351,
	"./kk": 352,
	"./kk.js": 352,
	"./km": 353,
	"./km.js": 353,
	"./kn": 354,
	"./kn.js": 354,
	"./ko": 355,
	"./ko.js": 355,
	"./ky": 356,
	"./ky.js": 356,
	"./lb": 357,
	"./lb.js": 357,
	"./lo": 358,
	"./lo.js": 358,
	"./lt": 359,
	"./lt.js": 359,
	"./lv": 360,
	"./lv.js": 360,
	"./me": 361,
	"./me.js": 361,
	"./mi": 362,
	"./mi.js": 362,
	"./mk": 363,
	"./mk.js": 363,
	"./ml": 364,
	"./ml.js": 364,
	"./mr": 365,
	"./mr.js": 365,
	"./ms": 366,
	"./ms-my": 367,
	"./ms-my.js": 367,
	"./ms.js": 366,
	"./my": 368,
	"./my.js": 368,
	"./nb": 369,
	"./nb.js": 369,
	"./ne": 370,
	"./ne.js": 370,
	"./nl": 371,
	"./nl-be": 372,
	"./nl-be.js": 372,
	"./nl.js": 371,
	"./nn": 373,
	"./nn.js": 373,
	"./pa-in": 374,
	"./pa-in.js": 374,
	"./pl": 375,
	"./pl.js": 375,
	"./pt": 376,
	"./pt-br": 377,
	"./pt-br.js": 377,
	"./pt.js": 376,
	"./ro": 378,
	"./ro.js": 378,
	"./ru": 379,
	"./ru.js": 379,
	"./sd": 380,
	"./sd.js": 380,
	"./se": 381,
	"./se.js": 381,
	"./si": 382,
	"./si.js": 382,
	"./sk": 383,
	"./sk.js": 383,
	"./sl": 384,
	"./sl.js": 384,
	"./sq": 385,
	"./sq.js": 385,
	"./sr": 386,
	"./sr-cyrl": 387,
	"./sr-cyrl.js": 387,
	"./sr.js": 386,
	"./ss": 388,
	"./ss.js": 388,
	"./sv": 389,
	"./sv.js": 389,
	"./sw": 390,
	"./sw.js": 390,
	"./ta": 391,
	"./ta.js": 391,
	"./te": 392,
	"./te.js": 392,
	"./tet": 393,
	"./tet.js": 393,
	"./th": 394,
	"./th.js": 394,
	"./tl-ph": 395,
	"./tl-ph.js": 395,
	"./tlh": 396,
	"./tlh.js": 396,
	"./tr": 397,
	"./tr.js": 397,
	"./tzl": 398,
	"./tzl.js": 398,
	"./tzm": 399,
	"./tzm-latn": 400,
	"./tzm-latn.js": 400,
	"./tzm.js": 399,
	"./uk": 401,
	"./uk.js": 401,
	"./ur": 402,
	"./ur.js": 402,
	"./uz": 403,
	"./uz-latn": 404,
	"./uz-latn.js": 404,
	"./uz.js": 403,
	"./vi": 405,
	"./vi.js": 405,
	"./x-pseudo": 406,
	"./x-pseudo.js": 406,
	"./yo": 407,
	"./yo.js": 407,
	"./zh-cn": 408,
	"./zh-cn.js": 408,
	"./zh-hk": 409,
	"./zh-hk.js": 409,
	"./zh-tw": 410,
	"./zh-tw.js": 410
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 754;

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupEmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_success_page_signup_success__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SignupEmailPage = (function () {
    function SignupEmailPage(navCtrl, http, fb, gp) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.posts = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            number: ' ',
            account_type: '1',
            status: '1',
            permission: '3'
        };
    }
    SignupEmailPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupEmailPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupEmailPage.prototype.goSignupMobile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupEmailPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_12__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3' }).subscribe(function (res) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    SignupEmailPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    SignupEmailPage.prototype.signMeUp = function () {
        var _this = this;
        var getFName = this.posts.first_name, getLName = this.posts.last_name, getEmail = this.posts.email, getPass = this.posts.password, baseUrl = __WEBPACK_IMPORTED_MODULE_12__app_config__["a" /* default */].baseUrl, checker = false;
        var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/, emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (getFName && getLName && getEmail && getPass) {
            checker = true;
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder'), thisVal = thisInput.val();
                if (thisInputName !== 'password') {
                    if (thisInputName == 'first_name' || thisInputName == 'last_name') {
                        if (nameRegEx.test(thisVal) == true) {
                            thisInput.removeClass('has-error').siblings('.text-validate').text();
                            checker = true;
                        }
                        else {
                            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
                            checker = false;
                        }
                    }
                    else {
                        if (emailRegEx.test(thisVal) == true) {
                            thisInput.removeClass('has-error').siblings('.text-validate').text();
                            checker = true;
                        }
                        else {
                            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is invalid.');
                            checker = false;
                        }
                    }
                }
                else {
                    thisInput.removeClass('has-error').siblings('.text-validate').text();
                }
            });
            if (!__WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup input').hasClass('has-error') && checker == true) {
                if (__WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                }
                this.http.post(baseUrl + 'api/users/add', this.posts).subscribe(function (res) {
                    console.log(res);
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_signup_success_page_signup_success__["a" /* SignupSuccessPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err.json());
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email already exists.');
                });
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                console.log(thisInput.val());
                if (thisInputName == 'password') {
                    if (thisInput.val().length !== 0) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Password is required.');
                    }
                }
                else {
                    if (thisInput.val().length !== 0) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                    }
                }
            });
        }
    };
    return SignupEmailPage;
}());
SignupEmailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup-email',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup-email\page-signup-email.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n  <p class="text-center subtitle">\n\n    Sign up with <a href="#" (click)="fbConnect()">Facebook</a>, <a href="#" (click)="gpConnect()">Google</a> or <a href="#" (click)="goSignupMobile()">mobile number</a>\n\n  </p>\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n\n\n  <form class="form-signup">\n\n    <label>\n\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n\n      <span class="text-validate">First name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n\n      <span class="text-validate">Last name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n\n      <span class="text-validate">Email address is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n\n    </label>\n\n    <button class="btn-green" type="submit" (click)="signMeUp()">Sign Up</button>\n\n  </form>\n\n  <hr class="hr" />\n\n  <p class="description">Already have an account? <a href="#" (click)="goLogin()">Log In</a></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup-email\page-signup-email.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupEmailPage);

//# sourceMappingURL=page-signup-email.js.map

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFilteredDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_deals_page_user_deals__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var UserFilteredDealsPage = (function () {
    // hasData :boolean = false
    function UserFilteredDealsPage(navCtrl, navParams, platform, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
    }
    UserFilteredDealsPage.prototype.ionViewWillEnter = function () {
        // this.hasData = true;
        this.filtered_business = this.navParams.get('business_category');
        console.log(this.filtered_business);
    };
    UserFilteredDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFilteredDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFilteredDealsPage.prototype.IonViewDidLoad = function () {
    };
    UserFilteredDealsPage.prototype.getBusiness = function (business) {
        console.log(business);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserFilteredDealsPage;
}());
UserFilteredDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-filtered-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-filtered-deals\page-user-filtered-deals.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" placeholder="Search GoPage Deals">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" placeholder="Los Angeles, CA">\n\n      </label>\n\n      <button class="fa fa-search btn-search-deals" type="submit"></button>\n\n    </form>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goMapView()"><i class="fa fa-map-marker"></i> Map view</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div class="categories-header">\n\n    <div class="row">\n\n      <div class="col">\n\n        <p class="deals-counter">\n\n          <span class="deals-found">72</span> out of <span class="deals-total">262</span> deals\n\n        </p>\n\n        <ion-item>\n\n          <ion-label> Show Image</ion-label>\n\n          <ion-toggle [(ngModel)]="toggleImage"></ion-toggle>\n\n        </ion-item>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="categories-main">\n\n    <div class="row">\n\n      <div class="col-12 col-sm-9 holder-categories-result1">\n\n        <div class="row">\n\n          <!-- *ngIf="hasData" -->\n\n          <div class="col categories-result">\n\n            <div class="deal media {{toggleImage ? \'toggled\' : \'\'}}" *ngFor="let business of filtered_business">\n\n              <div class="col-xs-8">\n\n                <a class="deal-thumbnail" href="" *ngIf="toggleImage">\n\n                  <img class="d-flex mr-3" src="{{deal.photo.url !== unknown ? deal.photo.url : \'assets/images/placeholder.jpg\'}}" alt="{{deal.template}}">\n\n                </a>\n\n                <div class="media-body align-self-center">\n\n                  <a class="deal-title" href="">\n\n                    <h6 class="mt-0">{{ business.template }}</h6>\n\n                  </a>\n\n                  <a class="business-link" href="">{{ business.business_name }}</a>\n\n                  <p class="business-address">{{ business.business_id[0].country}}, {{business.business_id[0].state}}</p>\n\n                  <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{business.end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                </div>\n\n              </div>\n\n              <div class="col-xs-4">\n\n                <div class="deals-button">\n\n                  <a class="btn btn-claim" data-toggle="modal" data-target="#signupModal" data-dismiss="modal">Add to Favorites <i class="fa fa-chevron-right"></i></a> <br class="btn-break">\n\n                  <a class="btn btn-more" (click)="getBusiness(business.business_id[0])">More deals <i class="fa fa-chevron-right"></i></a>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="row">\n\n    <nav class="col-12 holder-pagination">\n\n      <ul class="pagination list-unstyled">\n\n        <li class="page-item prev-page">\n\n          <button class="page-link prev-page" ion-button small><i class="fa fa-angle-left"></i>&nbsp;<span class="prev">Prev</span></button>\n\n        </li>\n\n        <li class="page-item"><button class="page-link" ion-button small>1</button></li>\n\n        <li class="page-item"><button class="page-link" ion-button small>2</button></li>\n\n        <li class="page-item"><button class="page-link" ion-button small>3</button></li>\n\n        <li class="page-item"><button class="page-link active" ion-button small>4</button></li>\n\n        <li class="page-item">\n\n          <button class="page-link next-page" ion-button small><span class="next">Next</span>&nbsp;<i class="fa fa-angle-right"></i></button>\n\n        </li>\n\n      </ul>\n\n    </nav>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-filtered-deals\page-user-filtered-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
], UserFilteredDealsPage);

//# sourceMappingURL=page-user-filtered-deals.js.map

/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details_item_details__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__item_details_item_details__["a" /* ItemDetailsPage */], {
            item: item
        });
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>My First List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon name="{{item.icon}}" item-left></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-right>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__ = __webpack_require__(799);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElasticTextarea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ElasticTextarea = (function () {
    function ElasticTextarea() {
        this.content = "";
        this.lineHeight = 20;
        this.maxExpand = 5;
        this.maxHeight = this.lineHeight * this.maxExpand;
    }
    ElasticTextarea.prototype.ngAfterViewInit = function () {
        this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
        this.txtArea.style.height = this.lineHeight + "px";
        this.maxHeight = this.lineHeight * this.maxExpand;
        this.txtArea.style.resize = 'none';
    };
    ElasticTextarea.prototype.onChange = function () {
        this.txtArea.style.height = this.lineHeight + "px";
        if (this.txtArea.scrollHeight < this.maxHeight) {
            this.txtArea.style.height = this.txtArea.scrollHeight + "px";
        }
        else {
            this.txtArea.style.height = this.maxHeight + "px";
        }
    };
    ElasticTextarea.prototype.clearInput = function () {
        this.content = "";
        this.txtArea.style.height = this.lineHeight + "px";
    };
    ElasticTextarea.prototype.setFocus = function () {
        this.ionTxtArea.setFocus();
    };
    return ElasticTextarea;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('ionTxtArea'),
    __metadata("design:type", Object)
], ElasticTextarea.prototype, "ionTxtArea", void 0);
ElasticTextarea = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'elastic-textarea',
        inputs: ['placeholder', 'lineHeight', 'maxExpand'],template:/*ion-inline-start:"E:\Projects\client-app\src\components\elasticTextarea\elasticTextarea.html"*/'<!--suppress ALL -->\n\n<ion-textarea #ionTxtArea\n\n              placeholder=\'{{ "Type your message..." }}\'\n\n              [(ngModel)]="content"\n\n              (ngModelChange)=\'onChange($event)\'>\n\n</ion-textarea>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\components\elasticTextarea\elasticTextarea.html"*/
    }),
    __metadata("design:paramtypes", [])
], ElasticTextarea);

//# sourceMappingURL=elasticTextarea.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatBubble__ = __webpack_require__(801);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chatBubble__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatBubble; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatBubble = (function () {
    function ChatBubble() {
        this.messageType = __WEBPACK_IMPORTED_MODULE_1__providers__["b" /* MessageType */];
    }
    ChatBubble.prototype.formatEpoch = function (epoch) {
        return __WEBPACK_IMPORTED_MODULE_1__providers__["e" /* UtilService */].getCalendarDay(epoch);
    };
    return ChatBubble;
}());
ChatBubble = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'chat-bubble',
        inputs: ['chatMessage'],template:/*ion-inline-start:"E:\Projects\client-app\src\components\chatBubble\chatBubble.html"*/'<div>\n\n  <div class="chat-bubble {{chatMessage.message_by === \'member\' ? \'right\' : \'left\'}}">\n\n    <div class="message">{{chatMessage.message}}</div>\n\n  </div>\n\n  <div class="message-detail {{chatMessage.message_by === \'member\' ? \'right\' : \'left\'}}">\n\n    <span>{{formatEpoch(chatMessage.epoch)}}</span>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\components\chatBubble\chatBubble.html"*/
    }),
    __metadata("design:paramtypes", [])
], ChatBubble);

//# sourceMappingURL=chatBubble.js.map

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__ = __webpack_require__(803);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardAttachDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */
var KeyboardAttachDirective = (function () {
    function KeyboardAttachDirective(elementRef, keyboard, _zone, platform) {
        this.elementRef = elementRef;
        this.keyboard = keyboard;
        this._zone = _zone;
        this.platform = platform;
        this.shouldHide = true;
    }
    KeyboardAttachDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(function (e) { return _this.onShow(e); });
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(function (e) { return _this.onHide(e); });
        }
        this.btnClicked.subscribe(function (data) { return _this.shouldHide = false; }, function (err) { return console.log(err); });
    };
    KeyboardAttachDirective.prototype.ngOnDestroy = function () {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    };
    KeyboardAttachDirective.prototype.onShow = function (e) {
        var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
    };
    ;
    KeyboardAttachDirective.prototype.onHide = function (e) {
        if (this.shouldHide) {
            this.setElementPosition(0);
        }
        this.shouldHide = true;
    };
    ;
    KeyboardAttachDirective.prototype.setElementPosition = function (pixels) {
        var _this = this;
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            }, 100);
        });
    };
    return KeyboardAttachDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('keyboardAttach'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Content */])
], KeyboardAttachDirective.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], KeyboardAttachDirective.prototype, "btnClicked", void 0);
KeyboardAttachDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[keyboardAttach]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */]])
], KeyboardAttachDirective);

//# sourceMappingURL=keyboard-attach.directive.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFindDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_deals_page_user_deals__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_favorites_page_user_favorites__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_pagination_index_pagination__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var UserFindDealsPage = (function () {
    function UserFindDealsPage(navCtrl, navParams, platform, api, storage, paginationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.paginationService = paginationService;
        this.hasData = false;
        // pager object and items
        this.pager = {};
    }
    UserFindDealsPage.prototype.getBusiness = function (business) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.ionViewWillEnter = function () {
        this.getFilteredDealsAndFavorites();
        if (this.deals == null) {
            this.getDealsAndFavorites();
            console.log('data from non filtered');
        }
        else {
            this.getFilteredDealsAndFavorites();
            this.setPagination(1);
            console.log('data from filtered');
            console.log(this.pagedDeals);
        }
    };
    UserFindDealsPage.prototype.setPagination = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.deals.length, page);
        this.pagedDeals = this.deals.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    UserFindDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.getDealsAndFavorites = function () {
        var _this = this;
        this.storage.get("user").then(function (user) {
            _this.user = user;
            _this.api.Deals.deals_list().then(function (deals) {
                _this.deals = deals;
                _this.hasData = true;
                _this.setPagination(1);
                console.log(deals);
                _this.api.Favorites.favorite_list(user._id).then(function (favorites) {
                    _this.favorites = favorites;
                    // console.log(favorites);
                    if (_this.hasData) {
                        _this.favorites.forEach(function (favorite) {
                            _this.deals.forEach(function (deal) {
                                if (deal._id === favorite.deals_id[0]._id) {
                                    deal.is_favorite = true;
                                }
                            });
                        });
                    }
                });
            });
        });
    };
    UserFindDealsPage.prototype.getFilteredDealsAndFavorites = function () {
        this.deals = this.navParams.get('business_category');
        if (this.deals != null) {
            this.hasData = true;
        }
    };
    UserFindDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.addToFavorites = function (deal) {
        var selectedButton = document.getElementById('addToFavorite' + deal._id);
        selectedButton.style.display = "none";
        selectedButton.className += " disabled";
        var deal_body = {
            deals_id: deal._id,
            business_id: deal.business_id[0]._id,
            customer_id: this.user._id
        };
        this.api.Favorites.add_to_favorite(deal_body).then(function (favorite) {
            console.log(JSON.stringify(favorite.message));
        })
            .catch(function (error) {
            console.log(error._body);
        });
    };
    UserFindDealsPage.prototype.goToFavorites = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */], {
            animate: true,
            direction: 'back'
        });
    };
    return UserFindDealsPage;
}());
UserFindDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-find-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" placeholder="Search GoPage Deals">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" placeholder="Los Angeles, CA">\n\n      </label>\n\n      <button class="fa fa-search btn-search-deals" type="submit"></button>\n\n    </form>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goMapView()"><i class="fa fa-map-marker"></i> Map view</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div class="categories-header">\n\n    <div class="row">\n\n      <div class="col">\n\n        <p class="deals-counter">\n\n          <span class="deals-found">72</span> out of <span class="deals-total">262</span> deals\n\n        </p>\n\n        <ion-item>\n\n          <ion-label> Show Image</ion-label>\n\n          <ion-toggle [(ngModel)]="toggleImage"></ion-toggle>\n\n        </ion-item>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <!-- <div *ngIf="hasData">\n\n    <div *ngFor="let deal of deals">\n\n      <p>{{deal.business_name}}</p>\n\n    </div>\n\n  </div> (click)=this.business({{deal.business[0]._id }})"" href=""-->\n\n\n\n  <div class="categories-main">\n\n    <div class="row">\n\n      <div class="col-12 col-sm-9 holder-categories-result1">\n\n        <div class="row">\n\n          <div class="col categories-result" *ngIf="hasData">\n\n            <div class="deal media {{toggleImage ? \'toggled\' : \'\'}}" *ngFor="let deal of pagedDeals; let i = index">\n\n              <div class="col-xs-8">\n\n                <a class="deal-thumbnail" href="" *ngIf="toggleImage">\n\n                  <img class="d-flex mr-3" src="{{deal.photo.url !== unknown ? deal.photo.url : \'assets/images/placeholder.jpg\'}}" alt="{{deal.template}}">\n\n                </a>\n\n                <div class="media-body align-self-center">\n\n                  <a class="deal-title" href="">\n\n                    <h6 class="mt-0">{{deal.template}}</h6>\n\n                  </a>\n\n                  <a class="business-link" href="">{{deal.business_name}}</a>\n\n                  <p class="business-address">{{deal.business_id[0].country}}, {{deal.business_id[0].state}}</p>\n\n                  <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{deal.end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="col-xs-4">\n\n                <div class="deals-button">\n\n                  <div *ngIf="deal.is_favorite; then Favorite  else  notFavorite"></div>\n\n                  <ng-template #notFavorite>\n\n                    <div class="claim-btn-holder">\n\n                      <a class="btn btn-claim" [attr.id]="\'addToFavorite\'+deal._id" id="addToFavorite" (click)="addToFavorites(deal)">Add to Favorites <i class="fa fa-chevron-right"></i></a>\n\n                      <a class="btn btn-claimed" id="addedToFavorite" (click)="goToFavorites()">Added to Favorites</a>\n\n                    </div>\n\n                  </ng-template>\n\n                  <br class="btn-break">\n\n                  <ng-template #Favorite><a class="btn btn-claim disabled" id="addToFavorite" (click)="goToFavorites()">Added to Favorites</a> <br class="btn-break"></ng-template>\n\n                  <a class="btn btn-more" (click)="getBusiness(deal.business_id[0],deal.template)" >More Deals <i class="fa fa-chevron-right"></i></a>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="row">\n\n    <nav class="col-12 holder-pagination">\n\n      <ul class="pagination list-unstyled" *ngIf="pager.pages && pager.pages.length">\n\n        <li class="page-item prev-page">\n\n          <button class="page-link prev-page" [ngClass]="{disabled:pager.currentPage === 1}" (click)="setPagination(pager.currentPage - 1)" ion-button small><i class="fa fa-angle-left"></i>&nbsp;<span class="prev">Prev</span></button>\n\n        </li>\n\n        <li class="page-item" *ngFor="let page of pager.pages">\n\n          <button class="page-link" [ngClass]="{active:pager.currentPage === page}" (click)="setPagination(page)" ion-button small>\n\n            {{page}}\n\n          </button>\n\n        </li>\n\n        <li class="page-item">\n\n          <button class="page-link next-page" [ngClass]="{disabled:pager.currentPage === pager.totalPages}" (click)="setPagination(pager.currentPage + 1)" ion-button small><span class="next">Next</span>&nbsp;<i class="fa fa-angle-right"></i></button>\n\n        </li>\n\n      </ul>\n\n    </nav>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_11__directives_pagination_index_pagination__["a" /* PaginationService */]])
], UserFindDealsPage);

//# sourceMappingURL=page-user-find-deals.js.map

/***/ })

},[435]);
//# sourceMappingURL=main.js.map