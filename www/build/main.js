webpackJsonp([1],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(26);
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
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
            });
        });
    };
    UserFavoritesPage.prototype.getBusiness = function (business) {
        var alert = this.alertCtrl.create({
            title: 'Coming Soon',
            subTitle: 'This feature is under construction right now. Check back soon!',
            buttons: ['Dismiss']
        });
        alert.present();
        // console.log(business)
        // var template;
        // if(business.business_id[0].deal_id.length !== 0) {
        //   var temp = business.business_id[0].deal_id[0].template;
        //   var b_template = temp.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
        //   template = b_template;
        // } else {
        //   var name = business.business_id[0].company_name;
        //   var b_name = name.replace(/\s+/g, '-').toLowerCase();
        //   var city = business.business_id[0].city;
        //   var b_city = city.toLowerCase();
        //   template = b_name + '&' + b_city;
        // }
        // this.navCtrl.push(UserDealsPage, {template: template}, {
        //   animate: true,
        //   direction: 'forward'
        // });
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
                        _this.favorites.splice(index, 1);
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
        selector: 'page-user-favorites',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Favorites</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="favorites-holder">\n\n    <div *ngIf="favorites?.length !== 0; then hasFavorites else noFavorites"></div>\n\n    <ng-template #hasFavorites>\n\n      <div class="favorites media" *ngFor="let favorite of favorites; let i = index">\n\n        <div class="col-xs-8">\n\n          <div class="img-holder" tappable (click)="getBusiness(favorite)">\n\n            <!-- <img class="d-flex mr-3" [src]="favorite.photo.url" alt=""> -->\n\n            <img class="d-flex mr-3" src="https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww" alt="">\n\n          </div>\n\n          <div class="text-holder media-body" tappable (click)="getBusiness(favorite)">\n\n            <h3 class="title-text">{{favorite.business_id[0].company_name}}</h3>\n\n            <div class="company-text">{{favorite.business_id[0].title}}</div>\n\n            <div class="location-text">{{favorite.business_id[0].city}}, {{favorite.business_id[0].state}}, {{favorite.business_id[0].country}}</div>\n\n            <!-- <div class="expiration-text"><i class="fa fa-clock-o"></i> Expires {{favorite.end_date | date : \'MM/dd/yyyy\'}}</div> -->\n\n            <i class="fa fa-chevron-right fa-2x"></i>\n\n          </div>\n\n        </div>\n\n\n\n        <div class="favorites-button">\n\n          <a class="btn remove-btn" tappable (click)="removeFavorite(favorite._id, i)">Remove</a>\n\n          <a class="btn btn-more" tappable (click)="getBusiness(favorite)">More Deals <i class="fa fa-chevron-right"></i></a>\n\n        </div>\n\n\n\n      </div>\n\n    </ng-template>\n\n\n\n    <ng-template #noFavorites>\n\n      <div class="no-favorites-holder">\n\n        <h3>No data to display.</h3>\n\n      </div>\n\n    </ng-template>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], UserFavoritesPage);

//# sourceMappingURL=page-user-favorites.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(296);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(163);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__sql__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(164);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(756);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(297);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(413);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(24);
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
        this.slidesOptions = { initialSlide: 0 };
    }
    SliderPage.prototype.slideNext = function () {
        this.slider.slideNext();
    };
    SliderPage.prototype.slidePrev = function () {
        this.slider.slidePrev();
    };
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], SliderPage.prototype, "slider", void 0);
SliderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-slider',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/'<!-- <ion-header no-shadow>\n\n  <ion-navbar>\n\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content no-bounce class="page-slider text-center">\n\n  <ion-slides #slider pager="true" (ionSlideNextStart)="onSlideNext($event)">\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <!-- <p class="subtitle">\n\n        Helping members &amp; small<br> business win\n\n      </p> -->\n\n      <img class="slider-img main-image" src="assets/images/member-main-image.jpg" alt="">\n\n      <!-- <h3 class="main-title">Your Go To App for Local</h3>\n\n      <h3 class="main-title">Loyalty Deals &amp; Discounts</h3> -->\n\n\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n\n\n      <img class="slider-img" src="assets/images/member-iphone-login.png" alt="">\n\n      <p class="subtitle">\n\n        With GoPage you are a preferred <br>customer and receive the best deals and <br> alerts from your favorite business.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-card.png" alt="">\n\n      <p class="subtitle">\n\n        Get rewarded for your loyalty! Use your <br>loyalty punchcard and redeem your <br> loyalty rewards from your favorite local <br> businesses.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-map.png" alt="">\n\n      <p class="subtitle">\n\n        Your GoPage App finds the deals you are<br> looking for from registered GoPage <br>businesses.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-messages.png" alt="">\n\n      <p class="subtitle">\n\n        Your favorite businesses alert <br>you first about deals, discounts <br>or events so you never miss out!\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n    </ion-slide>\n\n  </ion-slides>\n\n\n\n  <button class="btn-slider btn-green" (click)="signUp()">Get Started</button>\n\n  <button class="btn-slider btn-green-out" (click)="signIn()">Sign In</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(171);
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserLoyaltyCardsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            console.log(user._id);
            _this.api.Loyalties.business(user._id).then(function (loyalty) {
                //  console.log(loyalty)
                _this.loyalties = loyalty;
                _this.hasData = true;
                console.log(_this.loyalties.length);
            });
        });
    };
    UserLoyaltyCardsPage.prototype.showCardDeals = function (business_id, business_name) {
        console.log(business_name);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */], { business_id: business_id, business_name: business_name }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserLoyaltyCardsPage;
}());
UserLoyaltyCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-cards',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Loyalty Cards</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="business-cards-holder" *ngIf="hasData">\n\n    <div *ngIf="loyalties.length !== 0; then hasLoyalties else noLoyalties"></div>\n\n    <ng-template #hasLoyalties>\n\n      <div class="business-cards" *ngFor="let loyalty of loyalties; let i = index;" tappable (click)="showCardDeals(loyalty.business_id[0]._id,loyalty.business_id[0].company_name)">\n\n        <div class="img-holder">\n\n          <img [src]="loyalty.deals_id[0].photo.url" alt="">\n\n        </div>\n\n        <div class="text-holder">\n\n          <h3 class="card-title-text">{{loyalty.business_id[0].company_name}}</h3>\n\n          <span class="card-location-text">{{loyalty.business_id[0].country}}</span>\n\n          <span class="card-count-text">{{loyalty.loyalties_row}} loyalty cards</span>\n\n          <i class="fa fa-chevron-right fa-2x"></i>\n\n        </div>\n\n      </div>\n\n    </ng-template>\n\n\n\n    <ng-template #noLoyalties>\n\n      <h3>No data to display.</h3>\n\n    </ng-template>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _c || Object])
], UserLoyaltyCardsPage);

var _a, _b, _c;
//# sourceMappingURL=page-user-loyalty-cards.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
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
    CategoryMenuPage.prototype.seeAll = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], { business_category: null }, {
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
        selector: 'page-category-menu',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/'<ion-content padding class="content-category-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list class="menu-list">\n\n    <ul class="categories-list" >\n\n      <li (click)="seeAll()"><a href="#"><img src="assets/icon/icon-alldeals.svg">All Deals</a></li>\n\n      <div *ngFor="let business of business_category; let k = index;">\n\n        <li (click)="goFilterBusiness(business.name)"><a href="#"><img src="assets/icon/icon-category-{{first_word[k]}}.svg">  {{ business.name }}</a></li>\n\n      </div>\n\n    </ul>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */]])
], CategoryMenuPage);

//# sourceMappingURL=page-category-menu.js.map

/***/ }),

/***/ 161:
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

/***/ 163:
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

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(163);
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

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupMobilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_email_page_signup_email__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(57);
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
        var getMobile = __WEBPACK_IMPORTED_MODULE_10_jquery__('.form-signup').find('input[name="number"]'), getMobileVal = this.posts.number, mobileRegex = /^[0-9]{10}$/;
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
                    if (res.status == 400) {
                        getMobile.addClass('has-error').next('.text-validate').text('Mobile number does not exist.');
                    }
                    else {
                        var thisCode = res.number.code;
                        console.log(thisCode);
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('.form1').fadeOut('fast');
                        setTimeout(function () {
                            __WEBPACK_IMPORTED_MODULE_10_jquery__('.form2').fadeIn('slow');
                        }, 250);
                    }
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
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
], SignupMobilePage);

//# sourceMappingURL=page-signup-mobile.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(57);
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
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(27);
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
            if (__WEBPACK_IMPORTED_MODULE_4_jquery__(window).width() <= 768) {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
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
        selector: 'page-user-loyalty-card-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/'<!--\n\n  Generated template for the PageUserLoyaltyCardDealsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <!-- <div class="back-btn-holder" tappable (click)="backToLoyaltyCards()">\n\n    <ion-icon ios="ios-arrow-back"></ion-icon>\n\n    <p>Back to Loyalty Cards</p>\n\n  </div> -->\n\n  <ion-navbar *ngIf="hasData">\n\n    <i class="fa fa-angle-left fa-lg" (click)="goPrevious()"></i>\n\n    <span class="business-title">{{business_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="card-deals-holder" *ngIf="hasData">\n\n    <div class="card-deal" *ngFor="let deal of deals" (click)="goCard(deal.deals_id[0].template, deal.loyalty_details.stamp, deal.deals_id[0].buy_pcs)">\n\n      <div class="img-holder">\n\n        <img [src]="deal.deals_id[0].photo.url" alt="">\n\n      </div>\n\n      <div class="text-holder">\n\n        <h3 class="deal-title-text">{{deal.deals_id[0].template}}</h3>\n\n         <span class="card-stamp-text">{{deal.loyalty_details.stamp}} of {{deal.deals_id[0].buy_pcs}}</span>\n\n        <span class="card-expiration-text">Expires {{deal.deals_id[0].end_date | date : \'MM/dd/yyyy\'}}</span>\n\n        <i class="fa fa-chevron-right fa-2x"></i>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
], UserLoyaltyCardDealsPage);

//# sourceMappingURL=page-user-loyalty-card-deals.js.map

/***/ }),

/***/ 182:
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
webpackEmptyAsyncContext.id = 182;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(57);
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__["a" /* ResetPassPage */], {}, {
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
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
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
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */]])
], LoginPage);

//# sourceMappingURL=page-login.js.map

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module": [
		806,
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
webpackAsyncContext.id = 225;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyStampCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(24);
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
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__(window).width() <= 768) {
                _this.screenOrientation.unlock();
            }
        });
    };
    UserLoyaltyStampCardPage.prototype.ionViewDidEnter = function () {
        var self = this;
        for (var x = 1; x <= this.stamps_needed; x++) {
            x == this.stamps_needed ?
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').append('<div class="stamp"><span>FREE</span></div>') :
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').append('<div class="stamp"><span>' + x + '</span></div>');
        }
        for (var x = 0; x <= this.stamps - 1; x++) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').eq(x).prepend('<img src="assets/images/stamp.png" alt="" />');
        }
        var stampsCss = function () {
            var stampWidth = __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').css('width');
            __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').css({ 'width': stampWidth, 'height': stampWidth });
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__(window).width() > __WEBPACK_IMPORTED_MODULE_3_jquery__(window).height()) {
                if (self.stamps_needed > 10) {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').css('width', parseInt(stampWidth) * (Math.ceil(self.stamps_needed / 2)));
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').css('width', 'auto');
                }
            }
        };
        stampsCss();
        var currentWidth = __WEBPACK_IMPORTED_MODULE_3_jquery__(window).width();
        __WEBPACK_IMPORTED_MODULE_3_jquery__(window).resize(function () {
            if (currentWidth != __WEBPACK_IMPORTED_MODULE_3_jquery__(window).width()) {
                console.log('resized');
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.stamp').css('width', '');
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.holder-stamps').css('width', 'auto');
                setTimeout(function () {
                    var newWidth = __WEBPACK_IMPORTED_MODULE_3_jquery__(window).width();
                    stampsCss();
                    currentWidth = newWidth;
                }, 100);
            }
        });
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
        selector: 'page-user-loyalty-stamp-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <p class="title">\n\n      <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n      <span *ngIf="this.title">{{this.title}}</span>\n\n    </p>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="stamps-window">\n\n    <div class="holder-stamps"></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
], UserLoyaltyStampCardPage);

//# sourceMappingURL=page-user-loyalty-stamp-card.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(24);
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
        this.username = "gopage";
        this.password = "gopage321";
        this.userAuth = btoa(this.username + ":" + this.password);
        this.Users = {
            user: function (userId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/view/" + userId).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Business = {
            business_deals_search: function (input) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ElasticSearch + "business/_search?size=300&q=" + input, {
                    headers: _this.getHeaders()
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business_deals_list: function () {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ElasticSearch + "business/_search?size=300", {
                    headers: _this.getHeaders()
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business_deal: function (template) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/template/" + template).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business: function (business_name) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/business/" + business_name).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business_all: function () {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/list_all").map(function (response) {
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
            room_list: function (shop_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/rooms/" + shop_id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            members_room: function (members) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/rooms/list", { data: members }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            update_read: function (room_id, message_by) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/chats/update_read/" + room_id + "/" + message_by, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/inbox/members/" + room_id).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_last_chat: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/inbox_last_chat/members/").map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    ApiService.prototype.getHeaders = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Basic ' + this.userAuth });
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ApiService);

//# sourceMappingURL=api.service.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(24);
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








var UserDealsPage = (function () {
    function UserDealsPage(navCtrl, platform, navParams, api, storage) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.slidesOptions = { initialSlide: 0 };
    }
    UserDealsPage.prototype.slideNext = function () {
        this.slider.slideNext();
    };
    UserDealsPage.prototype.slidePrev = function () {
        this.slider.slidePrev();
    };
    UserDealsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var self = this;
        var template = this.navParams.get('template');
        if (template.match("&")) {
            this.api.Business.business(template).then(function (business) {
                console.log(business);
                _this.business = business;
                _this.hasData = true;
            }).catch(function (error) {
                _this.hasData = false;
            });
        }
        else {
            this.api.Business.business_deal(template).then(function (business) {
                _this.business = business.business.business_id[0];
                _this.business_imgs = business.business.business_id[0].files;
                console.log(_this.business_imgs);
                _this.hasData = true;
            }).catch(function (error) {
                _this.hasData = false;
            });
        }
        // this.initMap(businessHolder.business_id[0].lat, businessHolder.business_id[0].lng);
        // this.business_address = businessHolder.country + " " + businessHolder.state + " " + businessHolder.zip_postal;
        // this.business_address = this.business_address.replace(/^[, ]+|[, ]+$|[, ]+/g, "+").trim();
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
        // this.initMap();
    };
    UserDealsPage.prototype.ionViewDidLoad = function () {
        // this.initMap();
        // var self = this;
        // setTimeout(function(){
        //   self.initMap();
        // }, 650);
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
    UserDealsPage.prototype.goListView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserDealsPage.prototype.goPrevious = function () {
        this.navCtrl.pop();
    };
    UserDealsPage.prototype.showHours = function () {
        if (__WEBPACK_IMPORTED_MODULE_7_jquery__(".operations-list").hasClass("open")) {
            __WEBPACK_IMPORTED_MODULE_7_jquery__(".operations-list").removeClass("open");
            __WEBPACK_IMPORTED_MODULE_7_jquery__(".toggle-collapse").text("(show more)");
        }
        else {
            __WEBPACK_IMPORTED_MODULE_7_jquery__(".operations-list").addClass("open");
            __WEBPACK_IMPORTED_MODULE_7_jquery__(".toggle-collapse").text("(show less)");
        }
    };
    UserDealsPage.prototype.initMap = function (lat, lng) {
        var center = new google.maps.LatLng(lat, lng);
        // var center = {lat: business2.lat, lng: business2.lng};
        // console.log(center.lat(), center.lng())
        var map = new google.maps.Map(document.getElementById('mapView'), {
            center: center,
            zoom: 9
        });
        var marker = new google.maps.Marker({
            position: center,
            map: map,
        });
    };
    return UserDealsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], UserDealsPage.prototype, "slider", void 0);
UserDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/'<ion-header>\n\n  <ion-navbar *ngIf="hasData">\n\n    <i class="fa fa-angle-left fa-lg" (click)="goPrevious()"></i>\n\n    <span class="business-title">{{business.company_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="deals-page">\n\n  <div *ngIf="hasData">\n\n    <div *ngIf="business.deal_id.length !== 0;"></div>\n\n    <div class="slider-holder" [hidden]="!business.deal_id.length">\n\n      <ion-slides #slider loop="true">\n\n        <ion-slide *ngFor="let img of business_imgs; let i = index;">\n\n          <img src="{{img.length !== 0 ? img.url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n        </ion-slide>\n\n      </ion-slides>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left fa-lg"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right fa-lg"></i></span>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col-12" [hidden]="!business.deal_id.length">\n\n        <h4 class="deal-title">{{template}}</h4>\n\n      </div>\n\n\n\n      <!-- <div class="col-12">\n\n        <div class="media" *ngFor="let deal of deals">\n\n          <img src="{{deal.photo.url !== unknown ? deal.photo.url : \'assets/images/placeholder.jpg\'}}" alt="{{deal.template}}">\n\n          <div class="media-body">\n\n            <a href="#"><h5>{{deal.template}}</h5></a>\n\n          </div>\n\n        </div>\n\n      </div> -->\n\n\n\n      <div class="col-12 share-deal" [hidden]="!business.deal_id.length">\n\n        <p>Share this deal</p>\n\n        <ul class="social-list">\n\n          <li><a href="http://facebook.com" target="_blank"><i class="fa fa-facebook fa-lg"></i></a></li>\n\n          <li><a href="http://twitter.com" target="_blank"><i class="fa fa-twitter fa-lg"></i></a></li>\n\n          <li><a href="http://instagram.com" target="_blank"><i class="fa fa-instagram fa-lg"></i></a></li>\n\n          <li><a href="http://pinterest.com" target="_blank"><i class="fa fa-pinterest fa-lg"></i></a></li>\n\n        </ul>\n\n      </div>\n\n\n\n      <div class="col-12 about-business">\n\n        <h5 class="about-title">About {{business.company_name}}</h5>\n\n        <p class="about-description">{{business.description}}</p>\n\n\n\n        <ul class="social-links list-unstyled">\n\n          <li class="address-link">\n\n            <a href="https://www.google.com/maps/dir/{{business_address}}" target="_blank">\n\n              <i class="fa fa-map-marker fa-2x"></i>\n\n              <span class="business-name">{{business.company_name}}</span> <br>\n\n              <span class="business-address"> {{business.state}}, {{business.country}}, {{business.zip_postal}} </span>\n\n            </a>\n\n          </li>\n\n          <!-- <li *ngIf="business.operations.length === 0">\n\n          </li>\n\n          <li *ngIf="business.operations[0] === \'2\'">\n\n            <i class="fa fa-clock-o fa-2x"></i>\n\n            Open 24 Hours\n\n          </li>\n\n          <li *ngIf="business.operations[0] !== \'2\' && business.operations.length !== 0 && hasData === true">\n\n            <i class="fa fa-clock-o fa-2x"></i>\n\n              Opening Hours -->\n\n              <!-- <a class="toggle-collapse" (click)="showHours()">(show more)</a> -->\n\n              <!-- *ngFor="let operations of business.operations; let i = index" -->\n\n              <!-- <ul class="list-unstyled operations-list"> -->\n\n                 <!-- {{ business.sample_data.Monday.start }} -  {{ business.sample_data.Monday.end}}  -->\n\n                <!-- <li *ngIf="business.sample_data.Monday != null"><strong>Monday</strong> {{ business.sample_data.Monday.start }} -  {{ business.sample_data.Monday.end}}  </li>\n\n                <li *ngIf="business.sample_data.Tuesday != null"><strong>Tuesday</strong>  {{ business.sample_data.Tuesday.start }} -  {{ business.sample_data.Tuesday.end}}  </li>\n\n                <li *ngIf="business.sample_data.Wednesday != null"><strong>Wednesday</strong> {{ business.sample_data.Wednesday.start }} -  {{ business.sample_data.Wednesday.end}} </li>\n\n                <li *ngIf="business.sample_data.Thursday != null"><strong>Thursday</strong> {{ business.sample_data.Thursday.start }} -  {{ business.sample_data.Thursday.end}}</li>\n\n                <li *ngIf="business.sample_data.Friday != null"><strong>Friday</strong> {{ business.sample_data.Friday.start }} -  {{ business.sample_data.Friday.end}}</li>\n\n                <li *ngIf="business.sample_data.Saturday != null"><strong>Saturday</strong> {{ business.sample_data.Saturday.start }} -  {{ business.sample_data.Saturday.end}}</li>\n\n                <li *ngIf="business.sample_data.Sunday != null"><strong>Sunday</strong> {{ business.sample_data.Sunday.start }} -  {{ business.sample_data.Sunday.end}}</li>\n\n              </ul>\n\n          </li> -->\n\n          <!-- <div *ngIf"business.phone_number !== null;"></div>\n\n          <div *ngIf="business.company_website !== null;"></div>\n\n          <div *ngIf="business.business_email !== null;"></div> -->\n\n          <li></li>\n\n          <li class="info-link">\n\n            <a href="tel:{{business.phone_number}}">\n\n              <i class="fa fa-phone fa-2x"></i>\n\n              {{business.phone_number}}\n\n            </a>\n\n          </li>\n\n          <li class="info-link">\n\n            <a href="{{business.company_website}}" target="_blank">\n\n              <i class="fa fa-globe fa-2x"></i>\n\n              {{business.company_website}}\n\n            </a>\n\n          </li>\n\n          <li class="info-link">\n\n            <a href="mailto:{{business.business_email}}">\n\n              <i class="fa fa-envelope fa-2x"></i>\n\n              {{business.business_email}}\n\n            </a>\n\n          </li>\n\n          <!-- <li>\n\n            <i class="fa fa-facebook fa-2x"></i>\n\n            GoPageApp\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-twitter fa-2x"></i>\n\n            @gopageapp\n\n          </li>\n\n          <li>\n\n            <i class="fa fa-instagram fa-2x"></i>\n\n            @gopageco\n\n          </li> -->\n\n        </ul>\n\n      </div>\n\n\n\n      <div class="col-12 location-map">\n\n        <h5>Location</h5>\n\n      </div>\n\n      <div class="map-view" id="mapView"></div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFindDealsMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(26);
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
    function UserFindDealsMapPage(navCtrl, platform, api, storage, alertCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.user_lat_lng = {};
        this.markers = [];
        this.tempMarkers = [];
        this.mapResults = [];
        //place.icon
        this.googleMarker = {
            url: 'https://cdn.filestackcontent.com/8BeI5gTQrG7u1R98oogt',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(48, 50)
        };
        this.memberMarker = {
            url: 'https://cdn.filestackcontent.com/yRYj4h7URfKVAJfxNlLd',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(48, 50)
        };
        this.premiumMemberMarker = {
            url: 'https://cdn.filestackcontent.com/spT9FsVTTiqszaTddma0',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(48, 50)
        };
        this.search = {
            input: '',
            location: ''
        };
    }
    UserFindDealsMapPage.prototype.ionViewWillEnter = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').on('click', function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.locations-holder').css('visibility', 'visible');
        });
        __WEBPACK_IMPORTED_MODULE_10_jquery__('.locations-holder').on('mousedown', function () {
            self.getLocation();
        });
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').on('blur', function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.locations-holder').css('visibility', 'hidden');
        });
        self.selectedMapCenter = 'Los Angeles, CA';
    };
    UserFindDealsMapPage.prototype.ionViewDidLoad = function () {
        this.initMap();
        var self = this;
        setTimeout(function () {
            self.initMap();
        }, 650);
    };
    UserFindDealsMapPage.prototype.initMap = function () {
        var _this = this;
        var self = this;
        this.storage.get('user_position').then(function (position) {
            _this.lat = position.lat;
            _this.lng = position.lng;
            console.log(self.lat, self.lng);
            _this.storage.get('user_address').then(function (address) {
                _this.address = address;
                if (self.lat != null && self.lng != null) {
                    _this.default_location = new google.maps.LatLng(34.0522, -118.2437);
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(self.address);
                }
                else {
                    _this.default_location = new google.maps.LatLng(self.lat, self.lng);
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val('Los Angeles, CA');
                }
            });
        });
        this.map = new google.maps.Map(document.getElementById('mapView'), {
            center: this.default_location,
            zoom: 9
        });
        this.geocoder = new google.maps.Geocoder;
        var deal = document.getElementById('deal-name');
        var location = document.getElementById('deal-location2');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: ['us', 'ca'] }
        };
        var autocomplete = new google.maps.places.Autocomplete(location, options);
        autocomplete.bindTo('bounds', self.map);
        var searchBox = new google.maps.places.SearchBox(deal);
        searchBox.bindTo('bounds', self.map);
        var marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            self.removeMarkers();
            var place = autocomplete.getPlace();
            self.selectedMapCenter = place.formatted_address;
            if (!place.geometry)
                return;
            if (place.geometry.viewport) {
                self.map.setCenter(place.geometry.location);
                self.map.fitBounds(place.geometry.viewport);
                self.map.setZoom(9);
            }
            else {
                self.map.setCenter(place.geometry.location);
            }
        });
        searchBox.addListener('places_changed', function () {
            self.mapResults = [];
            var places = searchBox.getPlaces();
            console.log(places);
            if (places.length == 0) {
                return;
            }
            // Clear out the old markers.
            self.markers.forEach(function (marker) {
                marker.setMap(null);
            });
            self.markers = [];
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            var count = 1;
            places.forEach(function (place, i) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                places[i].count = count;
                count++;
                var photo = place.photos[i].getUrl({
                    'maxWidth': 120,
                    'maxHeight': 120
                });
                self.mapResults.push({
                    title: place.name,
                    address: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    photo: photo,
                    type: 3
                });
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
            });
            self.map.fitBounds(self.map);
        });
    };
    UserFindDealsMapPage.prototype.createMarker = function (data) {
        var _this = this;
        var infowindow = new google.maps.InfoWindow();
        data.forEach(function (d) {
            var position = new google.maps.LatLng(d.lat, d.lng);
            var inBounds = _this.map.getBounds().contains(position);
            if (inBounds == true) {
                if (d.business_type === '1') {
                    var icon = _this.premiumMemberMarker;
                }
                else if (d.business_type === '2' || d.business_type === '0') {
                    var icon = _this.memberMarker;
                }
                else {
                    var icon = _this.googleMarker;
                }
                var marker = new google.maps.Marker({
                    map: _this.map,
                    position: position,
                    icon: icon,
                    optimized: false
                });
                _this.markers.push(marker);
                if (d.photo !== undefined) {
                    _this.thumb = d.photo;
                }
                else {
                    _this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
                }
                var address = d.city + ', ' + d.state + ', ' + d.country;
                var template = d.company_name.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '') + '&' + d.city.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
                var content = '<div class="d-flex info-window"><div class="img-holder"><img src="' + _this.thumb + '"/></div>' +
                    '<div class="info-holder">' +
                    '<div tappable (click)="getBusiness(' + template + ')"><h3>' + d.company_name + '</h3></div>' +
                    '<p class="address-holder"><i class="fa fa-map-marker">' + address + '</p>' +
                    '<p class="phone-holder><i class="fa fa-phone"></i>' + d.phone_number + '</p>' +
                    '<p class="web-holder><i class="fa fa-globe"></i>' + d.company_website + '</p>' +
                    '</div></div>';
                marker.addListener('click', function () {
                    infowindow.close();
                    infowindow.setZIndex(9999);
                    infowindow.setContent(content);
                    infowindow.open(_this.map, marker);
                });
            }
        });
    };
    UserFindDealsMapPage.prototype.setMapOnAll = function (map) {
        this.markers.forEach(function (marker) {
            marker.setMap(map);
        });
    };
    UserFindDealsMapPage.prototype.showMarkers = function () {
        this.setMapOnAll(this.map);
    };
    UserFindDealsMapPage.prototype.removeMarkers = function () {
        this.setMapOnAll(null);
        this.markers = [];
        console.log(this.markers);
        console.log(this.map.center.lat(), this.map.center.lng());
    };
    UserFindDealsMapPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            var position = { lat: lat, lng: lng };
            _this.user_lat_lng = position;
            _this.storage.set('user_position', position);
            _this.geocodeLatLng();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    UserFindDealsMapPage.prototype.geocodeLatLng = function () {
        var self = this;
        this.geocoder.geocode({ 'location': this.user_lat_lng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var address = results[0].formatted_address;
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location').val(address);
                    self.storage.set('user_address', address);
                }
                else {
                    // window.alert('No results found');
                }
            }
            else {
                // window.alert('Geocoder failed due to: ' + status);
            }
        });
    };
    UserFindDealsMapPage.prototype.searchBusinessDeals = function () {
        var _this = this;
        this.mapResults = [];
        this.removeMarkers();
        if (__WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val() === '') {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').addClass('danger');
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.alert-holder').fadeIn();
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').removeClass('danger');
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.alert-holder').fadeOut();
            }, 3000);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(this.selectedMapCenter);
            var user_input = __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-name').val();
            if (user_input !== '') {
                var businessApi = this.api.Business.business_deals_search(user_input);
                console.log(user_input);
            }
            else {
                console.log('empty deal name');
                var businessApi = this.api.Business.business_deals_list();
            }
            businessApi.then(function (business) {
                console.log(business.hits.hits);
                var businessHolder = business.hits.hits;
                console.log(businessHolder);
                businessHolder.forEach(function (bus) {
                    _this.mapResults.push(bus._source);
                });
                _this.createMarker(_this.mapResults);
                console.log(_this.mapResults);
            });
        }
    };
    UserFindDealsMapPage.prototype.getBusiness = function (template) {
        var alert = this.alertCtrl.create({
            title: 'Coming Soon',
            subTitle: 'This feature is under construction right now. Check back soon!',
            buttons: ['Dismiss']
        });
        alert.present();
        // console.log(template)
        // this.navCtrl.push(UserDealsPage, {template: template}, {
        //   animate: true,
        //   direction: 'forward'
        // });
    };
    UserFindDealsMapPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsMapPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__["a" /* DashboardPage */], {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsMapPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.goListView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return UserFindDealsMapPage;
}());
UserFindDealsMapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-find-deals-map',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Find Deals</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" id="deal-name" placeholder="Search GoPage Deals">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" id="deal-location2" placeholder="Los Angeles, CA">\n\n      </label>\n\n      <div class="alert-holder"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please specify your location.</div>\n\n      <button class="fa fa-search btn-search-deals" type="submit" (click)="searchBusinessDeals()"></button>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="locations-holder">\n\n    <div class="location-holder" id="getLocation">\n\n      <ul>\n\n        <li class="location"><a><i class="fa fa-compass" aria-hidden="true"></i>Current Location</a></li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goListView()"><i class="fa fa-list"></i> Back to list</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div #mapView id="mapView">\n\n\n\n  </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], UserFindDealsMapPage);

//# sourceMappingURL=page-user-find-deals-map.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(754);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pagination__["a"]; });

//# sourceMappingURL=index.pagination.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_user_inbox_page_user_inbox__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(27);
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
        this.hasLeave = false;
        this.hasNewMsg = false;
        this.businessDetail = this.navParams.get("businessDetail");
        this.userDetail = this.navParams.get("userDetail");
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_4__angular_core__["w" /* EventEmitter */]();
        this.messages = [];
        this.chatBox = "";
        this.room_id = this.userDetail._id + this.businessDetail._id;
        this.init();
        // console.log(this.businessDetail);
        // console.log(this.userDetail);
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.socketService.joinRoom(this.room_id);
    };
    UserChatPage.prototype.ionViewDidLoad = function () {
        this.fetchChats();
        this.updateRead();
    };
    UserChatPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasLeave = true;
    };
    UserChatPage.prototype.fetchChats = function () {
        var _this = this;
        // GET MESSAGES FROM DATABASE
        this.api.Message.fetch_chats(this.room_id).then(function (chats) {
            if (_this.hasLeave) {
                return;
            }
            if (_this.hasNewMsg && !_this.hasData) {
                _this.hasNewMsg = false;
                console.log('load again');
                return _this.fetchChats();
            }
            _this.messages = chats;
            _this.hasData = true;
            console.log('Chats loaded');
            __WEBPACK_IMPORTED_MODULE_6_jquery__('body').find('.fa.loader').remove();
            _this.scrollToBottom();
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserChatPage.prototype.updateRead = function () {
        this.api.Message.update_read(this.room_id, 'business').then(function (update) {
            console.log('is_read updated');
        });
    };
    UserChatPage.prototype.init = function () {
        var _this = this;
        // Get real time message response
        this.socketService.messages.subscribe(function (chatMessage) {
            _this._zone.run(function () {
                _this.messages.push(chatMessage);
            });
            _this.hasNewMsg = true;
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
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_5__providers__["e" /* UtilService */].formatMessageRequest(user_id, business_id, first_name, last_name, message));
        this.chatBox = '';
        this.scrollToBottom();
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
    UserChatPage.prototype.goToInbox = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    return UserChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_14" /* ViewChild */])('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["n" /* Component */])({
        selector: 'page-user-chat',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button class="back-btn-new" (click)="goToInbox()">\n\n       <i class="fa fa-angle-left" aria-hidden="true"></i>\n\n    </button>\n\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a> -->\n\n    <span class=\'title\'> {{ businessDetail?.company_name }}</span>\n\n\n\n    <span class=\'title\'></span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content id="messages" #content>\n\n  <div *ngIf="hasData">\n\n    <ion-list no-lines>\n\n\n\n      <ion-item *ngFor="let msg of messages">\n\n        <chat-bubble [chatMessage]="msg"></chat-bubble>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n\n\n    <span class="fa fa-spinner fa-spin loader"></span>\n\n</ion-content>\n\n\n\n<ion-footer no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n\n  <ion-toolbar>\n\n\n\n    <ion-item no-lines>\n\n      <ion-label style="margin:0px;"></ion-label>\n\n      <div item-content style="width:100%;">\n\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-buttons right style="margin-left:10px">\n\n      <button ion-button icon-only\n\n              [disabled]="txtChat.content.trim().length<1"\n\n              (click)="sendMessage()">\n\n              SEND\n\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_5__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_5__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
// export const SOCKET_HOST = "http://localhost:3000";
// export const SOCKET_HOST = "http://localhost:3000";
var SOCKET_HOST = "https://chat-gopage-server.herokuapp.com/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 297:
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

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(78);
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

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_settings_page_settings__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var DashboardPage = (function () {
    function DashboardPage(navCtrl, http, api, storage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
    }
    DashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.firstname = user.first_name;
            _this.hasData = true;
        });
    };
    DashboardPage.prototype.ToMembership = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    DashboardPage.prototype.ToLoyalty = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    DashboardPage.prototype.ToFindDeals = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    DashboardPage.prototype.ToFavorites = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    DashboardPage.prototype.ToInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    DashboardPage.prototype.ToSettings = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_settings_page_settings__["a" /* SettingsPage */], {}, {
            animate: true,
            direction: ' forward'
        });
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-dashboard\page-dashboard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="GoPage Logo">\n\n    <span class="name">\n\n      <span class="fa-stack has-notif">\n\n        <i class="fa fa-square fa-stack-2x"></i>\n\n        <span class="fa fa-stack-1x">1</span>\n\n      </span>\n\n      Hi, {{firstname}}\n\n    </span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="container dashboard-menu">\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToMembership()">\n\n          <img src="assets/icon/membership-card.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Membership Card\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToLoyalty()">\n\n          <img src="assets/icon/loyalty-card.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Loyalty Card\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToFindDeals()">\n\n          <img src="assets/icon/find-deals.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Find Deals\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToFavorites()">\n\n          <img src="assets/icon/favorites.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Favorites\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToInbox()">\n\n          <img src="assets/icon/inbox.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Inbox\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToSettings()">\n\n          <img src="assets/icon/settings.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Settings\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-dashboard\page-dashboard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */]])
], DashboardPage);

//# sourceMappingURL=page-dashboard.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(164);
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

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsPage = (function () {
    function SettingsPage(navCtrl, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
    }
    SettingsPage.prototype.ComingSoon = function () {
        var alert = this.alertCtrl.create({
            title: 'Coming Soon',
            subTitle: 'This feature is under construction right now. Check back soon!',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SettingsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SettingsPage.prototype.logOut = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-settings\page-settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Settings</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="container settings-menu">\n\n    <a (click)="ComingSoon()">Notif<span></span>ication</a>\n\n    <hr class="divider" />\n\n    <a class="logout" (click)="logOut()">Logout</a>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-settings\page-settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], SettingsPage);

//# sourceMappingURL=page-settings.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(80);
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

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupMobileSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(80);
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

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(169);
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

/***/ 433:
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

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(443);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_email_page_signup_email__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_page_signup_mobile__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_success_page_signup_success__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_category_menu_page_category_menu__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_item_details_item_details__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_page_user_favorites_page_user_favorites__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_page_user_deals_page_user_deals__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_list_list__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__directives_pagination_index_pagination__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_status_bar__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_screen_orientation__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_geolocation__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_ngx_qrcode2__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_page_user_chat_page_user_chat__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_elasticTextarea__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_chatBubble__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__directives__ = __webpack_require__(804);
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
            __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_43__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_44__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_45__directives__["a" /* KeyboardAttachDirective */],
            __WEBPACK_IMPORTED_MODULE_41__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module#UserLoyaltyCardDealsPageModule', name: 'UserLoyaltyCardDealsPage', segment: 'page-user-loyalty-card-deals', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_40__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_37_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_43__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_44__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_41__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_39__service_api_service_component__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_42__providers__["d" /* Sql */],
            __WEBPACK_IMPORTED_MODULE_42__providers__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_42__providers__["c" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_42__providers__["e" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_32__directives_pagination_index_pagination__["a" /* PaginationService */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_geolocation__["a" /* Geolocation */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    baseUrl: 'https://gopage-api.herokuapp.com/',
    // baseUrl : 'http://localhost:5015/',
    // ChatBaseUrl : 'http://localhost:3001/',
    ChatBaseUrl: 'https://chat-gopage-server-api.herokuapp.com/',
    ElasticSearch: 'https://dev.gopage.com:9200/'
};
/* harmony default export */ __webpack_exports__["a"] = (config);
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMembershipCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_inbox_page_user_inbox__ = __webpack_require__(78);
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
    UserMembershipCardPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserMembershipCardPage.prototype.viewInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
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
        selector: 'page-user-membership-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Membership Card</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="holder-qrcode" *ngIf="hasData" >\n\n    <p class="member-name">{{user.first_name}}</p>\n\n    <ion-card *ngIf="createdCode">\n\n    <ngx-qrcode [qrc-value]="createdCode"></ngx-qrcode>\n\n    </ion-card>\n\n    <p class="qrcode-id">{{user.membership_number}}</p>\n\n  </div>\n\n</ion-content>\n\n\n\n<!-- <button ion-button full icon-left (click)="createCode()"><ion-icon name="barcode"></ion-icon>Create Code</button> -->\n\n  <!-- <button ion-button full icon-left (click)="scanCode()" color="secondary"><ion-icon name="qr-scanner"></ion-icon>Scan Code</button> -->\n\n <!--  <ion-item>\n\n\n\n    <ion-input type="text" placeholder="MY QR Code data" [(ngModel)]="qrData">\n\n    </ion-input>\n\n  </ion-item>\n\n -->\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], UserMembershipCardPage);

//# sourceMappingURL=page-user-membership-card.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFindDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_deals_page_user_deals__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_user_favorites_page_user_favorites__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_pagination_index_pagination__ = __webpack_require__(294);
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
    function UserFindDealsPage(navCtrl, navParams, platform, api, storage, geolocation, paginationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.geolocation = geolocation;
        this.paginationService = paginationService;
        this.user_lat_lng = {};
        this.markers = [];
        this.hasData = false;
        this.slice = 5;
        this.showPagination = true;
        // pager object and items
        this.pager = {};
        //search
        this.search = {
            input: '',
            location: ''
        };
    }
    UserFindDealsPage.prototype.ionViewWillEnter = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').on('click', function () {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.locations-holder').css('visibility', 'visible');
        });
        __WEBPACK_IMPORTED_MODULE_12_jquery__('.locations-holder').on('mousedown', function () {
            self.getLocation();
        });
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').on('blur', function () {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.locations-holder').css('visibility', 'hidden');
        });
        this.getLocation();
        this.getFilteredDealsAndFavorites();
        if (this.business_deals == null) {
            this.getBusinessDeals();
            console.log('data from non filtered');
        }
        else {
            this.getFilteredDealsAndFavorites();
            console.log('data from filtered');
        }
    };
    UserFindDealsPage.prototype.ionViewDidLoad = function () {
        this.initMap();
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location2').val('Los Angeles, CA');
        if (__WEBPACK_IMPORTED_MODULE_12_jquery__('.hasdeal-holder').is(':empty')) {
            __WEBPACK_IMPORTED_MODULE_12_jquery__(".hasdeal-holder").css("display", "none");
        }
    };
    UserFindDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__["a" /* DashboardPage */], {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.getUser = function () {
        var _this = this;
        this.storage.get("user").then(function (user) {
            _this.user = user;
        });
    };
    UserFindDealsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            _this.slice += 10;
            console.log(_this.business_deals);
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    UserFindDealsPage.prototype.getBusinessDeals = function () {
        var _this = this;
        this.getUser();
        this.api.Business.business_deals_list().then(function (deals) {
            _this.business_deals = [];
            var all_data = [];
            var all_business_deals = deals.hits.hits;
            var filtered_business_deals = [];
            all_business_deals = __WEBPACK_IMPORTED_MODULE_12_jquery__["grep"](all_business_deals, function (val, i) {
                if (val._source.deal_id.length == 0) {
                    filtered_business_deals.push(val);
                }
                else {
                    return true;
                }
            });
            var sorted_business_deals = all_business_deals.concat(filtered_business_deals);
            sorted_business_deals.forEach(function (all) {
                all_data.push(all._source);
            });
            _this.business_deals = all_data;
            _this.hasData = true;
            _this.getFavorites();
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserFindDealsPage.prototype.getFavorites = function () {
        var _this = this;
        this.api.Favorites.favorite_list(this.user._id).then(function (favorites) {
            _this.favorites = favorites;
            if (_this.hasData) {
                _this.favorites.forEach(function (favorite) {
                    _this.business_deals.forEach(function (business) {
                        if (business.u_id === favorite.business_id[0]._id) {
                            business.is_favorite = true;
                        }
                    });
                });
            }
        });
    };
    UserFindDealsPage.prototype.getFilteredDealsAndFavorites = function () {
        this.business_deals = this.navParams.get('business_category');
        if (this.business_deals != null) {
            this.hasData = true;
        }
    };
    UserFindDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.addToFavorites = function (business_id) {
        console.log(business_id);
        var selectedButton = document.getElementById('addToFavorite' + business_id);
        selectedButton.style.display = "none";
        selectedButton.className += " disabled";
        var deal_body = {
            deals_id: null,
            business_id: business_id,
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */], {
            animate: true,
            direction: 'back'
        });
    };
    UserFindDealsPage.prototype.getBusiness = function (business) {
        var template;
        if (business.deal_id.length !== 0) {
            var temp = business.deal_id[0].template;
            var b_template = temp.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
            template = b_template;
        }
        else {
            var name = business.company_name;
            var b_name = name.replace(/\s+/g, '-').toLowerCase();
            var city = business.city;
            var b_city = city.toLowerCase();
            template = b_name + '&' + b_city;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { template: template }, {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsPage.prototype.searchBusinessDeals = function () {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val() === '') {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').addClass('danger');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.alert-holder').fadeIn();
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').removeClass('danger');
                __WEBPACK_IMPORTED_MODULE_12_jquery__('.alert-holder').fadeOut();
            }, 3000);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(this.selectedMapCenter);
            this.api.Business.business_deals_search(this.search.input).then(function (results) {
                var result = results.hits.hits;
                console.log(results);
                var filtered_deals = _this.getDealsWithinBound(result);
                console.log(filtered_deals);
                if (filtered_deals.length > 0) {
                    _this.business_deals = [];
                    filtered_deals.forEach(function (deal) {
                        _this.business_deals.push(deal);
                    });
                }
                else {
                    _this.business_deals.splice(0, 0);
                    _this.business_deals = [];
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    UserFindDealsPage.prototype.initMap = function () {
        var _this = this;
        var self = this;
        this.storage.get('user_position').then(function (position) {
            _this.lat = position.lat;
            _this.lng = position.lng;
            console.log(self.lat, self.lng);
            _this.storage.get('user_address').then(function (address) {
                _this.address = address;
                if (self.lat != null && self.lng != null) {
                    _this.default_location = new google.maps.LatLng(34.0522, -118.2437);
                    __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(self.address);
                    console.log('user position not null');
                }
                else {
                    _this.default_location = new google.maps.LatLng(self.lat, self.lng);
                    __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val('Los Angeles, CA');
                    console.log('user position null');
                }
            });
        }).catch(function (error) {
            console.log(error);
        });
        this.map = new google.maps.Map(document.getElementById('mapView'), {
            center: self.default_location,
            zoom: 9
        });
        this.geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow();
        var location = document.getElementById('deal-location');
        var deal = document.getElementById('deal-name2');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: ['us', 'ca'] }
        };
        var autocomplete = new google.maps.places.Autocomplete(location, options);
        var searchBox = new google.maps.places.SearchBox(deal);
        autocomplete.bindTo('bounds', self.map);
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            console.log(place.geometry.location.lat(), place.geometry.location.lng());
            self.selectedMapCenter = place.formatted_address;
            if (!place.geometry)
                return;
            if (place.geometry.viewport) {
                self.map.setCenter(place.geometry.location);
                self.map.fitBounds(place.geometry.viewport);
                self.map.setZoom(9);
            }
            else {
                self.map.setCenter(place.geometry.location);
            }
        });
    };
    UserFindDealsPage.prototype.getDealsWithinBound = function (data) {
        var _this = this;
        var filtered_data = [];
        data.forEach(function (d) {
            var position = new google.maps.LatLng(d.lat, d.lng);
            var inBounds = _this.map.getBounds().contains(position);
            if (inBounds == true) {
                filtered_data.push(d);
            }
            else {
                console.log('out of bounds');
            }
        });
        console.log(filtered_data);
        return filtered_data;
    };
    UserFindDealsPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            var position = { lat: lat, lng: lng };
            _this.user_lat_lng = position;
            _this.storage.set('user_position', position);
            _this.geocodeLatLng();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    UserFindDealsPage.prototype.geocodeLatLng = function () {
        var self = this;
        this.geocoder.geocode({ 'location': this.user_lat_lng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var address = results[0].formatted_address;
                    __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(address);
                    self.storage.set('user_address', address);
                }
                else {
                    // window.alert('No results found');
                }
            }
            else {
                // window.alert('Geocoder failed due to: ' + status);
            }
        });
    };
    return UserFindDealsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], UserFindDealsPage.prototype, "content", void 0);
UserFindDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-find-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Find Deals</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" id="deal-name" placeholder="Search GoPage Deals" name="input" [(ngModel)]="search.input">\n\n      <input type="text" class="form-control" id="deal-name2" style="visibility: hidden; position: absolute;">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" id="deal-location" placeholder="Los Angeles, CA" name="location" [(ngModel)]="search.location">\n\n      </label>\n\n      <div class="alert-holder"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please specify your location.</div>\n\n      <button class="fa fa-search btn-search-deals" type="submit" (click)="searchBusinessDeals()"></button>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="locations-holder">\n\n    <div class="location-holder" id="getLocation">\n\n      <ul>\n\n        <li class="location"><a><i class="fa fa-compass" aria-hidden="true"></i>Current Location</a></li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goMapView()"><i class="fa fa-map-marker"></i> Map view</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div class="categories-header">\n\n    <div class="row">\n\n      <div class="col">\n\n        <p class="deals-counter" style="visibility: hidden;">\n\n          <span class="deals-found"></span> out of <span class="deals-total"></span> deals\n\n        </p>\n\n        <ion-item>\n\n          <ion-label> Show Image</ion-label>\n\n          <ion-toggle [(ngModel)]="toggleImage"></ion-toggle>\n\n        </ion-item>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="categories-main">\n\n    <div class="map-view" id="mapView"></div>\n\n    <div class="row">\n\n      <div class="col holder-categories-result1">\n\n        <div class="row">\n\n          <div class="col categories-result" *ngIf="hasData">\n\n\n\n            <div *ngIf="business_deals.length === 0; then noData else hasData"></div>\n\n            <ng-template #noData>\n\n              <div class="no-data-holder">\n\n                <img src="https://cdn.filestackcontent.com/DFT7nNCRSLlF5uUkZAKk">\n\n              </div>\n\n            </ng-template>\n\n            <ng-template #hasData>\n\n              <div class="deal media {{toggleImage ? \'toggled\' : \'\'}}" *ngFor="let business of business_deals | slice:0:slice; let i=index">\n\n                <span *ngIf="business.deal_id.length !== 0; then hasDeal else noDeal "></span>\n\n\n\n                <!-- has deal -->\n\n                <ng-template #hasDeal>\n\n                  <!-- <span class="hasdeal-holder" *ngFor="let deal of business.deal_id"> -->\n\n                    <div class="hasdeal-template">\n\n                      <div class="col-xs-8" tappable (click)="getBusiness(business.deal_id[0].template)">\n\n                        <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                          <img class="d-flex mr-3" src="{{business.deal_id[0].photo.url !== unknown ? business.deal_id[0].photo.url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.deal_id[0].template}}">\n\n                        </a>\n\n                        <div class="media-body align-self-center">\n\n                          <a class="business-link">{{business.company_name}}</a>\n\n                          <p class="business-address">{{business.country}}, {{business.state}}</p>\n\n                          <a class="deal-title">\n\n                            <h6 class="mt-0"><i class="fa fa-tag"></i> {{business.deal_id[0].template}}</h6>\n\n                          </a>\n\n                          <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{business.deal_id[0].end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                        </div>\n\n                      </div>\n\n\n\n                      <div class="col-xs-4">\n\n                        <div class="deals-button">\n\n                          <div *ngIf="business.is_favorite; then Favorite  else  notFavorite"></div>\n\n                          <ng-template #notFavorite>\n\n                            <div class="claim-btn-holder">\n\n                              <a class="btn btn-claim" [attr.id]="\'addToFavorite\'+business.u_id" id="addToFavorite" tappable (click)="addToFavorites(business.u_id)">Add to Favorites <i class="fa fa-chevron-right"></i></a>\n\n                              <a class="btn btn-claimed" id="addedToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n                            </div>\n\n                          </ng-template>\n\n                          <ng-template #Favorite><a class="btn btn-claim disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a></ng-template>\n\n                          <a class="btn btn-more" tappable (click)="getBusiness(business)" >More Details <i class="fa fa-chevron-right"></i></a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  <!-- </span> -->\n\n                </ng-template>\n\n\n\n                <!-- no deal -->\n\n                <ng-template #noDeal>\n\n                  <div class="col-xs-8">\n\n                    <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                      <img class="d-flex mr-3" src="{{business.files.length !== 0 ? business.files[0].url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.company_name}}">\n\n                    </a>\n\n                    <div class="media-body align-self-center">\n\n                      <a class="business-link">{{business.company_name}}</a>\n\n                      <p class="business-address">{{business.country}}, {{business.state}}</p>\n\n                    </div>\n\n                  </div>\n\n\n\n                  <div class="col-xs-4">\n\n                    <div class="deals-button">\n\n                      <div *ngIf="business.is_favorite; then Favorite  else  notFavorite"></div>\n\n                      <ng-template #notFavorite>\n\n                        <div class="claim-btn-holder">\n\n                          <a class="btn btn-claim" [attr.id]="\'addToFavorite\'+business.u_id" id="addToFavorite" tappable (click)="addToFavorites(business.u_id)">Add to Favorites <i class="fa fa-chevron-right"></i></a>\n\n                          <a class="btn btn-claimed" id="addedToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n                        </div>\n\n                      </ng-template>\n\n                      <ng-template #Favorite><a class="btn btn-claim disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a></ng-template>\n\n                      <a class="btn btn-more" tappable (click)="getBusiness(business)" >More Details <i class="fa fa-chevron-right"></i></a>\n\n                    </div>\n\n                  </div>\n\n                </ng-template>\n\n              </div>\n\n            </ng-template>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n  <!-- <div class="row" *ngIf="showPagination">\n\n    <nav class="col-12 holder-pagination">\n\n      <ul class="pagination list-unstyled" *ngIf="pager.pages && pager.pages.length">\n\n        <li class="page-item prev-page">\n\n          <button class="page-link prev-page" [ngClass]="{disabled:pager.currentPage === 1}" (click)="setPagination(pager.currentPage - 1)" ion-button small><i class="fa fa-angle-left"></i>&nbsp;<span class="prev">Prev</span></button>\n\n        </li>\n\n        <li class="page-item" *ngFor="let page of pager.pages">\n\n          <button class="page-link" [ngClass]="{active:pager.currentPage === page}" (click)="setPagination(page)" ion-button small>\n\n            {{page}}\n\n          </button>\n\n        </li>\n\n        <li class="page-item">\n\n          <button class="page-link next-page" [ngClass]="{disabled:pager.currentPage === pager.totalPages}" (click)="setPagination(pager.currentPage + 1)" ion-button small><span class="next">Next</span>&nbsp;<i class="fa fa-angle-right"></i></button>\n\n        </li>\n\n      </ul>\n\n    </nav>\n\n  </div> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_14__directives_pagination_index_pagination__["a" /* PaginationService */]])
], UserFindDealsPage);

//# sourceMappingURL=page-user-find-deals.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_service__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sql__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
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
            if (__WEBPACK_IMPORTED_MODULE_10_jquery__(window).width() <= 768) {
                _this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
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

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

var PaginationService = (function () {
    function PaginationService() {
    }
    PaginationService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 4; }
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

/***/ 756:
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

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 298,
	"./af.js": 298,
	"./ar": 299,
	"./ar-dz": 300,
	"./ar-dz.js": 300,
	"./ar-kw": 301,
	"./ar-kw.js": 301,
	"./ar-ly": 302,
	"./ar-ly.js": 302,
	"./ar-ma": 303,
	"./ar-ma.js": 303,
	"./ar-sa": 304,
	"./ar-sa.js": 304,
	"./ar-tn": 305,
	"./ar-tn.js": 305,
	"./ar.js": 299,
	"./az": 306,
	"./az.js": 306,
	"./be": 307,
	"./be.js": 307,
	"./bg": 308,
	"./bg.js": 308,
	"./bn": 309,
	"./bn.js": 309,
	"./bo": 310,
	"./bo.js": 310,
	"./br": 311,
	"./br.js": 311,
	"./bs": 312,
	"./bs.js": 312,
	"./ca": 313,
	"./ca.js": 313,
	"./cs": 314,
	"./cs.js": 314,
	"./cv": 315,
	"./cv.js": 315,
	"./cy": 316,
	"./cy.js": 316,
	"./da": 317,
	"./da.js": 317,
	"./de": 318,
	"./de-at": 319,
	"./de-at.js": 319,
	"./de-ch": 320,
	"./de-ch.js": 320,
	"./de.js": 318,
	"./dv": 321,
	"./dv.js": 321,
	"./el": 322,
	"./el.js": 322,
	"./en-au": 323,
	"./en-au.js": 323,
	"./en-ca": 324,
	"./en-ca.js": 324,
	"./en-gb": 325,
	"./en-gb.js": 325,
	"./en-ie": 326,
	"./en-ie.js": 326,
	"./en-nz": 327,
	"./en-nz.js": 327,
	"./eo": 328,
	"./eo.js": 328,
	"./es": 329,
	"./es-do": 330,
	"./es-do.js": 330,
	"./es.js": 329,
	"./et": 331,
	"./et.js": 331,
	"./eu": 332,
	"./eu.js": 332,
	"./fa": 333,
	"./fa.js": 333,
	"./fi": 334,
	"./fi.js": 334,
	"./fo": 335,
	"./fo.js": 335,
	"./fr": 336,
	"./fr-ca": 337,
	"./fr-ca.js": 337,
	"./fr-ch": 338,
	"./fr-ch.js": 338,
	"./fr.js": 336,
	"./fy": 339,
	"./fy.js": 339,
	"./gd": 340,
	"./gd.js": 340,
	"./gl": 341,
	"./gl.js": 341,
	"./gom-latn": 342,
	"./gom-latn.js": 342,
	"./he": 343,
	"./he.js": 343,
	"./hi": 344,
	"./hi.js": 344,
	"./hr": 345,
	"./hr.js": 345,
	"./hu": 346,
	"./hu.js": 346,
	"./hy-am": 347,
	"./hy-am.js": 347,
	"./id": 348,
	"./id.js": 348,
	"./is": 349,
	"./is.js": 349,
	"./it": 350,
	"./it.js": 350,
	"./ja": 351,
	"./ja.js": 351,
	"./jv": 352,
	"./jv.js": 352,
	"./ka": 353,
	"./ka.js": 353,
	"./kk": 354,
	"./kk.js": 354,
	"./km": 355,
	"./km.js": 355,
	"./kn": 356,
	"./kn.js": 356,
	"./ko": 357,
	"./ko.js": 357,
	"./ky": 358,
	"./ky.js": 358,
	"./lb": 359,
	"./lb.js": 359,
	"./lo": 360,
	"./lo.js": 360,
	"./lt": 361,
	"./lt.js": 361,
	"./lv": 362,
	"./lv.js": 362,
	"./me": 363,
	"./me.js": 363,
	"./mi": 364,
	"./mi.js": 364,
	"./mk": 365,
	"./mk.js": 365,
	"./ml": 366,
	"./ml.js": 366,
	"./mr": 367,
	"./mr.js": 367,
	"./ms": 368,
	"./ms-my": 369,
	"./ms-my.js": 369,
	"./ms.js": 368,
	"./my": 370,
	"./my.js": 370,
	"./nb": 371,
	"./nb.js": 371,
	"./ne": 372,
	"./ne.js": 372,
	"./nl": 373,
	"./nl-be": 374,
	"./nl-be.js": 374,
	"./nl.js": 373,
	"./nn": 375,
	"./nn.js": 375,
	"./pa-in": 376,
	"./pa-in.js": 376,
	"./pl": 377,
	"./pl.js": 377,
	"./pt": 378,
	"./pt-br": 379,
	"./pt-br.js": 379,
	"./pt.js": 378,
	"./ro": 380,
	"./ro.js": 380,
	"./ru": 381,
	"./ru.js": 381,
	"./sd": 382,
	"./sd.js": 382,
	"./se": 383,
	"./se.js": 383,
	"./si": 384,
	"./si.js": 384,
	"./sk": 385,
	"./sk.js": 385,
	"./sl": 386,
	"./sl.js": 386,
	"./sq": 387,
	"./sq.js": 387,
	"./sr": 388,
	"./sr-cyrl": 389,
	"./sr-cyrl.js": 389,
	"./sr.js": 388,
	"./ss": 390,
	"./ss.js": 390,
	"./sv": 391,
	"./sv.js": 391,
	"./sw": 392,
	"./sw.js": 392,
	"./ta": 393,
	"./ta.js": 393,
	"./te": 394,
	"./te.js": 394,
	"./tet": 395,
	"./tet.js": 395,
	"./th": 396,
	"./th.js": 396,
	"./tl-ph": 397,
	"./tl-ph.js": 397,
	"./tlh": 398,
	"./tlh.js": 398,
	"./tr": 399,
	"./tr.js": 399,
	"./tzl": 400,
	"./tzl.js": 400,
	"./tzm": 401,
	"./tzm-latn": 402,
	"./tzm-latn.js": 402,
	"./tzm.js": 401,
	"./uk": 403,
	"./uk.js": 403,
	"./ur": 404,
	"./ur.js": 404,
	"./uz": 405,
	"./uz-latn": 406,
	"./uz-latn.js": 406,
	"./uz.js": 405,
	"./vi": 407,
	"./vi.js": 407,
	"./x-pseudo": 408,
	"./x-pseudo.js": 408,
	"./yo": 409,
	"./yo.js": 409,
	"./zh-cn": 410,
	"./zh-cn.js": 410,
	"./zh-hk": 411,
	"./zh-hk.js": 411,
	"./zh-tw": 412,
	"./zh-tw.js": 412
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
webpackContext.id = 757;

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_email_page_signup_email__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(57);
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
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupPage);

//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 776:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details_item_details__ = __webpack_require__(433);
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

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
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
        this.hasLeave = false;
        this.message = [];
        this.init();
    }
    UserInboxPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.fetchInboxData();
    };
    UserInboxPage.prototype.ionViewDidLoad = function () {
        // this.storage.get('user').then(user =>{
        //   this.user = user;
        //   // console.log(user)
        //
        //     this.api.Message.business_list(user._id).then(business => {
        //       this.businessList = business;
        //       // console.log(business);
        //
        //       this.hasData = true;
        //       this.socketService.connect();
        //       $('body').find('.fa.loader').remove();
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        //
        // }).catch((error) => {
        //     console.log(error);
        // });
    };
    UserInboxPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasData = false;
    };
    UserInboxPage.prototype.fetchInboxData = function () {
        var _this = this;
        console.log('data inbox fetching... INBOX PAGE');
        // Display all business
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.api.Message.room_list(user._id).then(function (business) {
                var withChats = [], noChats = [];
                for (var x = 0; x < business.length; x++) {
                    if (business[x].last_chat.length > 0) {
                        withChats.push(business[x]);
                    }
                    else {
                        noChats.push(business[x]);
                    }
                }
                var chatsSort = withChats.sort(function (a, b) {
                    return b.last_chat[0].epoch - a.last_chat[0].epoch;
                });
                var newChats = withChats;
                noChats.forEach(function (res) {
                    newChats.push(res);
                });
                _this.businessList = newChats;
                _this.hasData = true;
                _this.socketService.connect();
                __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                // this.businessList = business;
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    UserInboxPage.prototype.formatEpoch = function (epoch) {
        return __WEBPACK_IMPORTED_MODULE_7__providers__["e" /* UtilService */].getCalendarDay(epoch);
    };
    UserInboxPage.prototype.init = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            // console.log(chatNotification);
            console.log('Notif from business');
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    if (chatNotification.user_id == user._id) {
                        _this.hasNotify = true;
                        // this.hasNewMsgBusinessId = chatNotification.business_id;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                _this.fetchInboxData();
            });
        });
    };
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {
            animate: true,
            direction: 'back'
        });
    };
    UserInboxPage.prototype.viewMessage = function (businessDetail, userDetail) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
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
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /> <span *ngIf="hasNotify" class="count-msg">!</span> </a> -->\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Inbox</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <!-- <span [ngClass]="[customersList ? \'hidden\' : \'visible\']"> Inbox is empty </span> -->\n\n\n\n    <ion-list id="inbox-list">\n\n      <ion-item  *ngFor="let business of businessList;" tappable (click)="viewMessage(business.business_id[0],business.user_id[0])">\n\n\n\n        <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="name" *ngIf="business.business_id[0] && business.business_id[0].company_name"> {{business.business_id[0].company_name}}  </span>\n\n\n\n        <span class="name" [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" *ngIf="business.business_id[0] && !business.business_id[0].company_name"> No Company Name </span>\n\n\n\n        <span class="name" *ngIf="business.business_id && business.business_id.length == 0"> No Business Data </span>\n\n\n\n        <p [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="message" *ngIf="business.last_chat.length != 0"> {{ business.last_chat[0].message  }}  </p>\n\n\n\n        <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="date-time" *ngIf="business.last_chat.length != 0">  {{formatEpoch(business.last_chat[0].epoch)}} </span>\n\n\n\n      </ion-item>\n\n\n\n      <!-- <ion-item>\n\n        <span class="name-new"> John Devera </span>\n\n\n\n        <span class="date-time-new"> 7:12am &nbsp;&nbsp; 10/30/17 </span>\n\n\n\n        <p class="message-new">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget velit leo. Etiam a ipsum et elit maximus volutpat non quis leo. Morbi viverra auctor nibh egestas finibus. Maecenas egestas augue in posuere hendrerit. Cras posuere fermentum dui, nec posuere nisl facilisis ut. Duis aliquam, diam tristique faucibus venenatis, mi ante mollis elit, non pulvinar leo orci pharetra augue. Donec dignissim eu velit id imperdiet. Donec sit amet facilisis quam. Duis non risus sodales ante sollicitudin rhoncus et a nulla. </p>\n\n\n\n      </ion-item> -->\n\n      <span class="fa fa-spinner fa-spin loader"></span>\n\n    </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_7__providers__["c" /* SocketService */]])
], UserInboxPage);

//# sourceMappingURL=page-user-inbox.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupEmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_success_page_signup_success__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_config__ = __webpack_require__(57);
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
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupEmailPage);

//# sourceMappingURL=page-signup-email.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__ = __webpack_require__(801);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 801:
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

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatBubble__ = __webpack_require__(803);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chatBubble__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 803:
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

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__ = __webpack_require__(805);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardAttachDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(432);
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

/***/ })

},[438]);
//# sourceMappingURL=main.js.map