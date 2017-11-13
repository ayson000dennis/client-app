webpackJsonp([1],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_favorites_page_user_favorites__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_chat_page_user_chat__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_jquery__);
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
    function UserDealsPage(iab, navCtrl, platform, navParams, api, alertCtrl, storage) {
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.hasData = false;
        this.operatingHours = [];
        this.currentDay = [];
        //in app browser option
        this.iabOptions = {
            location: 'yes',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            toolbarposition: 'top',
            fullscreen: 'yes' //Windows only
        };
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
        this.business = this.navParams.get('business');
        this.resizeImgs();
        if (this.business.operations) {
            var days = this.business.operations;
            if (this.business.operations[0] === '0') {
                //Do something
            }
            else if (this.business.operations[0] === '2') {
                //Do something
            }
            else if (this.business.operations[0] === '1') {
                //Do something
            }
            else {
                days.forEach(function (day, i) {
                    var d = Object.keys(day)[0];
                    var isClosed = eval("day." + d + ".isChecked");
                    var start = eval("day." + d + ".start");
                    var end = eval("day." + d + ".end");
                    var startDecimal = start.replace(':', '.');
                    var endDecimal = end.replace(':', '.');
                    //convert 24hrs to 12hrs time format
                    //start time
                    if (start.length === 4) {
                        start = "0" + start;
                    }
                    var startH = +start.substr(0, 2);
                    var starth = (startH % 12) || 12;
                    var startampm = startH < 12 ? " AM" : " PM";
                    start = starth + start.substr(2, 3) + startampm;
                    //end time
                    var endH = +end.substr(0, 2);
                    var endh = (endH % 12) || 12;
                    var endampm = endH < 12 ? " AM" : " PM";
                    end = endh + end.substr(2, 3) + endampm;
                    // if(isClosed) {
                    var work = {
                        dayCount: i + 1,
                        day: d,
                        start: start,
                        end: end,
                        startDecimal: startDecimal,
                        endDecimal: endDecimal,
                        isClosed: isClosed
                    };
                    // }
                    _this.operatingHours.push(work);
                });
                this.operatingHours.forEach(function (operations) {
                    var today = new Date().getDay();
                    if (operations.dayCount === today) {
                        _this.currentDay.push(operations);
                    }
                });
                console.log(this.currentDay);
                //get current time
                var hrs = new Date().getHours();
                var mins = new Date().getMinutes();
                this.currentTime = hrs + '.' + mins;
            }
        }
        if (this.business !== null) {
            this.hasData = true;
        }
        this.getFavorites();
    };
    UserDealsPage.prototype.resizeImgs = function () {
        if (this.business.files.length !== 0) {
            //resize banner imgs
            this.business.files.forEach(function (files) {
                var banner_imgs = files.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:500/");
                files.url = banner_imgs;
            });
        }
        if (this.business.deal_id.length !== 0) {
            //resize deal imgs
            this.business.deal_id.forEach(function (deal) {
                var deal_imgs = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                deal.photo.url = deal_imgs;
            });
        }
    };
    UserDealsPage.prototype.getFavorites = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.api.Favorites.favorite_list(user._id).then(function (favorites) {
                _this.favorites = favorites;
                if (_this.hasData) {
                    _this.favorites.forEach(function (favorite) {
                        // this.business.forEach((business, i) => {
                        if (_this.business._id === favorite.business_id[0]._id) {
                            _this.business.is_favorite = true;
                            __WEBPACK_IMPORTED_MODULE_9_jquery__('#favHeart').css('color', '#a4c73a');
                        }
                        // });
                    });
                }
            });
        });
    };
    UserDealsPage.prototype.addToFavorites = function (business) {
        var _this = this;
        var selectedButton = document.getElementById('addToFavorite1');
        selectedButton.style.display = "none";
        var addedToFavBtn = document.getElementById('addedToFavorite2');
        addedToFavBtn.style.display = "block";
        __WEBPACK_IMPORTED_MODULE_9_jquery__('#favHeart').css('color', '#a4c73a');
        this.storage.get('user').then(function (user) {
            var deal_id = [];
            if (business.deal_id.length !== 0) {
                console.log('with deal');
                business.deal_id.forEach(function (id) {
                    deal_id.push(id);
                });
            }
            else {
                console.log('business only');
                deal_id = [];
            }
            var deal_body = {
                deals_id: deal_id,
                business_id: business._id,
                customer_id: user._id
            };
            _this.api.Favorites.add_to_favorite(deal_body).then(function (favorite) {
                console.log(JSON.stringify(favorite.message));
            })
                .catch(function (error) {
                console.log(error._body);
            });
        });
    };
    UserDealsPage.prototype.goToFavorites = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */], {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserDealsPage.prototype.viewMap = function (address, state, zip) {
        var map_url = 'https://www.google.com/maps/place/';
        this.iab.create(map_url + address + ',' + state + ',' + zip, '_blank', this.iabOptions);
    };
    UserDealsPage.prototype.ionViewDidLoad = function () {
    };
    UserDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserDealsPage.prototype.goListView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserDealsPage.prototype.showHours = function () {
        if (__WEBPACK_IMPORTED_MODULE_9_jquery__(".operations-list").hasClass("open")) {
            __WEBPACK_IMPORTED_MODULE_9_jquery__(".operations-list").removeClass("open");
            __WEBPACK_IMPORTED_MODULE_9_jquery__(".toggle-collapse").text("(show more)");
        }
        else {
            __WEBPACK_IMPORTED_MODULE_9_jquery__(".operations-list").addClass("open");
            __WEBPACK_IMPORTED_MODULE_9_jquery__(".toggle-collapse").text("(show less)");
        }
    };
    UserDealsPage.prototype.readMore = function () {
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".shorten").addClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".read-more").addClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".read-less").removeClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".full-text").removeClass("hidden");
    };
    UserDealsPage.prototype.readLess = function () {
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".shorten").removeClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".read-more").removeClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".read-less").addClass("hidden");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".full-text").addClass("hidden");
    };
    UserDealsPage.prototype.sendMessage = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
                businessDetail: _this.business,
                previousPage: 'deals',
                userDetail: user
            }, {
                animate: true,
                direction: 'forward',
                animation: 'md-transition'
            });
        });
    };
    UserDealsPage.prototype.goPrevious = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    return UserDealsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
], UserDealsPage.prototype, "slider", void 0);
UserDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
<<<<<<< HEAD
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/'<ion-header>\n\n  <ion-navbar *ngIf="hasData">\n\n    <button ion-button class="back-btn" (click)="goPrevious()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="business-title">{{business.company_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="deals-page">\n\n  <div *ngIf="hasData">\n\n\n\n    <div *ngIf="business?.deal_id.length !== 0 || business.files.length !==0 || business.phone_number !== null || business.company_website !== null || business.business_email !== null || business.operations.length === 0;"></div>\n\n\n\n    <!-- <div *ngIf="business?.deal_id.length !== 0 || business.files.length !==0 || business.phone_number !== null || business.company_website !== null || business.business_email !== null"></div> -->\n\n\n\n    <div class="slider-holder" [hidden]="!business.deal_id.length || !business.files.length">\n\n      <div *ngIf="business?.files.length === 1; then oneImg else manyImgs"></div>\n\n      <ng-template #manyImgs>\n\n        <ion-slides #slider loop="true">\n\n          <ion-slide *ngFor="let img of business.files; let i = index;">\n\n            <img src="{{img.length !== 0 ? img.url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n          </ion-slide>\n\n\n\n        </ion-slides>\n\n        <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left fa-lg"></i></span>\n\n        <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right fa-lg"></i></span>\n\n      </ng-template>\n\n\n\n      <ng-template #oneImg>\n\n        <div class="img-banner">\n\n          <img src="{{business.files.length !== 0 ? business.files[0].url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n        </div>\n\n      </ng-template>\n\n\n\n    </div>\n\n\n\n    <!-- <div class="slider-holder">\n\n      <ion-slides #slider loop="true">\n\n        <ion-slide >\n\n          <img src="http://psdwizard.net/preview/gopage/assets/images/slider-img01.jpg" alt="Deals photo">\n\n        </ion-slide>\n\n      </ion-slides>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left fa-lg"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right fa-lg"></i></span>\n\n    </div>\n\n\n\n     <nav id="business-actions" class="navbar navbar-light">\n\n      <ul class="nav nav-tabs">\n\n        <li class="nav-item">\n\n          <a class="nav-link"><i class="fa fa-map-o"></i> Directions</a>\n\n        </li>\n\n        <li class="nav-item">\n\n          <a class="nav-link" tappable (click)="getBusiness()"><i class="fa fa-star-o"></i> Add to Favorites</a>\n\n        </li>\n\n        <li class="nav-item">\n\n          <a class="nav-link" tappable (click)="sendMessage()"><i class="fa fa-comment-o"></i> Send Message</a>\n\n        </li>\n\n      </ul>\n\n    </nav> -->\n\n\n\n    <div class="row">\n\n      <div class="col-12 about-business">\n\n        <div class="about-description">\n\n          <p class="business-name">{{business.company_name}}</p>\n\n\n\n          <div *ngIf="business.description !== undefined; then hasDesc else noDesc"></div>\n\n\n\n          <ng-template #hasDesc>\n\n            <p class="short-description" [hidden]="business.description" *ngIf="business.description.length >= 70">\n\n              <span class="shorten">{{business.description.substr(0, 70)}}... </span>\n\n              <span class="full-text hidden">{{business.description}}</span>\n\n              <a class="read-more" (click)="readMore()">Read more</a>\n\n              <a class="read-less hidden" (click)="readLess()">Read less</a>\n\n            </p>\n\n\n\n            <p class="short-description" [hidden]="!business.description" *ngIf="business.description.length <= 69">\n\n              {{business.description}}\n\n            </p>\n\n          </ng-template>\n\n\n\n          <ng-template #noDesc>\n\n            <!-- //do something -->\n\n          </ng-template>\n\n\n\n        </div>\n\n        <!-- <p class="about-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo ligula</p> -->\n\n        <div *ngIf="business.business_type != \'0\' ; then isClickable else isNotClickable"></div>\n\n\n\n        <ng-template #isClickable>\n\n          <ul class="social-links list-unstyled isClickable">\n\n            <li class="address-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-map-marker fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" (click)="viewMap(business.address, business.state, business.zip_postal)" target="_blank">\n\n                  <span class="info-text">{{business.address}}, {{business.state}}, {{business.zip_postal}} </span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.phone_number">\n\n              <div class="col-2">\n\n                <i class="fa fa-phone fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" href="tel:{{business.phone_number}}">\n\n                  <span class="info-text">{{business.phone_number}}</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li *ngIf="business.operations.length !== 0; then hasOperations else noOperations"></li>\n\n            <ng-template #hasOperations>\n\n              <li *ngIf="business.operations[0] === \'0\'"></li>\n\n\n\n              <li *ngIf="business.operations[0] === \'1\'"></li>\n\n\n\n              <li *ngIf="business.operations[0] === \'2\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10">\n\n                  <a class="clickable-link">\n\n                    Open 24 Hours\n\n                  </a>\n\n                </div>\n\n              </li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] !== \'2\' && business.operations[0] !== \'0\' && business.operations[0] !== \'1\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div *ngIf="currentDay[0].isClosed !== true; then isOpen else isClosed"></div>\n\n                <div class="col-10">\n\n                  <ng-template #isOpen>\n\n                    <div *ngIf="currentTime < currentDay[0].endDecimal; then businessOpen else businessClosed"></div>\n\n                    <ng-template #businessOpen>\n\n                      <span>Open Today {{currentDay[0].start}} - {{currentDay[0].end}}</span>\n\n                    </ng-template>\n\n                    <ng-template #businessClosed>\n\n                      <span>Closed Today</span>\n\n                    </ng-template>\n\n                   </ng-template>\n\n                  <ng-template #isClosed>\n\n                    <span>Closed Today</span>\n\n                  </ng-template>\n\n                  <a class="clickable-link" tappable (click)="showHours()">(show more)</a>\n\n                </div>\n\n              </li>\n\n              <li>\n\n                <div class="col-12">\n\n                  <ul class="list-unstyled operations-list" *ngFor="let operations of operatingHours; let i = index">\n\n                    <li><strong>{{operations.day}}</strong> {{ operations.start }} -  {{ operations.end}}  </li>\n\n                  </ul>\n\n                </div>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <li class="info-link active-deals">\n\n              <div class="col-2">\n\n                <i class="fa fa-tag fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" href="#dealsList">\n\n                  <span class="info-text">{{business.deal_id.length}} active deals</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-heart fa-2x" id="favHeart"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" tappable (click)="addToFavorites(business)">\n\n                  <span class="info-text">Add to favorites</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-comment fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" tappable (click)="sendMessage()">\n\n                  <span class="info-text">Send Message</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n            <!-- <li *ngIf="!business.deal_id.length; then hasDeal else noDeal"></li>\n\n            <ng-template #hasDeal>\n\n              <li class="info-link" >\n\n                <a class="clickable-link">\n\n                  <i class="fa fa-tag fa-2x"></i>\n\n                  <span class="info-text"> {{business.deal_id.length}} active deals</span>\n\n                </a>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <ng-template #noDeal>\n\n              <li class="info-link" >\n\n                <a class="clickable-link">\n\n                  <i class="fa fa-tag fa-2x"></i>\n\n                  <span class="info-text"> 0 active deals</span>\n\n                </a>\n\n              </li>\n\n            </ng-template> -->\n\n\n\n            <span class="social-media">\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.company_website ? \'inactive\' : \'\' " href="{{business.company_website}}" target="_blank">\n\n                  <i class="fa fa-globe fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.facebook_url ? \'inactive\' : \'\' " href="{{business.facebook_url}}" target="_blank">\n\n                  <i class="fa fa-facebook fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.twitter_url ? \'inactive\' : \'\' " href="{{business.twitter_url}}" target="_blank">\n\n                  <i class="fa fa-twitter fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.instagram_url ? \'inactive\' : \'\' " href="{{business.instagram_url}}" target="_blank">\n\n                  <i class="fa fa-instagram fa-2x"></i>\n\n                </a>\n\n              </li>\n\n            </span>\n\n          </ul>\n\n        </ng-template>\n\n\n\n        <ng-template #isNotClickable>\n\n          <ul class="social-links list-unstyled">\n\n            <li class="address-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-map-marker fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">{{business.address}}, {{business.state}}, {{business.country}}, {{business.zip_postal}} </span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.phone_number">\n\n              <div class="col-2">\n\n                <i class="fa fa-phone fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.phone_number}}</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li *ngIf="business.operations.length !== 0; then hasOperations else noOperations"></li>\n\n            <ng-template #hasOperations>\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'0\'"></li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'1\'"></li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'2\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10">\n\n                  <span>Open 24 Hours</span>\n\n                </div>\n\n              </li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] !== \'2\' && business.operations[0] !== \'0\' && business.operations[0] !== \'1\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10 op-hours">\n\n                  <div *ngIf="currentDay[0].isClosed !== true; then isOpen else isClosed"></div>\n\n                  <ng-template #isOpen>\n\n                    <span>Open Today {{currentDay[0].start}} - {{currentDay[0].end}}</span>\n\n                   </ng-template>\n\n                  <ng-template #isClosed>\n\n                    Closed Today\n\n                    <span *ngIf="operatingHours.dayCount === currentDay">{{operatingHours[0].day}}</span>\n\n                  </ng-template>\n\n                  <a class="toggle-collapse" tappable (click)="showHours()">(show more)</a>\n\n                </div>\n\n                <span *ngIf="operatingHours.length === 0; then h"></span>\n\n              </li>\n\n\n\n              <li>\n\n                <div class="col-12">\n\n                  <ul class="list-unstyled operations-list" *ngFor="let operations of operatingHours; let i = index">\n\n                    <li><strong>{{operations.day}}</strong> {{ operations.start }} -  {{ operations.end}}  </li>\n\n                  </ul>\n\n                </div>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <li class="info-link active-deals">\n\n              <div class="col-2">\n\n                <i class="fa fa-tag fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.deal_id.length}} active deals</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" tappable (click)="addToFavorites(business)">\n\n              <div class="col-2">\n\n                <i class="fa fa-heart fa-2x" id="favHeart"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">Add to favorites</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" tappable (click)="sendMessage()">\n\n              <div class="col-2">\n\n                <i class="fa fa-comment fa-2x" ></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">Send Message</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.company_website">\n\n              <div class="col-2">\n\n                <i class="fa fa-globe fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.company_website}}</span>\n\n              </div>\n\n            </li>\n\n            <!-- <li class="info-link" [hidden]="!business.business_email">\n\n              <a><i class="fa fa-envelope fa-2x"></i>\n\n                <span class="info-text"> {{business.business_email}}</span>\n\n              </a>\n\n            </li> -->\n\n            <li class="info-link" [hidden]="!business.facebook_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-facebook fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.facebook_url}}</span>\n\n              </div>\n\n            </li>\n\n            <li class="info-link" [hidden]="!business.twitter_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-twitter fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.twitter_url}}</span>\n\n              </div>\n\n            </li>\n\n            <li class="info-link" [hidden]="!business.instagram_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-instagram fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.instagram_url}}</span>\n\n              </div>\n\n            </li>\n\n          </ul>\n\n        </ng-template>\n\n      </div>\n\n\n\n      <div class="col-12 page-divider">\n\n        <h4>Deals</h4>\n\n      </div>\n\n\n\n      <div class="col-12 deals-list">\n\n        <div *ngIf="business.deal_id != 0 ; then hasDeal else noDeal"></div>\n\n\n\n        <ng-template #hasDeal>\n\n          <div class="media" *ngFor="let deal of business.deal_id">\n\n            <img class="d-flex align-self-center mr-3" [src]="deal.photo.url">\n\n            <div class="media-body align-self-center">\n\n              <a name="dealsList" href="#"><h5 class="mt-0">{{deal.template}}</h5></a>\n\n            </div>\n\n          </div>\n\n        </ng-template>\n\n\n\n        <ng-template #noDeal>\n\n          <h4>No deals available</h4>.\n\n        </ng-template>\n\n\n\n        <!-- <div class="add-favorite"><a class="btn">Add to Favorites <i class="fa fa-chevron-right"></i></a></div> -->\n\n\n\n        <div *ngIf="business.is_favorite; then Favorite else notFavorite"></div>\n\n        <ng-template #Favorite>\n\n          <div class="claim-btn-holder">\n\n            <a class="add-favorite true disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n          </div>\n\n        </ng-template>\n\n        <ng-template #notFavorite>\n\n          <div class="claim-btn-holder">\n\n            <a class="btn add-favorite" id="addToFavorite1" tappable (click)="addToFavorites(business)">Add to Favorites</a>\n\n            <a class="btn add-favorite true" id="addedToFavorite2" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n          </div>\n\n        </ng-template>\n\n      </div>\n\n    </div>\n\n<!--\n\n    <div class="row map-holder">\n\n      <div class="map-view" id="mapView"></div>\n\n    </div> -->\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/
=======
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/'<ion-header>\n\n  <ion-navbar *ngIf="hasData">\n\n    <button ion-button class="back-btn" (click)="goPrevious()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="business-title">{{business.company_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="deals-page">\n\n  <div *ngIf="hasData">\n\n\n\n    <div *ngIf="business?.deal_id.length !== 0 || business.files.length !==0 || business.phone_number !== null || business.company_website !== null || business.business_email !== null || business.operations.length === 0;"></div>\n\n\n\n    <!-- <div *ngIf="business?.deal_id.length !== 0 || business.files.length !==0 || business.phone_number !== null || business.company_website !== null || business.business_email !== null"></div> -->\n\n\n\n    <div class="slider-holder" [hidden]="!business.deal_id.length || !business.files.length">\n\n      <div *ngIf="business?.files.length === 1; then oneImg else manyImgs"></div>\n\n      <ng-template #manyImgs>\n\n        <ion-slides #slider loop="true">\n\n          <ion-slide *ngFor="let img of business.files; let i = index;">\n\n            <img src="{{img.length !== 0 ? img.url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n          </ion-slide>\n\n\n\n        </ion-slides>\n\n        <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left fa-lg"></i></span>\n\n        <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right fa-lg"></i></span>\n\n      </ng-template>\n\n\n\n      <ng-template #oneImg>\n\n        <div class="img-banner">\n\n          <img src="{{business.files.length !== 0 ? business.files[0].url : \'assets/images/placeholder.jpg\'}}" alt="Deals photo">\n\n        </div>\n\n      </ng-template>\n\n\n\n    </div>\n\n\n\n    <!-- <div class="slider-holder">\n\n      <ion-slides #slider loop="true">\n\n        <ion-slide >\n\n          <img src="http://psdwizard.net/preview/gopage/assets/images/slider-img01.jpg" alt="Deals photo">\n\n        </ion-slide>\n\n      </ion-slides>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left fa-lg"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right fa-lg"></i></span>\n\n    </div>\n\n\n\n     <nav id="business-actions" class="navbar navbar-light">\n\n      <ul class="nav nav-tabs">\n\n        <li class="nav-item">\n\n          <a class="nav-link"><i class="fa fa-map-o"></i> Directions</a>\n\n        </li>\n\n        <li class="nav-item">\n\n          <a class="nav-link" tappable (click)="getBusiness()"><i class="fa fa-star-o"></i> Add to Favorites</a>\n\n        </li>\n\n        <li class="nav-item">\n\n          <a class="nav-link" tappable (click)="sendMessage()"><i class="fa fa-comment-o"></i> Send Message</a>\n\n        </li>\n\n      </ul>\n\n    </nav> -->\n\n\n\n    <div class="row">\n\n      <div class="col-12 about-business">\n\n        <div class="about-description">\n\n          <p class="business-name">{{business.company_name}}</p>\n\n\n\n          <p class="short-description" [hidden]="!business.description" *ngIf="business.description.length >= 70">\n\n            <span class="shorten">{{business.description.substr(0, 70)}}... </span>\n\n            <span class="full-text hidden">{{business.description}}</span>\n\n            <a class="read-more" (click)="readMore()">Read more</a>\n\n            <a class="read-less hidden" (click)="readLess()">Read less</a>\n\n          </p>\n\n\n\n          <p class="short-description" [hidden]="!business.description" *ngIf="business.description.length <= 69">\n\n            {{business.description}}\n\n          </p>\n\n        </div>\n\n        <!-- <p class="about-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo ligula</p> -->\n\n        <div *ngIf="business.business_type != \'0\' ; then isClickable else isNotClickable"></div>\n\n\n\n        <ng-template #isClickable>\n\n          <ul class="social-links list-unstyled isClickable">\n\n            <li class="address-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-map-marker fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" (click)="viewMap(business.address, business.state, business.zip_postal)" target="_blank">\n\n                  <span class="info-text">{{business.address}}, {{business.state}}, {{business.zip_postal}} </span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.phone_number">\n\n              <div class="col-2">\n\n                <i class="fa fa-phone fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" href="tel:{{business.phone_number}}">\n\n                  <span class="info-text">{{business.phone_number}}</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li *ngIf="business.operations.length !== 0; then hasOperations else noOperations"></li>\n\n            <ng-template #hasOperations>\n\n              <li *ngIf="business.operations[0] === \'0\'"></li>\n\n\n\n              <li *ngIf="business.operations[0] === \'1\'"></li>\n\n\n\n              <li *ngIf="business.operations[0] === \'2\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10">\n\n                  <a class="clickable-link">\n\n                    Open 24 Hours\n\n                  </a>\n\n                </div>\n\n              </li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] !== \'2\' && business.operations[0] !== \'0\' && business.operations[0] !== \'1\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div *ngIf="operatingHours.isClosed !== true; then isOpen else isClosed"></div>\n\n                <div class="col-10">\n\n                  <ng-template #isOpen>\n\n                    <span>Open Today {{currentDay[0].start}} - {{currentDay[0].end}}</span>\n\n                   </ng-template>\n\n                  <ng-template #isClosed>\n\n                    <span>Closed Today</span>\n\n                  </ng-template>\n\n                  <a class="clickable-link" tappable (click)="showHours()">(show more)</a>\n\n                </div>\n\n              </li>\n\n              <li>\n\n                <div class="col-12">\n\n                  <ul class="list-unstyled operations-list" *ngFor="let operations of operatingHours; let i = index">\n\n                    <li><strong>{{operations.day}}</strong> {{ operations.start }} -  {{ operations.end}}  </li>\n\n                  </ul>\n\n                </div>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <li class="info-link active-deals">\n\n              <div class="col-2">\n\n                <i class="fa fa-tag fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" href="#dealsList">\n\n                  <span class="info-text">{{business.deal_id.length}} active deals</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-heart fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" id="addToFavorite1" tappable (click)="addToFavorites(business)">\n\n                  <span class="info-text">Add to favorites</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-comment fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <a class="clickable-link" tappable (click)="sendMessage()">\n\n                  <span class="info-text">Send Message</span>\n\n                </a>\n\n              </div>\n\n            </li>\n\n            <!-- <li *ngIf="!business.deal_id.length; then hasDeal else noDeal"></li>\n\n            <ng-template #hasDeal>\n\n              <li class="info-link" >\n\n                <a class="clickable-link">\n\n                  <i class="fa fa-tag fa-2x"></i>\n\n                  <span class="info-text"> {{business.deal_id.length}} active deals</span>\n\n                </a>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <ng-template #noDeal>\n\n              <li class="info-link" >\n\n                <a class="clickable-link">\n\n                  <i class="fa fa-tag fa-2x"></i>\n\n                  <span class="info-text"> 0 active deals</span>\n\n                </a>\n\n              </li>\n\n            </ng-template> -->\n\n\n\n            <span class="social-media">\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.company_website ? \'inactive\' : \'\' " href="{{business.company_website}}" target="_blank">\n\n                  <i class="fa fa-globe fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.facebook_url ? \'inactive\' : \'\' " href="{{business.facebook_url}}" target="_blank">\n\n                  <i class="fa fa-facebook fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.twitter_url ? \'inactive\' : \'\' " href="{{business.twitter_url}}" target="_blank">\n\n                  <i class="fa fa-twitter fa-2x"></i>\n\n                </a>\n\n              </li>\n\n\n\n              <li class="info-link">\n\n                <a class="clickable-link" ng-class="!business.instagram_url ? \'inactive\' : \'\' " href="{{business.instagram_url}}" target="_blank">\n\n                  <i class="fa fa-instagram fa-2x"></i>\n\n                </a>\n\n              </li>\n\n            </span>\n\n          </ul>\n\n        </ng-template>\n\n\n\n        <ng-template #isNotClickable>\n\n          <ul class="social-links list-unstyled">\n\n            <li class="address-link">\n\n              <div class="col-2">\n\n                <i class="fa fa-map-marker fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">{{business.address}}, {{business.state}}, {{business.country}}, {{business.zip_postal}} </span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.phone_number">\n\n              <div class="col-2">\n\n                <i class="fa fa-phone fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.phone_number}}</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li *ngIf="business.operations.length !== 0; then hasOperations else noOperations"></li>\n\n            <ng-template #hasOperations>\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'0\'"></li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'1\'"></li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] === \'2\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10">\n\n                  <span>Open 24 Hours</span>\n\n                </div>\n\n              </li>\n\n\n\n              <li class="operations-link" *ngIf="business.operations[0] !== \'2\' && business.operations[0] !== \'0\' && business.operations[0] !== \'1\'">\n\n                <div class="col-2">\n\n                  <i class="fa fa-clock-o fa-2x"></i>\n\n                </div>\n\n                <div class="col-10 op-hours">\n\n                  <div *ngIf="operatingHours.isClosed !== true; then isOpen else isClosed"></div>\n\n                  <ng-template #isOpen>Open Today </ng-template>\n\n                  <ng-template #isClosed>\n\n                    Closed Today\n\n                    <span *ngIf="operatingHours.dayCount === currentDay">{{operatingHours[0].day}}</span>\n\n                  </ng-template>\n\n                  <a class="toggle-collapse" tappable (click)="showHours()">(show more)</a>\n\n                </div>\n\n                <span *ngIf="operatingHours.length === 0; then h"></span>\n\n              </li>\n\n\n\n              <li>\n\n                <div class="col-12">\n\n                  <ul class="list-unstyled operations-list" *ngFor="let operations of operatingHours; let i = index">\n\n                    <li><strong>{{operations.day}}</strong> {{ operations.start }} -  {{ operations.end}}  </li>\n\n                  </ul>\n\n                </div>\n\n              </li>\n\n            </ng-template>\n\n\n\n            <li class="info-link active-deals">\n\n              <div class="col-2">\n\n                <i class="fa fa-tag fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.deal_id.length}} active deals</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" id="addToFavorite1" tappable (click)="addToFavorites(business)">\n\n              <div class="col-2">\n\n                <i class="fa fa-heart fa-2x" ></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">Add to favorites</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" tappable (click)="sendMessage()">\n\n              <div class="col-2">\n\n                <i class="fa fa-comment fa-2x" ></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text">Send Message</span>\n\n              </div>\n\n            </li>\n\n\n\n            <li class="info-link" [hidden]="!business.company_website">\n\n              <div class="col-2">\n\n                <i class="fa fa-globe fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.company_website}}</span>\n\n              </div>\n\n            </li>\n\n            <!-- <li class="info-link" [hidden]="!business.business_email">\n\n              <a><i class="fa fa-envelope fa-2x"></i>\n\n                <span class="info-text"> {{business.business_email}}</span>\n\n              </a>\n\n            </li> -->\n\n            <li class="info-link" [hidden]="!business.facebook_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-facebook fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.facebook_url}}</span>\n\n              </div>\n\n            </li>\n\n            <li class="info-link" [hidden]="!business.twitter_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-twitter fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.twitter_url}}</span>\n\n              </div>\n\n            </li>\n\n            <li class="info-link" [hidden]="!business.instagram_url">\n\n              <div class="col-2">\n\n                <i class="fa fa-instagram fa-2x"></i>\n\n              </div>\n\n              <div class="col-10">\n\n                <span class="info-text"> {{business.instagram_url}}</span>\n\n              </div>\n\n            </li>\n\n          </ul>\n\n        </ng-template>\n\n      </div>\n\n\n\n      <div class="col-12 page-divider">\n\n        <h4>Deals</h4>\n\n      </div>\n\n\n\n      <div class="col-12 deals-list">\n\n        <div *ngIf="business.deal_id != 0 ; then hasDeal else noDeal"></div>\n\n\n\n        <ng-template #hasDeal>\n\n          <div class="media" *ngFor="let deal of business.deal_id">\n\n            <img class="d-flex align-self-center mr-3" [src]="deal.photo.url">\n\n            <div class="media-body align-self-center">\n\n              <a name="dealsList" href="#"><h5 class="mt-0">{{deal.template}}</h5></a>\n\n            </div>\n\n          </div>\n\n        </ng-template>\n\n\n\n        <ng-template #noDeal>\n\n          <h4>No deals available</h4>.\n\n        </ng-template>\n\n\n\n        <!-- <div class="add-favorite"><a class="btn">Add to Favorites <i class="fa fa-chevron-right"></i></a></div> -->\n\n\n\n        <div *ngIf="business.is_favorite; then Favorite else notFavorite"></div>\n\n        <ng-template #Favorite>\n\n          <div class="claim-btn-holder">\n\n            <a class="add-favorite true disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n          </div>\n\n        </ng-template>\n\n        <ng-template #notFavorite>\n\n          <div class="claim-btn-holder">\n\n            <a class="btn add-favorite" id="addToFavorite1" tappable (click)="addToFavorites(business)">Add to Favorites</a>\n\n            <a class="btn add-favorite true" id="addedToFavorite2" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n          </div>\n\n        </ng-template>\n\n      </div>\n\n    </div>\n\n<!--\n\n    <div class="row map-holder">\n\n      <div class="map-view" id="mapView"></div>\n\n    </div> -->\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-deals\page-user-deals.html"*/
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(25);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
], SliderPage.prototype, "slider", void 0);
SliderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-slider',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/'<!-- <ion-header no-shadow>\n\n  <ion-navbar>\n\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content no-bounce class="page-slider text-center">\n\n  <ion-slides #slider pager="true" (ionSlideNextStart)="onSlideNext($event)">\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <!-- <p class="subtitle">\n\n        Helping members &amp; small<br> business win\n\n      </p> -->\n\n      <img class="slider-img main-image" src="assets/images/member-main-image.jpg" alt="">\n\n      <!-- <h3 class="main-title">Your Go To App for Local</h3>\n\n      <h3 class="main-title">Loyalty Deals &amp; Discounts</h3> -->\n\n\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n\n\n      <img class="slider-img" src="assets/images/member-iphone-login.png" alt="">\n\n      <p class="subtitle">\n\n        With GoPage you are a preferred <br>customer and receive the best deals and <br> alerts from your favorite business.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-card.png" alt="">\n\n      <p class="subtitle">\n\n        You get to easily find deals, flash sales, <br>loyalty offers and more that are near you <br>or in another location.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-map.png" alt="">\n\n      <p class="subtitle">\n\n        Alerts are your choice, no one elses. You <br>can control who, when and how you receive <br>alerts from small business you like.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/member-iphone-messages.png" alt="">\n\n      <p class="subtitle">\n\n        Never carry another plastic or paper <br>small business loyalty card again. All your <br>small business loyalty cards are perfectly <br>organised, easy accessible and easy to use.\n\n      </p>\n\n\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n    </ion-slide>\n\n  </ion-slides>\n\n\n\n  <button class="btn-slider btn-green" (click)="signUp()">Get Started</button>\n\n  <button class="btn-slider btn-green-out" (click)="signIn()">Sign In</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-slider\page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(173);
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
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserLoyaltyCardsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserLoyaltyCardsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            // console.log(user)
            _this.api.Loyalties.business(user._id).then(function (loyalty) {
                //  var biz_id = [];
                //
                //  for (var x = 0; x < loyalty.length; x++) {
                //    if ($.inArray(loyalty[x].business_id[0]._id, biz_id[x]) == -1) {
                //      console.log(biz_id);
                //      biz_id.push(loyalty[x].business_id[0]._id);
                //    }
                //  }
                //
                //  console.log(biz_id)
                _this.loyalties = loyalty;
                _this.hasData = true;
                console.log(loyalty);
            });
        });
    };
    UserLoyaltyCardsPage.prototype.showCardDeals = function (business_id, business_name) {
        console.log(business_name);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */], { business_id: business_id, business_name: business_name }, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    return UserLoyaltyCardsPage;
}());
UserLoyaltyCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-cards',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Loyalty Cards</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="business-cards-holder" *ngIf="hasData">\n\n    <div *ngIf="loyalties.length !== 0; then hasLoyalties else noLoyalties"></div>\n\n    <ng-template #hasLoyalties>\n\n      <div class="business-cards" *ngFor="let loyalty of loyalties; let i = index;" tappable (click)="showCardDeals(loyalty.business_id[0]._id,loyalty.business_id[0].company_name)">\n\n        <div class="img-holder">\n\n          <img src="{{loyalty.business_id[0].files[0].url !== null ? loyalty.business_id[0].files[0].url : assets/images/placeholder.jpg}}" alt="">\n\n        </div>\n\n        <div class="text-holder">\n\n          <h3 class="card-title-text">{{loyalty.business_id[0].company_name}}</h3>\n\n          <span class="card-location-text">{{loyalty.business_id[0].country}}</span>\n\n          <span class="card-count-text">{{loyalty.loyalties_row}} loyalty cards</span>\n\n          <i class="fa fa-chevron-right fa-2x"></i>\n\n        </div>\n\n      </div>\n\n    </ng-template>\n\n\n\n    <ng-template #noLoyalties>\n\n      <div class="no-loyalty-holder">\n\n        <h4>Currently you have no loyalty cards, go explore what different loyalty offers GoPage businesses have to offer!</h4>\n\n      </div>\n\n    </ng-template>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-cards\page-user-loyalty-cards.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], UserLoyaltyCardsPage);

//# sourceMappingURL=page-user-loyalty-cards.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(26);
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
    function CategoryMenuPage(navCtrl, api, navParams) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.navParams = navParams;
        this.hasData = false;
        this.first_word = [];
    }
    CategoryMenuPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('asdasdasdasdasd');
        this.api.BusinessCategory.business_category().then(function (business_category) {
            business_category.forEach(function (business) {
                console.log(business);
                var category = business.name;
                var cat = category.split(/[ ,]+/);
                _this.first_word.push(cat[0].toLowerCase());
            });
            _this.business_category = business_category;
            _this.hasData = true;
            // business_category.forEach(business => {
            //   let category = business.name;
            //   let cat = category;
            //   this.category.push(cat);
            // });
            // this.category.forEach(cat => {
            //   this.business_category.push(cat);
            // });
            // this.first_word.forEach(first_word => {
            //   this.business_category.push(first_word);
            // });
        });
    };
    CategoryMenuPage.prototype.seeAll = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], { business_category: null }, {
            animate: true,
            direction: 'back'
        });
    };
    CategoryMenuPage.prototype.goFilterBusiness = function (business_cat) {
        var _this = this;
        var input = this.navParams.get('user_input');
        this.api.Business.business_deals_category(input, business_cat).then(function (businesses) {
            console.log(businesses);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], { user_input: input, filtered_business_deals: businesses, business_cat: business_cat }, {
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
        selector: 'page-category-menu',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/'<ion-content padding class="content-category-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list class="menu-list">\n\n    <ul class="categories-list" >\n\n      <li (click)="seeAll()"><a href="#"><img src="assets/icon/icon-alldeals.svg">All Deals</a></li>\n\n      <div *ngFor="let business of business_category; let k = index;">\n\n        <li (click)="goFilterBusiness(business.name)" [hidden]="!business.name"><a href="#"><img src="assets/icon/icon-category-{{first_word[k]}}.svg">  {{ business.name }}</a></li>\n\n      </div>\n\n    </ul>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-menu\page-category-menu\page-category-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], CategoryMenuPage);

//# sourceMappingURL=page-category-menu.js.map

/***/ }),

/***/ 162:
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], SortMenuPage);

//# sourceMappingURL=page-sort-menu.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_user_inbox_page_user_inbox__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(26);
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
        // user: string[];
        this.hasData = false;
        this.hasLeave = false;
        this.isRefetch = false;
        this.businessDetail = this.navParams.get("businessDetail");
        this.userDetail = this.navParams.get("userDetail");
        this.previousPage = this.navParams.get("previousPage");
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_4__angular_core__["w" /* EventEmitter */]();
        this.messages = [];
        this.chatBox = "";
        this.room_id = this.userDetail._id + this.businessDetail._id;
        this.init();
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.socketService.joinRoom(this.room_id);
        this.fetchChats();
        this.updateRead();
    };
    UserChatPage.prototype.ionViewDidLoad = function () {
    };
    UserChatPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasLeave = true;
        this.hasData = false;
    };
    UserChatPage.prototype.fetchChats = function () {
        var _this = this;
        //  GET MESSAGES FROM DATABASE
        this.api.Message.fetch_chats(this.room_id).then(function (chats) {
            console.log('fetching chats...');
            if (_this.hasLeave) {
                return;
            }
            //  if(this.message_by === 'business' && !this.hasData) {
            //    this.message_by = '';
            //    console.log('load again');
            //    return this.fetchChats();
            //  }
            if (!_this.isRefetch) {
                _this.isRefetch = true;
                console.log('Refetching inbox data...');
                return _this.fetchChats();
            }
            else {
                _this.messages = chats;
                _this.hasData = true;
                _this.scrollToBottom();
                __WEBPACK_IMPORTED_MODULE_6_jquery__('body').find('.fa.loader').remove();
                console.log('Inbox data loaded');
            }
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
            _this.message_by = chatMessage.message_by;
            _this._zone.run(function () {
                // this.fetchChats();
                _this.messages.push(chatMessage);
                _this.scrollToBottom();
                _this.updateRead();
            });
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
        var member_full_name = this.userDetail.first_name + " " + this.userDetail.last_name;
        var user_id = this.userDetail._id, first_name = this.userDetail.first_name, last_name = this.userDetail.last_name, business_id = this.businessDetail._id;
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_5__providers__["e" /* UtilService */].formatMessageRequest(user_id, business_id, first_name, last_name, member_full_name, message));
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
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserChatPage.prototype.goToInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
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
        selector: 'page-user-chat',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button class="back-btn-new" (click)="goToInbox()">\n\n       <i class="fa fa-angle-left" aria-hidden="true"></i>\n\n    </button>\n\n    <span class=\'title\'> {{ businessDetail?.company_name }}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content id="messages" #content>\n\n  <div *ngIf="hasData">\n\n    <ion-list no-lines>\n\n\n\n      <ion-item *ngFor="let msg of messages">\n\n        <chat-bubble [chatMessage]="msg"></chat-bubble>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n\n\n    <span class="fa fa-spinner fa-spin loader"></span>\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="hasData" no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n\n  <ion-toolbar>\n\n\n\n    <ion-item no-lines>\n\n      <ion-label style="margin:0px;"></ion-label>\n\n      <div item-content style="width:100%;">\n\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-buttons right style="margin-left:10px">\n\n      <button ion-button icon-only\n\n              [disabled]="txtChat.content.trim().length<1"\n\n              (click)="sendMessage()">\n\n              SEND\n\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-chat\page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_5__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_5__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 164:
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
], Sql);

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(164);
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

/***/ 170:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_email_page_signup_email__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(52);
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
        // platform.ready().then(() => {
        //   $('body').on('click', '.country-code, .country-dropdown-val', function() {
        //     console.log('1');
        //     $(this).closest('.holder-country-code').toggleClass('showDropdown');
        //
        //     if ($(this).hasClass('country-dropdown-val')) {
        //       var getImg = $(this).find('img').attr('src');
        //
        //       $(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
        //     }
        //   });
        // });
    }
    SignupMobilePage.prototype.ionViewWillEnter = function () {
        this.areaCode = '1';
    };
    SignupMobilePage.prototype.ionViewDidLoad = function () {
        console.log();
        var self = this;
        __WEBPACK_IMPORTED_MODULE_10_jquery__('body').on('click', '.country-code, .country-dropdown-val', function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__(this).closest('.holder-country-code').toggleClass('showDropdown');
            console.log('yes');
            if (__WEBPACK_IMPORTED_MODULE_10_jquery__(this).hasClass('country-dropdown-val')) {
                var getImg = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).find('img').attr('src');
                self.areaCode = __WEBPACK_IMPORTED_MODULE_10_jquery__(this).data('area');
                __WEBPACK_IMPORTED_MODULE_10_jquery__(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
            }
        });
    };
    SignupMobilePage.prototype.ionViewWillLeave = function () {
        __WEBPACK_IMPORTED_MODULE_10_jquery__('body').off('click', '.country-code, .country-dropdown-val');
    };
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
                getMobileVal = "+" + this.areaCode + getMobileVal;
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
                    if (err.status == 406) {
                        getMobile.addClass('has-error').next('.text-validate').text('Mobile number has already been used.');
                    }
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
                var numberVal = '+' + this.areaCode + this.posts.number;
                __WEBPACK_IMPORTED_MODULE_10_jquery__["ajax"]({
                    url: '//gopage-api.herokuapp.com/api/users/add',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        first_name: ' ',
                        last_name: ' ',
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
        selector: 'page-signup-mobile',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup-mobile\page-signup-mobile.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <div class="form1">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n    </p>\n\n    <p class="text-center subtitle">\n\n      Sign up with <a href="#" (click)="fbConnect()">Facebook</a>, <a href="#" (click)="gpConnect()">Google</a> or <a href="#" (click)="goSignupEmail()">email address</a>\n\n    </p>\n\n    <div class="divider">\n\n      <span>or</span>\n\n    </div>\n\n    <p class="description">Enter your mobile number</p>\n\n    <form class="form-signup">\n\n      <label>\n\n        <div class="holder-country-code">\n\n          <div class="country-code">\n\n            <img src="assets/images/icon-flag-us.jpg" alt=""/>\n\n            <span class="fa fa-caret-down"></span>\n\n          </div>\n\n          <ul class="country-dropdown">\n\n            <li class="country-dropdown-val" data-area="1">\n\n              <img src="assets/images/icon-flag-us.jpg" alt=""/><span class="country-name">U.S. </span><span class="country-area-code">(+1)</span>\n\n            </li>\n\n            <li class="country-dropdown-val" data-area="1">\n\n              <img src="assets/images/icon-flag-ca.jpg" alt=""/><span class="country-name">Canada </span><span class="country-area-code">(+1)</span>\n\n            </li>\n\n          </ul>\n\n        </div>\n\n        <input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.number"/>\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="signMeUp()">Sign Up</button>\n\n    </form>\n\n    <hr class="hr" />\n\n    <p class="description">Already have an account? <a href="#" (click)="goLogin()">Log In</a></p>\n\n  </div>\n\n\n\n  <div class="form2">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n      Verify Your Mobile Number\n\n    </p>\n\n    <form class="form-verify">\n\n      <label>\n\n        <input type="text" placeholder="Verification Code">\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="verifyMe()">Verify</button>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="form3">\n\n    <p class="title">\n\n      <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n      Create a Password\n\n    </p>\n\n    <form class="form-password">\n\n      <label>\n\n        <input id="enter-password" class="input-mobile" type="password" placeholder="Enter password" />\n\n        <input id="confirm-password" class="input-mobile" type="password" placeholder="Confirm password" />\n\n        <span class="text-validate"></span>\n\n      </label>\n\n      <button class="btn-green" type="submit" (click)="createMyPass()">Submit</button>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup-mobile\page-signup-mobile.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _e || Object])
], SignupMobilePage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=page-signup-mobile.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(52);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyCardDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(26);
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
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserLoyaltyCardDealsPage.prototype.goCard = function (title, stamps, stamps_needed) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */], { title: title, stamps: stamps, stamps_needed: stamps_needed, }, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    return UserLoyaltyCardDealsPage;
}());
UserLoyaltyCardDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-card-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/'<!--\n\n  Generated template for the PageUserLoyaltyCardDealsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <!-- <div class="back-btn-holder" tappable (click)="backToLoyaltyCards()">\n\n    <ion-icon ios="ios-arrow-back"></ion-icon>\n\n    <p>Back to Loyalty Cards</p>\n\n  </div> -->\n\n  <ion-navbar *ngIf="hasData">\n\n    <button ion-button class="back-btn" (click)="goPrevious()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="business-title">{{business_name}}</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="card-deals-holder" *ngIf="hasData">\n\n    <div class="card-deal" *ngFor="let deal of deals" (click)="goCard(deal.deals_id[0].template, deal.loyalty_details.stamp, deal.deals_id[0].buy_pcs)">\n\n      <div class="img-holder">\n\n        <img [src]="deal.deals_id[0].photo.url" alt="">\n\n      </div>\n\n      <div class="text-holder">\n\n        <h3 class="deal-title-text">{{deal.deals_id[0].template}}</h3>\n\n         <span class="card-stamp-text">{{deal.loyalty_details.stamp}} of {{deal.deals_id[0].buy_pcs}}</span>\n\n        <span class="card-expiration-text">Expires {{deal.deals_id[0].end_date | date : \'MM/dd/yyyy\'}}</span>\n\n        <i class="fa fa-chevron-right fa-2x"></i>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-card-deals\page-user-loyalty-card-deals.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
], UserLoyaltyCardDealsPage);

//# sourceMappingURL=page-user-loyalty-card-deals.js.map

/***/ }),

/***/ 184:
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
webpackEmptyAsyncContext.id = 184;

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(52);
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
    function LoginPage(events, navCtrl, http, fb, gp, storage, api) {
        this.events = events;
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
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '3' }).subscribe(function (res) {
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
            _this.events.publish('user:login', user);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
<<<<<<< HEAD
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
=======
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */]])
], LoginPage);

//# sourceMappingURL=page-login.js.map

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module": [
		808,
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
webpackAsyncContext.id = 231;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoyaltyStampCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(25);
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
            direction: 'back',
            animation: 'md-transition'
        });
    };
    return UserLoyaltyStampCardPage;
}());
UserLoyaltyStampCardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-loyalty-stamp-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <p class="title">\n\n      <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n      <span *ngIf="this.title">{{this.title}}</span>\n\n    </p>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="stamps-window">\n\n    <div class="holder-stamps"></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-loyalty-stamp-card\page-user-loyalty-stamp-card.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
], UserLoyaltyStampCardPage);

//# sourceMappingURL=page-user-loyalty-stamp-card.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(25);
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
        this.Business = {
            catch: function (err) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/catch/error", { error: err }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            // business_deals_search: (input) => {
            //       return this.http.get(Config.ElasticSearch + "business/list/_search?size=1000&q=" + input, {
            //         headers : this.getHeaders()}).map(response => {
            //         return response.json();
            //       }).toPromise();
            // },
            // business_deals_list: () => {
            //       return this.http.get(Config.ElasticSearch + "business/list/_search?size=1000", {
            //         headers : this.getHeaders()}).map(response => {
            //           return response.json();
            //       }).toPromise();
            // },
            // business_deals_category: (input, category) => {
            //   let url;
            //   if (input !== '') {
            //     url = "business/list/_search?size=1000&q=" + input;
            //   } else {
            //     url = "business/list/_search?size=1000";
            //   }
            //   return this.http.post(Config.ElasticSearch + url , JSON.stringify(this.categoryQuery(category)), {
            //     headers : this.getHeaders()
            //   }).map(response => {
            //     return response.json();
            //   }).toPromise();
            // },
            business_deals_search: function (input) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/search/" + input, {})
                    .map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business_deals_list: function () {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/search", {})
                    .map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business_deals_category: function (input, category) {
                var url;
                if (input !== '') {
                    url = "api/business/search/" + input;
                }
                else {
                    url = "api/business/search";
                }
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + url, JSON.stringify(_this.categoryQuery(category)))
                    .map(function (response) {
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
            business_view: function (id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/view/" + id).map(function (response) {
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
            room_list: function (user_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/rooms/" + user_id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            update_read: function (room_id, message_by) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/chats/update_read/" + room_id + "/" + message_by, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/chats/list/" + room_id).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    // private userAuth = btoa(Config.elasticUsername + ":" + Config.elasticPassword);
    // getHeaders() {
    //   return new Headers({'Authorization': 'Basic ' + this.userAuth});
    // }
    ApiService.prototype.categoryQuery = function (data) {
        var category = {
            "sort": [
                { "business_type.keyword": "desc" },
                "_score"
            ],
            "query": {
                "match_phrase": {
                    "business_category": data
                }
            }
        };
        return category;
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ApiService);

//# sourceMappingURL=api.service.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
// export const SOCKET_HOST = "http://localhost:3000";
// export const SOCKET_HOST = "http://localhost:3000";
var SOCKET_HOST = "https://chat-gopage-server.herokuapp.com/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 296:
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
    UtilService.formatMessageRequest = function (user_id, business_id, first_name, last_name, member_full_name, message) {
        return {
            user_id: user_id,
            business_id: business_id,
            first_name: first_name,
            last_name: last_name,
            member_full_name: member_full_name,
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_settings_page_settings__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
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
    function DashboardPage(navCtrl, http, api, storage, _zone, socketService) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.api = api;
        this.storage = storage;
        this._zone = _zone;
        this.socketService = socketService;
        this.hasData = false;
        this.hasNotify = false;
        this.notifCountTotal = 0;
        this.initInboxNotification();
    }
    DashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.socketService.connect();
        this.getNotificationCount();
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.firstname = user.first_name;
        });
    };
    DashboardPage.prototype.getNotificationCount = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            if (user._id) {
                _this.api.Message.room_list(user._id).then(function (members) {
                    if (members.length) {
                        var withChats = [];
                        for (var x = 0; x < members.length; x++) {
                            if (members[x].last_chat.length > 0 && members[x].last_chat[0].is_read == false && members[x].last_chat[0].message_by !== 'member') {
                                withChats.push(members[x]);
                            }
                        }
                        _this.notifCountTotal = withChats.length;
                    }
                    _this.hasData = true;
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                console.log('User ID not found');
            }
        });
    };
    DashboardPage.prototype.initInboxNotification = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    if (chatNotification.user_id == user._id) {
                        console.log('Notification from business | Dashboard Page');
                        _this.hasNotify = true;
                        // this.notifCount++;
                        _this.getNotificationCount();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    DashboardPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasNotify = false;
    };
    DashboardPage.prototype.ToMembership = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    DashboardPage.prototype.ToLoyalty = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    DashboardPage.prototype.ToFindDeals = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    DashboardPage.prototype.ToFavorites = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    DashboardPage.prototype.ToInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    DashboardPage.prototype.ToSettings = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_settings_page_settings__["a" /* SettingsPage */], {}, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-dashboard\page-dashboard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="GoPage Logo">\n\n    <span class="name">\n\n      <span *ngIf="hasData" [ngClass]="[ notifCountTotal != 0 ? \'has-notif\' : \'no-notif\']" class="fa-stack" (click)="ToInbox()">\n\n        <i class="fa fa-square fa-stack-2x"></i>\n\n        <!-- <span class="fa fa-stack-1x" *ngIf="!hasNotify">0</span> -->\n\n        <span class="fa fa-stack-1x">{{ notifCountTotal }}</span>\n\n      </span>\n\n      Hi, {{firstname}}\n\n    </span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="container dashboard-menu">\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToMembership()">\n\n          <img src="assets/icon/membership-card.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Membership Card\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToLoyalty()">\n\n          <img src="assets/icon/loyalty-card.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Loyalty Card\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToFindDeals()">\n\n          <img src="assets/icon/find-deals.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Find Deals\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToFavorites()">\n\n          <img src="assets/icon/favorites.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Favorites\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToInbox()">\n\n          <img src="assets/icon/inbox.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Inbox\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToSettings()">\n\n          <img src="assets/icon/settings.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Settings\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-dashboard\page-dashboard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_10__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_9__providers__["c" /* SocketService */]])
], DashboardPage);

//# sourceMappingURL=page-dashboard.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(165);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFindDealsMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_deals_page_user_deals__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(23);
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
    function UserFindDealsMapPage(navCtrl, navParams, platform, api, storage, alertCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        //default location
        this.default_lat = 34.0522;
        this.default_lng = -118.24369999999999;
        this.user_lat_lng = {};
        this.markers = [];
        this.tempMarkers = [];
        this.mapResults = [];
        this.selectedMapCenter = {
            address: '', location: ''
        };
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
        this.selectedMapCenter.address = this.navParams.get('map_address');
        this.business_deals = this.navParams.get('business_deals');
        console.log(this.business_deals);
<<<<<<< HEAD
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').on('click', function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__(this).get(0).setSelectionRange(0, 9999);
=======
        __WEBPACK_IMPORTED_MODULE_11_jquery__('#deal-location2').on('click', function () {
            __WEBPACK_IMPORTED_MODULE_11_jquery__(this).get(0).setSelectionRange(0, 9999);
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
            // $(this).select();
            // $('.locations-holder').css('visibility', 'visible');
        });
        // $('.locations-holder').on('mousedown', function() {
        //   self.getLocation();
        // });
        // $('#deal-location2').on('blur', function() {
        //   $('.locations-holder').css('visibility', 'hidden');
        // });
        //location input tweak for ios
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location').on('keypress', function () {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.scroll-content').animate({ scrollTop: 1 }, 'fast');
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.scroll-content').animate({ scrollTop: 0 }, 'fast');
            }, 50);
        });
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').contextmenu(function () {
            return false;
        });
    };
    UserFindDealsMapPage.prototype.ionViewDidLoad = function () {
        var self = this;
        setTimeout(function () {
            self.initMap();
            console.log('map initializing');
<<<<<<< HEAD
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#searchBtn2').click();
=======
            __WEBPACK_IMPORTED_MODULE_11_jquery__('#searchBtn2').click();
            this.searched_business_deals = undefined;
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
        }, 650);
    };
    UserFindDealsMapPage.prototype.initMap = function () {
        var _this = this;
        var self = this;
        var map_center = this.navParams.get('map_center');
        if (map_center !== '') {
            console.log('map center not null');
            var map_center = this.navParams.get('map_center');
            var search_input = this.navParams.get('search_input');
            this.default_location = map_center;
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-name2').val(search_input);
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(this.selectedMapCenter.address);
            if (search_input !== '') {
                console.log('creating searched input');
                var business_deals = this.navParams.get('business_deals');
                setTimeout(function () {
                    self.createMarker(business_deals);
                }, 1200);
            }
            else {
                console.log('creating all');
                // this.storage.get('all_business_deals').then(all_business_deals => {
                //   setTimeout(() => {
                //     this.createMarker(all_business_deals);
                //   });
                // });
            }
        }
        else {
            console.log('map center null');
            this.storage.get('user_selected_latlng').then(function (position) {
                _this.lat = position.lat;
                _this.lng = position.lng;
                _this.storage.get('user_short_location').then(function (address) {
                    _this.address = address;
                    if (self.lat != null && self.lng != null) {
                        _this.default_location = new google.maps.LatLng(self.lat, self.lng);
                        _this.selectedMapCenter.address = self.address;
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(self.address);
                    }
                    else {
                        _this.default_location = new google.maps.LatLng(34.0522, -118.2437);
                        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val('Los Angeles, CA');
                    }
                });
            });
            this.storage.get('all_business_deals').then(function (all_business_deals) {
                setTimeout(function () {
                    _this.createMarker(all_business_deals);
                });
            });
            // var business_deals = this.navParams.get('business_deals');
            // setTimeout(function() {
            //   self.createMarker(business_deals);
            // }, 1200)
        }
        this.map = new google.maps.Map(document.getElementById('mapView'), {
            center: this.default_location,
            zoom: 10
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
        // var searchBox = new google.maps.places.SearchBox(deal);
        // searchBox.bindTo('bounds', self.map);
        var marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
<<<<<<< HEAD
            // need to stop prop of the touchend event
            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                setTimeout(function () {
                    var container = document.getElementsByClassName('pac-container')[0];
                    console.log(container);
                    container.addEventListener('touchstart', function (e) {
                        e.stopImmediatePropagation();
                        setTimeout(function () {
                        }, 300);
                    });
                }, 500);
            }
=======
            self.business_deals = undefined;
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
            var place = autocomplete.getPlace();
            var city, state, country;
            place.address_components.forEach(function (result) {
                if (result.types[0] == "locality") {
                    city = result.long_name;
                }
                if (result.types[0] == "administrative_area_level_1") {
                    state = result.short_name;
                }
                if (result.types[0] == "country") {
                    country = result.long_name;
                }
            });
            var location = city + ', ' + state + ', ' + country;
            self.selectedMapCenter.address = location;
            self.selectedMapCenter.location = place.geometry.location;
            var selected_lat = place.geometry.location.lat();
            var selected_lng = place.geometry.location.lng();
            var user_selected_latlng = { lat: selected_lat, lng: selected_lng };
            self.storage.set('user_selected_latlng', user_selected_latlng);
            self.storage.set('user_short_location', location);
            self.storage.set('user_long_location', place.formatted_address);
            if (!place.geometry)
                return;
            if (place.geometry.viewport) {
                self.map.setCenter(place.geometry.location);
                self.map.fitBounds(place.geometry.viewport);
                self.map.setZoom(10);
            }
            else {
                self.map.setCenter(place.geometry.location);
            }
        });
        // need to stop prop of the touchend event (for ios devices)
        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
            setTimeout(function () {
                var container = document.getElementsByClassName('pac-container')[0];
                container.addEventListener('touchend', function (e) {
                    e.stopImmediatePropagation();
                });
            }, 500);
        }
        //   searchBox.addListener('places_changed', function() {
        //     self.mapResults = [];
        //     var places = searchBox.getPlaces();
        //     console.log(places)
        //     if (places.length == 0) {
        //      return;
        //    }
        //    // Clear out the old markers.
        //    self.markers.forEach(marker => {
        //      marker.setMap(null);
        //    });
        //    self.markers = [];
        //
        //    // For each place, get the icon, name and location.
        //    var bounds = new google.maps.LatLngBounds();
        //
        //    var count = 1;
        //    places.forEach(function(place, i) {
        //      if (!place.geometry) {
        //        console.log("Returned place contains no geometry");
        //        return;
        //      }
        //
        //      places[i].count =  count;
        //      count++;
        //      var photo = place.photos[i].getUrl({
        //          'maxWidth' : 120,
        //          'maxHeight' : 120
        //      });
        //
        //      self.mapResults.push({
        //        title: place.name,
        //        address: place.formatted_address,
        //        lat: place.geometry.location.lat(),
        //        lng: place.geometry.location.lng(),
        //        photo: photo,
        //        type: 3
        //      });
        //
        //      if (place.geometry.viewport) {
        //        // Only geocodes have viewport.
        //        bounds.union(place.geometry.viewport);
        //      } else {
        //        bounds.extend(place.geometry.location);
        //      }
        //    });
        //    self.map.fitBounds(self.map);
        //  });
    };
    UserFindDealsMapPage.prototype.createMarker = function (data) {
        var _this = this;
        var infowindow = new google.maps.InfoWindow();
        data.forEach(function (d) {
            var position = new google.maps.LatLng(d.lat, d.lng);
            // var inBounds = this.map.getBounds().contains(position);
            // if (inBounds == true) {
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
<<<<<<< HEAD
            if (d.deal_id.length !== 0) {
                d.deal_id.forEach(function (deal) {
                    if (deal.is_featured) {
                        var img = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                        d.featured_img = img;
                    }
                });
                if (d.featured_img !== undefined) {
                    _this.thumb = d.featured_img;
                }
                else {
                    if (d.deal_id[0].photo.url !== undefined) {
                        _this.thumb = d.deal_id[0].photo.url;
                    }
                    else {
                        _this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
                    }
                }
=======
            if (d.files.length !== 0) {
                _this.thumb = d.files[0].url;
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
            }
            else {
                if (d.files.length !== 0) {
                    d.files.forEach(function (files) {
                        var img = files.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                        files.url = img;
                    });
                    _this.thumb = d.files[0].url;
                }
                else {
                    _this.thumb = 'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww';
                }
            }
            var self = _this;
            var address = d.city + ', ' + d.state + ', ' + d.country;
            // var template = d.company_name.replace(/\s+/g, '-').replace(/'/g, "quote").toLowerCase().replace(/[^\w\-]+/g, '') + '&' + d.city.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-]+/g, '');
            var content = '<div class="d-flex info-window"><div class="img-holder"><img src="' + _this.thumb + '"/></div>' +
                '<div class="info-holder">' +
                '<div tappable id="businessInfo"><h3>' + d.company_name + '</h3></div>' +
                '<p class="address-holder"><i class="fa fa-map-marker">' + d.address + '</p>' +
                '<p class="phone-holder><i class="fa fa-phone"></i>' + d.phone_number + '</p>' +
                '<p class="web-holder><i class="fa fa-globe"></i>' + d.company_website + '</p>' +
                '</div></div>';
            marker.addListener('click', function () {
                infowindow.close();
                infowindow.setZIndex(9999);
                infowindow.setContent(content);
                infowindow.open(_this.map, marker);
                __WEBPACK_IMPORTED_MODULE_10_jquery__('#businessInfo').on('click', function () {
                    self.getBusiness(d);
                });
            });
            // }
        });
        this.storage.get('user_selected_latlng').then(function (user_selected_latlng) {
            var position = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
            // this.map.setCenter(position);
            _this.map.panTo(position);
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
    };
    UserFindDealsMapPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            var position = { lat: lat, lng: lng };
            _this.user_lat_lng = position;
            _this.storage.set('user_selected_latlng', position);
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
                    var city, state, country;
                    results[0].address_components.forEach(function (result) {
                        if (result.types[0] == "locality") {
                            city = result.long_name;
                        }
                        if (result.types[0] == "administrative_area_level_1") {
                            state = result.short_name;
                        }
                        if (result.types[0] == "country") {
                            country = result.long_name;
                        }
                    });
                    var location = city + ', ' + state + ', ' + country;
                    __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location').val(location);
                    self.storage.set('user_short_location', location);
                    self.storage.set('user_long_location', address);
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
    UserFindDealsMapPage.prototype.selectFirstResult = function () {
        var self = this;
        var firstResult = __WEBPACK_IMPORTED_MODULE_10_jquery__(".pac-container .pac-item:first").text();
        this.geocoder.geocode({ "address": firstResult }, function (results, status) {
            if (status === 'OK') {
                var address = results[0].formatted_address;
                var city, state, country;
                console.log(results[0]);
                results[0].address_components.forEach(function (result) {
                    if (result.types[0] == "locality") {
                        city = result.long_name;
                    }
                    if (result.types[0] == "administrative_area_level_1") {
                        state = result.short_name;
                    }
                    if (result.types[0] == "country") {
                        country = result.long_name;
                    }
                });
                var location = city + ', ' + state + ', ' + country;
                var user_selected_latlng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
                self.selectedMapCenter.address = location;
                self.selectedMapCenter.location = results[0].geometry.location;
                self.storage.set('user_short_location', location);
                self.storage.set('user_long_location', address);
                self.storage.set('user_selected_latlng', user_selected_latlng);
                self.map.setCenter(results[0].geometry.location);
                __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(location);
            }
        });
    };
    UserFindDealsMapPage.prototype.searchBusinessDeals = function () {
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
            var comma = __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val().split(",").length - 1;
            if (comma !== 2) {
                this.selectFirstResult();
                this.searchApi();
            }
            else {
                this.searchApi();
            }
        }
    };
    UserFindDealsMapPage.prototype.searchApi = function () {
        var _this = this;
        var spinner = '<i class="fa fa-spinner fa-spin"></i>';
        __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-search-deals').prop('disabled', true);
        // $('.fa.fa-search').hide();
        // $(spinner).appendTo('.search-banner .form-inline .btn-search-deals');
        var loader = '<div id="mapLoader"><div class="icon-holder"><i class="fa fa-spinner fa-spin"></i></div></div>';
        __WEBPACK_IMPORTED_MODULE_10_jquery__(loader).appendTo('#mapView');
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#mapView div').first().css('opacity', 0.3);
        __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-location2').val(this.selectedMapCenter.address);
        var user_input = __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-name2').val();
        var businessApi;
        if (user_input !== '') {
            businessApi = this.api.Business.business_deals_search(user_input);
            console.log(user_input);
        }
        else {
            console.log('empty deal name');
            businessApi = this.api.Business.business_deals_list();
        }
        businessApi.then(function (business) {
            _this.searched_business_deals = business;
            var businessHolder = business;
            businessHolder.forEach(function (bus) {
                _this.mapResults.push(bus._source);
            });
            _this.createMarker(_this.mapResults);
            console.log(_this.mapResults);
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.btn-search-deals').prop('disabled', false);
            // $('.fa.fa-search').show();
            // $('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#mapLoader').remove();
            __WEBPACK_IMPORTED_MODULE_10_jquery__('#mapView div:first-of-type').css('opacity', 1);
        });
    };
    UserFindDealsMapPage.prototype.getBusiness = function (business) {
        var _this = this;
        this.api.Business.business_view(business.u_id).then(function (business) {
            console.log(business);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
                animate: true,
                direction: 'forward',
                animation: 'md-transition'
            });
        });
    };
    UserFindDealsMapPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFindDealsMapPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsMapPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFindDealsMapPage.prototype.showCategoryMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsMapPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserFindDealsMapPage.prototype.goListView = function () {
        this.search.input = __WEBPACK_IMPORTED_MODULE_10_jquery__('#deal-name2').val();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */], {
            'business_deals': this.business_deals,
            'searched_business_deals': this.searched_business_deals,
            'search_input': this.search.input
        }, {
            animate: true,
<<<<<<< HEAD
            direction: 'forward',
=======
            direction: 'back',
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
            animation: 'md-transition'
        });
    };
    return UserFindDealsMapPage;
}());
UserFindDealsMapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-find-deals-map',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Find Deals</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" id="deal-name2" placeholder="Search GoPage Deals">\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" id="deal-location2" placeholder="Los Angeles, CA">\n\n        <div class="locations-holder">\n\n          <div class="location-holder" id="getLocation">\n\n            <ul>\n\n              <li class="location"><a><i class="fa fa-compass" aria-hidden="true"></i>Current Location</a></li>\n\n            </ul>\n\n          </div>\n\n        </div>\n\n      </label>\n\n      <div class="alert-holder"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please specify your location.</div>\n\n      <button class="btn-search-deals" type="submit" id="searchBtn2" (click)="searchBusinessDeals()">\n\n        <i class="fa fa-search"></i>\n\n      </button>\n\n    </form>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goListView()"><i class="fa fa-list"></i> Back to list</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div #mapView id="mapView">\n\n\n\n  </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals-map\page-user-find-deals-map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], UserFindDealsMapPage);

//# sourceMappingURL=page-user-find-deals-map.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(778);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pagination__["a"]; });

//# sourceMappingURL=index.pagination.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(23);
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
            direction: 'back',
            animation: 'md-transition'
        });
    };
    SettingsPage.prototype.logOut = function () {
        var _this = this;
        this.storage.clear();
        this.storage.get('user').then(function (user) {
            if (user == null) {
                console.log('Storage data successfully cleared! You have been logout.');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
                    animate: true,
                    direction: 'back'
                });
            }
            else {
                console.log('Storage data has not been cleared! Something went wrong.');
            }
        }).catch(function (err) {
            console.log('Oops! Something went wrong.');
            console.log('Error: ' + err);
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-settings\page-settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Settings</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="container settings-menu">\n\n    <a (click)="ComingSoon()">Notif<span></span>ication</a>\n\n    <hr class="divider" />\n\n    <a class="logout" (click)="logOut()">Logout</a>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-settings\page-settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], SettingsPage);

//# sourceMappingURL=page-settings.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(82);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], SignupSuccessPage);

//# sourceMappingURL=page-signup-success.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupMobileSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_email_page_signup_email__ = __webpack_require__(82);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], SignupMobileSuccessPage);

//# sourceMappingURL=page-signup-mobile-success.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(171);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], ResetPassSuccessPage);

//# sourceMappingURL=page-reset-pass-success.js.map

/***/ }),

/***/ 434:
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], ItemDetailsPage);

//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(444);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_slider_page_slider__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_settings_page_settings__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_page_signup__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_email_page_signup_email__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_mobile_page_signup_mobile__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_success_page_signup_success__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_signup_mobile_success_page_signup_mobile_success__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_category_menu_page_category_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_item_details_item_details__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_page_user_favorites_page_user_favorites__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_page_user_deals_page_user_deals__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_list_list__ = __webpack_require__(781);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__directives_pagination_index_pagination__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_status_bar__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_screen_orientation__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_geolocation__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ngx_qrcode2__ = __webpack_require__(782);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_barcode_scanner__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_page_user_chat_page_user_chat__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_elasticTextarea__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_chatBubble__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__directives__ = __webpack_require__(806);
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
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_44__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_45__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_46__directives__["a" /* KeyboardAttachDirective */],
            __WEBPACK_IMPORTED_MODULE_42__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals.module#UserLoyaltyCardDealsPageModule', name: 'UserLoyaltyCardDealsPage', segment: 'page-user-loyalty-card-deals', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_41__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_38_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_signup_email_page_signup_email__["a" /* SignupEmailPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_signup_mobile_success_page_signup_mobile_success__["a" /* SignupMobileSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_page_user_loyalty_cards_page_user_loyalty_cards__["a" /* UserLoyaltyCardsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_page_user_favorites_page_user_favorites__["a" /* UserFavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_page_user_find_deals_page_user_find_deals__["a" /* UserFindDealsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_page_user_loyalty_stamp_card_page_user_loyalty_stamp_card__["a" /* UserLoyaltyStampCardPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_loyalty_card_deals_page_user_loyalty_card_deals__["a" /* UserLoyaltyCardDealsPage */],
            __WEBPACK_IMPORTED_MODULE_44__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_45__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_42__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_40__service_api_service_component__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_43__providers__["d" /* Sql */],
            __WEBPACK_IMPORTED_MODULE_43__providers__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_43__providers__["c" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_43__providers__["e" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_33__directives_pagination_index_pagination__["a" /* PaginationService */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_geolocation__["a" /* Geolocation */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_loyalty_cards_page_user_loyalty_cards__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_find_deals_page_user_find_deals__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_favorites_page_user_favorites__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_inbox_page_user_inbox__ = __webpack_require__(79);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], MenuPage);

//# sourceMappingURL=page-menu.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    baseUrl: 'https://gopage-api.herokuapp.com/',
    // baseUrl : 'http://localhost:5015/',
    // ChatBaseUrl : 'http://localhost:3001/',
    ChatBaseUrl: 'https://chat-gopage-server-api.herokuapp.com/',
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_inbox_page_user_inbox__ = __webpack_require__(79);
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
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserMembershipCardPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserMembershipCardPage.prototype.viewInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserMembershipCardPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
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
        selector: 'page-user-membership-card',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Membership Card</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="holder-qrcode" *ngIf="hasData" >\n\n    <p class="member-name">{{user.first_name}}</p>\n\n    <ion-card *ngIf="createdCode">\n\n    <ngx-qrcode [qrc-value]="createdCode"></ngx-qrcode>\n\n    </ion-card>\n\n    <p class="qrcode-id">{{user.membership_number}}</p>\n\n  </div>\n\n</ion-content>\n\n\n\n<!-- <button ion-button full icon-left (click)="createCode()"><ion-icon name="barcode"></ion-icon>Create Code</button> -->\n\n  <!-- <button ion-button full icon-left (click)="scanCode()" color="secondary"><ion-icon name="qr-scanner"></ion-icon>Scan Code</button> -->\n\n <!--  <ion-item>\n\n\n\n    <ion-input type="text" placeholder="MY QR Code data" [(ngModel)]="qrData">\n\n    </ion-input>\n\n  </ion-item>\n\n -->\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-membership-card\page-user-membership-card.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_deals_page_user_deals__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_user_find_deals_map_page_user_find_deals_map__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_user_favorites_page_user_favorites__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_pagination_index_pagination__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_fastclick__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_fastclick__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















<<<<<<< HEAD
=======
__WEBPACK_IMPORTED_MODULE_15_fastclick__["attach"](document.body);
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
var UserFindDealsPage = (function () {
    function UserFindDealsPage(navCtrl, navParams, platform, api, storage, geolocation, paginationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.api = api;
        this.storage = storage;
        this.geolocation = geolocation;
        this.paginationService = paginationService;
        //default location
        this.default_lat = 34.0522;
        this.default_lng = -118.24369999999999;
        this.user_lat_lng = {};
        this.markers = [];
        this.selectedMapCenter = {
            address: '', location: ''
        };
        this.hasData = false;
        this.slice = 5;
        this.showPagination = true;
        //search
        this.search = {
            input: '',
            location: ''
        };
        // this.storage.get('all_business_deals').then(all_business_deals => {
        //   if(all_business_deals === null) {
        //     this.setBusinessDealsStorage();
        //   } else {
        //     return false;
        //   }
        // });
        __WEBPACK_IMPORTED_MODULE_12_jquery__(function () {
            __WEBPACK_IMPORTED_MODULE_15_fastclick__["attach"](document.body);
        });
<<<<<<< HEAD
        __WEBPACK_IMPORTED_MODULE_12_jquery__(document).on({
            'DOMNodeInserted': function () {
                __WEBPACK_IMPORTED_MODULE_12_jquery__('.pac-container .pac-item, .pac-item span', this).addClass('needsclick');
            }
        });
=======
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
    }
    UserFindDealsPage.prototype.ionViewWillEnter = function () {
        // $('.categories-header').hide();
        this.getUser();
        var self = this;
        this.setMapDataStorage();
        // this.dataDisplay();
        //jQuery Get current location
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').on('click', function () {
            // $(this).select();
            __WEBPACK_IMPORTED_MODULE_12_jquery__(this).get(0).setSelectionRange(0, 9999);
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.pac-container').attr('data-tap-disabled', true);
            // $('.pac-item').attr('data-tap-disabled', true);
            // $('.locations-holder').css('visibility', 'visible');
        });
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').contextmenu(function () {
            return false;
        });
        //location input tweak for ios
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').on('keypress', function () {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.scroll-content').animate({ scrollTop: 1 }, 'fast');
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_12_jquery__('.scroll-content').animate({ scrollTop: 0 }, 'fast');
            }, 50);
        });
        // $('.locations-holder').on('mousedown', function() {
        //   self.getLocation();
        // });
        //Set value catergory title display
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#selected-category').text('All Deals');
    };
    UserFindDealsPage.prototype.ionViewDidLoad = function () {
        var self = this;
        setTimeout(function () {
            self.initMap();
            self.dataDisplay();
            console.log('map initializing');
        }, 650);
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location2').val('Los Angeles, CA');
        if (__WEBPACK_IMPORTED_MODULE_12_jquery__('.hasdeal-holder').is(':empty')) {
            __WEBPACK_IMPORTED_MODULE_12_jquery__(".hasdeal-holder").css("display", "none");
        }
    };
    UserFindDealsPage.prototype.setMapDataStorage = function () {
        var _this = this;
        this.storage.get('user_short_location').then(function (user_short_location) {
            // console.log(user_short_location)
            _this.selectedMapCenter.address = user_short_location;
            // $('#deal-location').val(user_short_location);
            _this.storage.get('user_selected_latlng').then(function (user_selected_latlng) {
                // console.log(user_selected_latlng)
                _this.selectedMapCenter.location = user_selected_latlng;
            });
        });
    };
    UserFindDealsPage.prototype.dataDisplay = function () {
        var _this = this;
        this.storage.get('user_short_location').then(function (user_short_location) {
            _this.selectedMapCenter.address = user_short_location;
            _this.storage.get('user_selected_latlng').then(function (user_selected_latlng) {
                _this.selectedMapCenter.location = user_selected_latlng;
                if (_this.selectedMapCenter.address !== null) {
                    _this.default_location = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
                    _this.map.setCenter(_this.default_location);
                    __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(user_short_location);
                    // console.log(this.selectedMapCenter.address, this.selectedMapCenter.location)
                    //business deals data from map view
                    var searched_business_deals = _this.navParams.get('searched_business_deals');
                    if (searched_business_deals !== undefined) {
                        console.log('searched deals from map');
                        // console.log(searched_business_deals);
                        var search_input = _this.navParams.get('search_input');
                        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-name').val(search_input);
                        var filtered_searched_business_deals = _this.getDealsWithinBound(searched_business_deals);
                        if (filtered_searched_business_deals.length > 0) {
                            _this.business_deals = [];
                            _this.sortData(filtered_searched_business_deals);
                        }
                        else {
                            console.log('empty searched');
                            _this.business_deals = [];
                        }
                    }
                    else {
                        _this.getFilteredDealsAndFavorites();
                        var business_deals = _this.navParams.get('business_deals');
<<<<<<< HEAD
                        if (business_deals !== undefined) {
                            console.log('deals from find deals to map to find deals');
=======
                        console.log(business_deals);
                        if (business_deals !== undefined) {
                            console.log('deals from find deals to map to find deals');
                            console.log(business_deals);
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
                            _this.business_deals = business_deals;
                            _this.hasData = true;
                        }
                        else {
<<<<<<< HEAD
=======
                            // this.storage.get('user_short_location').then(user_short_location => {
                            //   if (user_short_location !== null) {
                            //     console.log('user_short_location')
                            //     this.searchBusinessDeals();
                            //   } else {
                            //     console.log('all data')
                            //     this.getBusinessDeals();
                            //   }
                            // });
                            // console.log('data from non filtered')
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
                            _this.getFilteredDealsAndFavorites();
                            if (_this.business_deals === undefined) {
                                _this.storage.get('user_short_location').then(function (user_short_location) {
                                    if (user_short_location !== null) {
                                        _this.searchBusinessDeals();
                                    }
                                    else {
                                        _this.getBusinessDeals();
                                    }
                                });
                                console.log('data from non filtered');
                            }
                            else {
                                _this.getFilteredDealsAndFavorites();
                                console.log('data from filtered');
                            }
                        }
                    }
                }
                else {
                    _this.storage.get('user_selected_latlng').then(function (user_selected_latlng) {
                        _this.storage.get('user_short_location').then(function (user_short_location) {
                            // console.log('first enter find deals')
                            if (user_short_location !== null) {
                                _this.default_location = new google.maps.LatLng(user_selected_latlng.lat, user_selected_latlng.lng);
                                _this.map.setCenter(_this.default_location);
                                __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(user_short_location);
                            }
                            else {
                                // console.log('ask permission')
                                _this.getBusinessDeals();
                                _this.getLocation();
                                _this.geocodeLatLng();
                            }
                        });
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            });
        });
    };
    UserFindDealsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_dashboard_page_dashboard__["a" /* DashboardPage */], {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.showCategoryMenu = function () {
        var user_input = __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-name').val();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_menu_page_category_menu_page_category_menu__["a" /* CategoryMenuPage */], { user_input: user_input, business_deals: this.business_deals }, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.showSortMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_menu_page_sort_menu_page_sort_menu__["a" /* SortMenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
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
        if (this.business_deals.length <= this.slice) {
            infiniteScroll.complete();
        }
        else {
            setTimeout(function () {
                _this.slice += 10;
                infiniteScroll.complete();
            }, 500);
        }
    };
    UserFindDealsPage.prototype.sortData = function (data) {
        var _this = this;
        var filtered_business_deals = [];
        var all_data = [];
        data = __WEBPACK_IMPORTED_MODULE_12_jquery__["grep"](data, function (val, i) {
            if (val._source.deal_id.length == 0) {
                filtered_business_deals.push(val);
            }
            else {
                return true;
            }
        });
        var sorted_business_deals = data.concat(filtered_business_deals);
        sorted_business_deals.forEach(function (business) {
            business._source.deal_id.forEach(function (deal) {
                var img = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                deal.photo.url = img;
                if (deal.is_featured) {
                    business._source.featured_deal = deal;
                }
            });
            all_data.push(business._source);
        });
        this.api.Favorites.favorite_list(this.user._id).then(function (favorites) {
            _this.favorites = favorites;
            if (_this.hasData) {
                _this.favorites.forEach(function (favorite) {
                    all_data.forEach(function (business) {
                        if (business.u_id === favorite.business_id[0]._id) {
                            business.is_favorite = true;
                        }
                    });
                });
            }
        });
        this.business_deals = all_data;
        this.hasData = true;
    };
    UserFindDealsPage.prototype.getBusinessDeals = function () {
        var _this = this;
        this.getUser();
        this.api.Business.business_deals_list().then(function (deals) {
            _this.business_deals = [];
            var all_business_deals = deals;
            _this.getFavorites();
            _this.sortData(all_business_deals);
            _this.hasData = true;
        }).catch(function (error) {
            console.log(error);
        });
    };
    // setBusinessDealsStorage() {
    //   this.getUser();
    //   this.api.Business.business_deals_list().then(deals => {
    //     var all_data = [];
    //     var all_business_deals = deals.hits.hits;
    //     all_business_deals.forEach(all => {
    //         all_data.push(all._source)
    //     });
    //    //  console.log(all_data);
    //     this.storage.set('all_business_deals', all_data);
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // }
    UserFindDealsPage.prototype.getFavorites = function () {
        var _this = this;
        this.api.Favorites.favorite_list(this.user._id).then(function (favorites) {
            _this.favorites = favorites;
            if (_this.hasData) {
                _this.favorites.forEach(function (favorite) {
                    _this.business_deals.forEach(function (business, i) {
                        if (business.u_id === favorite.business_id[0]._id) {
                            business.is_favorite = true;
                        }
                    });
                });
            }
        });
    };
    UserFindDealsPage.prototype.getFilteredDealsAndFavorites = function () {
        var filtered_business_deals = this.navParams.get('filtered_business_deals');
        var catergory_name = this.navParams.get('business_cat');
        if (filtered_business_deals != null) {
            var data = this.getDealsWithinBound(filtered_business_deals);
            this.sortData(data);
            //Set value catergory title display
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#selected-category').text(catergory_name);
            this.hasData = true;
        }
    };
    UserFindDealsPage.prototype.goMapView = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__page_user_find_deals_map_page_user_find_deals_map__["a" /* UserFindDealsMapPage */], {
            'business_deals': this.business_deals,
            'map_address': this.selectedMapCenter.address,
            'map_center': this.selectedMapCenter.location,
            'search_input': this.search.input
        }, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.addToFavorites = function (business) {
        var selectedButton = document.getElementById('addToFavorite' + business.u_id);
        selectedButton.style.display = "none";
        selectedButton.className += " disabled";
        var deal_id = [];
        var member_full_name = this.user.first_name + " " + this.user.last_name;
        if (business.deal_id.length !== 0) {
            business.deal_id.forEach(function (id) {
                deal_id.push(id);
            });
        }
        else {
            deal_id = [];
        }
        var deal_body = {
            deals_id: deal_id,
            business_id: business.u_id,
            customer_id: this.user._id,
            member_full_name: member_full_name
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
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserFindDealsPage.prototype.getBusiness = function (business) {
        var _this = this;
        this.api.Business.business_view(business.u_id).then(function (business) {
            // console.log(business)
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
                animate: true,
                direction: 'forward',
                animation: 'md-transition'
            });
        });
    };
    UserFindDealsPage.prototype.searchBusinessDeals = function () {
        if (__WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val() === '') {
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').addClass('danger');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.alert-holder').fadeIn();
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').removeClass('danger');
                __WEBPACK_IMPORTED_MODULE_12_jquery__('.alert-holder').fadeOut();
            }, 3000);
        }
        else {
            var comma = __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val().split(",").length - 1;
            if (comma !== 2) {
                this.selectFirstResult();
                this.searchApi();
                this.hasData = true;
            }
            else {
                this.searchApi();
                this.hasData = true;
            }
        }
    };
    UserFindDealsPage.prototype.searchApi = function () {
        var _this = this;
        var btn_spinner = '<i class="fa fa-spinner fa-spin"></i>';
        var main_spinner = '<div class="loader-holder">Loading &nbsp; <i class="fa fa-spinner fa-spin"></i></div>';
        __WEBPACK_IMPORTED_MODULE_12_jquery__('.fa.fa-search').hide();
        __WEBPACK_IMPORTED_MODULE_12_jquery__('.btn-search-deals').attr('disabled', true);
        __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').attr('disabled', true);
        __WEBPACK_IMPORTED_MODULE_12_jquery__(btn_spinner).appendTo('.search-banner .form-inline .btn-search-deals');
        __WEBPACK_IMPORTED_MODULE_12_jquery__(main_spinner).appendTo('.scroll-content .categories-main');
        var businessApi;
        if (this.search.input !== '') {
            businessApi = this.api.Business.business_deals_search(this.search.input);
        }
        else {
            businessApi = this.api.Business.business_deals_list();
        }
        businessApi.then(function (results) {
            var result = results;
            var filtered_deals = _this.getDealsWithinBound(result);
            if (filtered_deals.length !== 0) {
                _this.business_deals = [];
                _this.sortData(filtered_deals);
            }
            else {
                // this.business_deals.splice(0, 0);
                _this.business_deals = [];
                // this.hasData = false;
            }
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.btn-search-deals').removeAttr('disabled');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').removeAttr('disabled');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.fa.fa-search').show();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.categories-header').show();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.scroll-content .categories-main .loader-holder').remove();
        }).catch(function (error) {
            _this.api.Business.catch(error).then(function (res) {
                alert(res.json());
            });
            _this.hasData = false;
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.btn-search-deals').removeAttr('disabled');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').removeAttr('disabled');
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.fa.fa-search').show();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.categories-header').show();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.search-banner .form-inline .btn-search-deals .fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_12_jquery__('.scroll-content .categories-main .loader-holder').remove();
            console.log(error);
        });
    };
    UserFindDealsPage.prototype.initMap = function () {
        var self = this;
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
        // var searchBox = new google.maps.places.SearchBox(deal);
        autocomplete.bindTo('bounds', self.map);
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            // need to stop prop of the touchend event
            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                setTimeout(function () {
                    var container = document.getElementsByClassName('pac-container')[0];
                    console.log(container);
                    container.addEventListener('touchstart', function (e) {
                        e.stopImmediatePropagation();
                        setTimeout(function () {
                        }, 300);
                    });
                }, 500);
            }
            var place = autocomplete.getPlace();
            var city, state, country;
            place.address_components.forEach(function (result) {
                if (result.types[0] == "locality") {
                    city = result.long_name;
                }
                if (result.types[0] == "administrative_area_level_1") {
                    state = result.short_name;
                }
                if (result.types[0] == "country") {
                    country = result.long_name;
                }
            });
            var location = city + ', ' + state + ', ' + country;
            self.selectedMapCenter.address = location;
            self.selectedMapCenter.location = place.geometry.location;
            var selected_lat = place.geometry.location.lat();
            var selected_lng = place.geometry.location.lng();
            var user_selected_latlng = { lat: selected_lat, lng: selected_lng };
            this.new_latlng = user_selected_latlng;
            self.storage.set('user_selected_latlng', user_selected_latlng);
            self.storage.set('user_short_location', location);
            self.storage.set('user_long_location', place.formatted_address);
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(location);
            __WEBPACK_IMPORTED_MODULE_12_jquery__("#searchBtn").click();
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
            var position = new google.maps.LatLng(d._source.lat, d._source.lng);
            var inBounds = _this.map.getBounds().contains(position);
            if (inBounds == true) {
                filtered_data.push(d);
            }
            else {
                // console.log('out of bounds')
            }
        });
        return filtered_data;
    };
    UserFindDealsPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            var position = { lat: lat, lng: lng };
            _this.user_lat_lng = position;
            _this.storage.set('user_selected_latlng', position);
            _this.geocodeLatLng();
        }).catch(function (error) {
            var lat = _this.default_lat;
            var lng = _this.default_lng;
            var position = { lat: lat, lng: lng };
            _this.storage.set('user_selected_latlng', position);
            _this.default_location = new google.maps.LatLng(34.0522, -118.2437);
            __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val('Los Angeles, CA');
            // console.log('Error getting location', error);
        });
    };
    UserFindDealsPage.prototype.geocodeLatLng = function () {
        var self = this;
        this.geocoder.geocode({ 'location': this.user_lat_lng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var address = results[0].formatted_address;
                    var city, state, country;
                    results[0].address_components.forEach(function (result) {
                        if (result.types[0] == "locality") {
                            city = result.long_name;
                        }
                        if (result.types[0] == "administrative_area_level_2") {
                            state = result.short_name;
                        }
                        if (result.types[0] == "country") {
                            country = result.long_name;
                        }
                    });
                    var location = city + ', ' + state + ', ' + country;
                    self.selectedMapCenter.address = location;
                    __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(location);
                    self.storage.set('user_short_location', location);
                    self.storage.set('user_long_location', address);
                }
                else {
                    // window.alert('No results found');
                }
                // self.searchBusinessDeals();
            }
            else {
                // window.alert('Geocoder failed due to: ' + status);
            }
        });
    };
    UserFindDealsPage.prototype.selectFirstResult = function () {
        var self = this;
        var firstResult = __WEBPACK_IMPORTED_MODULE_12_jquery__(".pac-container .pac-item:first").text();
        this.geocoder.geocode({ "address": firstResult }, function (results, status) {
            if (status === 'OK') {
                var address = results[0].formatted_address;
                var city, state, country;
                results[0].address_components.forEach(function (result) {
                    if (result.types[0] == "locality") {
                        city = result.long_name;
                    }
                    if (result.types[0] == "administrative_area_level_1") {
                        state = result.short_name;
                    }
                    if (result.types[0] == "country") {
                        country = result.long_name;
                    }
                });
                var location = city + ', ' + state + ', ' + country;
                var user_selected_latlng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
                self.selectedMapCenter.address = location;
                self.selectedMapCenter.location = results[0].geometry.location;
                // console.log(location)
                // console.log(user_selected_latlng)
                self.storage.set('user_short_location', location);
                self.storage.set('user_long_location', address);
                self.storage.set('user_selected_latlng', user_selected_latlng);
                self.map.setCenter(results[0].geometry.location);
                __WEBPACK_IMPORTED_MODULE_12_jquery__('#deal-location').val(location);
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
        selector: 'page-user-find-deals',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Find Deals</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="jumbotron search-banner">\n\n    <form class="form-inline form-search-deals text-center">\n\n      <input type="text" class="form-control" id="deal-name" placeholder="Search GoPage Deals" name="input" [(ngModel)]="search.input">\n\n      <!-- <input type="text" class="form-control" id="deal-name2" style="visibility: hidden; position: absolute;"> -->\n\n      <label>\n\n        <span class="fa fa-map-marker"></span>\n\n        <input type="text" class="form-control" id="deal-location" placeholder="Los Angeles, CA" name="location" [(ngModel)]="search.location">\n\n        <div class="locations-holder">\n\n          <div class="location-holder" id="getLocation">\n\n            <ul>\n\n              <li class="location"><a><i class="fa fa-compass" aria-hidden="true"></i>Current Location</a></li>\n\n            </ul>\n\n          </div>\n\n        </div>\n\n      </label>\n\n      <div class="alert-holder"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please specify your location.</div>\n\n      <button class="btn-search-deals" type="submit" id="searchBtn" (click)="searchBusinessDeals()">\n\n        <i class="fa fa-search"></i>\n\n      </button>\n\n    </form>\n\n  </div>\n\n\n\n  <nav id="filter-sort-map" class="navbar navbar-light">\n\n    <ul class="nav nav-tabs">\n\n      <li class="nav-item">\n\n        <a class="nav-link filter-categories" (click)="showCategoryMenu()"><i class="fa fa-filter"></i> Categories</a>\n\n      </li>\n\n      <!-- <li class="nav-item">\n\n        <a class="nav-link filter-sort" (click)="showSortMenu()"><i class="fa fa-sort"></i> Sort</a>\n\n      </li> -->\n\n      <li class="nav-item">\n\n        <a class="nav-link" (click)="goMapView()"><i class="fa fa-map-marker"></i> Map view</a>\n\n      </li>\n\n    </ul>\n\n  </nav>\n\n\n\n  <div class="categories-header">\n\n    <div class="row">\n\n      <div class="col">\n\n        <p class="deals-category">\n\n          <span id="selected-category"></span>\n\n        </p>\n\n        <ion-item>\n\n          <ion-label> Show Image</ion-label>\n\n          <ion-toggle [(ngModel)]="toggleImage"></ion-toggle>\n\n        </ion-item>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="categories-main">\n\n    <div class="map-view" id="mapView"></div>\n\n    <div class="row">\n\n      <div class="col holder-categories-result1">\n\n        <div class="row">\n\n          <div class="col categories-result" *ngIf="hasData">\n\n\n\n            <div *ngIf="business_deals?.length === 0; then noData else hasData"></div>\n\n            <ng-template #noData>\n\n              <div class="no-data-holder">\n\n                <img src="https://cdn.filestackcontent.com/DFT7nNCRSLlF5uUkZAKk">\n\n              </div>\n\n            </ng-template>\n\n            <ng-template #hasData>\n\n              <div class="deal media {{toggleImage ? \'toggled\' : \'\'}}" *ngFor="let business of business_deals | slice:0:slice; let i = index">\n\n                <span *ngIf="business.deal_id.length !== 0; then hasDeal else noDeal "></span>\n\n\n\n                <!-- has deal -->\n\n                <ng-template #hasDeal>\n\n                  <div class="hasdeal-template">\n\n                    <div *ngIf="business.featured_deal !== undefined; then hasFeatured else noFeatured"></div>\n\n\n                    <ng-template #hasFeatured>\n\n                      <div class="col-xs-8" tappable (click)="getBusiness(business)">\n\n                        <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                          <img class="d-flex mr-3" src="{{business.featured_deal.photo.url !== unknown ? business.featured_deal.photo.url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.featured_deal.template}}">\n\n                        </a>\n\n                        <div class="media-body align-self-center">\n\n                          <a class="business-link">{{business.company_name}}</a>\n\n                          <p class="business-address">{{business.country}}, {{business.state}}</p>\n\n                          <a class="deal-title">\n\n                            <h6 class="mt-0"><i class="fa fa-tag"></i> {{business.featured_deal.template}}</h6>\n\n                          </a>\n\n                          <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{business.featured_deal.end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                        </div>\n\n\n\n                      </div>\n\n                    </ng-template>\n\n\n                    <ng-template #noFeatured>\n\n                      <div class="col-xs-8" tappable (click)="getBusiness(business)">\n\n                        <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                          <img class="d-flex mr-3" src="{{business.deal_id[0].photo.url !== unknown ? business.deal_id[0].photo.url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.deal_id[0].template}}">\n\n                        </a>\n\n                        <div class="media-body align-self-center">\n\n                          <a class="business-link">{{business.company_name}}</a>\n\n                          <p class="business-address">{{business.country}}, {{business.state}}</p>\n\n                          <a class="deal-title">\n\n                            <h6 class="mt-0"><i class="fa fa-tag"></i> {{business.deal_id[0].template}}</h6>\n\n                          </a>\n\n                          <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{business.deal_id[0].end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                        </div>\n\n\n\n                      </div>\n\n                    </ng-template>\n\n\n                    <!-- <div class="col-xs-8" tappable (click)="getBusiness(business)">\n\n                      <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                        <img class="d-flex mr-3" src="{{business.deal_id[0].photo.url !== unknown ? business.deal_id[0].photo.url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.deal_id[0].template}}">\n\n                      </a>\n\n                      <div class="media-body align-self-center">\n\n                        <a class="business-link">{{business.company_name}}</a>\n\n                        <p class="business-address">{{business.country}}, {{business.state}}</p>\n\n                        <a class="deal-title">\n\n                          <h6 class="mt-0"><i class="fa fa-tag"></i> {{business.deal_id[0].template}}</h6>\n\n                        </a>\n\n                        <p class="expiration-date"><i class="fa fa-clock-o fa-lg"></i> Expires {{business.deal_id[0].end_date | date: \'MM/dd/yyyy\'}}</p>\n\n                      </div>\n\n\n\n                    </div> -->\n\n\n\n                    <div class="col-xs-4">\n\n                      <div class="deals-button">\n\n                        <div *ngIf="business.is_favorite; then Favorite  else  notFavorite"></div>\n\n                        <ng-template #notFavorite>\n\n                          <div class="claim-btn-holder">\n\n                            <a class="btn btn-claim" [attr.id]="\'addToFavorite\'+business.u_id" id="addToFavorite" tappable (click)="addToFavorites(business)">Add to Favorites <i class="fa fa-chevron-right"></i></a>\n\n                            <a class="btn btn-claimed" id="addedToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n                          </div>\n\n                        </ng-template>\n\n                        <ng-template #Favorite><a class="btn btn-claim disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a></ng-template>\n\n                        <a class="btn btn-more" tappable (click)="getBusiness(business)" >More Details <i class="fa fa-chevron-right"></i></a>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </ng-template>\n\n\n\n                <!-- no deal -->\n\n                <ng-template #noDeal>\n\n                  <div class="col-xs-8">\n\n                    <a class="deal-thumbnail" *ngIf="toggleImage">\n\n                      <img class="d-flex mr-3" src="{{business.files.length !== 0 ? business.files[0].url : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\'}}" alt="{{business.company_name}}">\n\n                    </a>\n\n                    <div class="media-body align-self-center">\n\n                      <a class="business-link">{{business.company_name}}</a>\n\n                      <p class="business-address">{{business.address}}</p>\n\n                    </div>\n\n                  </div>\n\n\n\n                  <div class="col-xs-4">\n\n                    <div class="deals-button">\n\n                      <div *ngIf="business.is_favorite; then Favorite  else  notFavorite"></div>\n\n                      <ng-template #notFavorite>\n\n                        <div class="claim-btn-holder">\n\n                          <a class="btn btn-claim" [attr.id]="\'addToFavorite\'+business.u_id" id="addToFavorite" tappable (click)="addToFavorites(business)">Add to Favorites <i class="fa fa-chevron-right"></i></a>\n\n                          <a class="btn btn-claimed" id="addedToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a>\n\n                        </div>\n\n                      </ng-template>\n\n                      <ng-template #Favorite><a class="btn btn-claim disabled" id="addToFavorite" tappable (click)="goToFavorites()">Added to Favorites</a></ng-template>\n\n                      <a class="btn btn-more" tappable (click)="getBusiness(business)" >More Details <i class="fa fa-chevron-right"></i></a>\n\n                    </div>\n\n                  </div>\n\n                </ng-template>\n\n              </div>\n\n            </ng-template>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n  <!-- <div class="row" *ngIf="showPagination">\n\n    <nav class="col-12 holder-pagination">\n\n      <ul class="pagination list-unstyled" *ngIf="pager.pages && pager.pages.length">\n\n        <li class="page-item prev-page">\n\n          <button class="page-link prev-page" [ngClass]="{disabled:pager.currentPage === 1}" (click)="setPagination(pager.currentPage - 1)" ion-button small><i class="fa fa-angle-left"></i>&nbsp;<span class="prev">Prev</span></button>\n\n        </li>\n\n        <li class="page-item" *ngFor="let page of pager.pages">\n\n          <button class="page-link" [ngClass]="{active:pager.currentPage === page}" (click)="setPagination(page)" ion-button small>\n\n            {{page}}\n\n          </button>\n\n        </li>\n\n        <li class="page-item">\n\n          <button class="page-link next-page" [ngClass]="{disabled:pager.currentPage === pager.totalPages}" (click)="setPagination(pager.currentPage + 1)" ion-button small><span class="next">Next</span>&nbsp;<i class="fa fa-angle-right"></i></button>\n\n        </li>\n\n      </ul>\n\n    </nav>\n\n  </div> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-find-deals\page-user-find-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_14__directives_pagination_index_pagination__["a" /* PaginationService */]])
], UserFindDealsPage);

//# sourceMappingURL=page-user-find-deals.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_database_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_sql__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_socket_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_jquery__);
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
    function MyApp(platform, menu, statusBar, splashScreen, screenOrientation, keyboard, storage) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.screenOrientation = screenOrientation;
        this.keyboard = keyboard;
        this.storage = storage;
        platform.ready().then(function () {
            if (__WEBPACK_IMPORTED_MODULE_12_jquery__(window).width() <= 768) {
                _this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT).catch(function (err) {
                    console.log(err);
                });
            }
        });
        this.splashScreen.show();
        this.initializeApp();
        this.storage.get("user").then(function (user) {
            if (user !== null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__["a" /* SliderPage */];
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            setTimeout(function () {
                _this.splashScreen.hide();
            }, 3000);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\client-app\src\app\app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n\n\n\n<!-- <ion-menu [content]="nav">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Pages</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu> -->\n\n'/*ion-inline-end:"E:\Projects\client-app\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_9__providers_database_service__["a" /* DatabaseService */], __WEBPACK_IMPORTED_MODULE_10__providers_sql__["a" /* Sql */], __WEBPACK_IMPORTED_MODULE_11__providers_socket_service__["a" /* SocketService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 755:
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

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 297,
	"./af.js": 297,
	"./ar": 298,
	"./ar-dz": 299,
	"./ar-dz.js": 299,
	"./ar-kw": 300,
	"./ar-kw.js": 300,
	"./ar-ly": 301,
	"./ar-ly.js": 301,
	"./ar-ma": 302,
	"./ar-ma.js": 302,
	"./ar-sa": 303,
	"./ar-sa.js": 303,
	"./ar-tn": 304,
	"./ar-tn.js": 304,
	"./ar.js": 298,
	"./az": 305,
	"./az.js": 305,
	"./be": 306,
	"./be.js": 306,
	"./bg": 307,
	"./bg.js": 307,
	"./bn": 308,
	"./bn.js": 308,
	"./bo": 309,
	"./bo.js": 309,
	"./br": 310,
	"./br.js": 310,
	"./bs": 311,
	"./bs.js": 311,
	"./ca": 312,
	"./ca.js": 312,
	"./cs": 313,
	"./cs.js": 313,
	"./cv": 314,
	"./cv.js": 314,
	"./cy": 315,
	"./cy.js": 315,
	"./da": 316,
	"./da.js": 316,
	"./de": 317,
	"./de-at": 318,
	"./de-at.js": 318,
	"./de-ch": 319,
	"./de-ch.js": 319,
	"./de.js": 317,
	"./dv": 320,
	"./dv.js": 320,
	"./el": 321,
	"./el.js": 321,
	"./en-au": 322,
	"./en-au.js": 322,
	"./en-ca": 323,
	"./en-ca.js": 323,
	"./en-gb": 324,
	"./en-gb.js": 324,
	"./en-ie": 325,
	"./en-ie.js": 325,
	"./en-nz": 326,
	"./en-nz.js": 326,
	"./eo": 327,
	"./eo.js": 327,
	"./es": 328,
	"./es-do": 329,
	"./es-do.js": 329,
	"./es.js": 328,
	"./et": 330,
	"./et.js": 330,
	"./eu": 331,
	"./eu.js": 331,
	"./fa": 332,
	"./fa.js": 332,
	"./fi": 333,
	"./fi.js": 333,
	"./fo": 334,
	"./fo.js": 334,
	"./fr": 335,
	"./fr-ca": 336,
	"./fr-ca.js": 336,
	"./fr-ch": 337,
	"./fr-ch.js": 337,
	"./fr.js": 335,
	"./fy": 338,
	"./fy.js": 338,
	"./gd": 339,
	"./gd.js": 339,
	"./gl": 340,
	"./gl.js": 340,
	"./gom-latn": 341,
	"./gom-latn.js": 341,
	"./he": 342,
	"./he.js": 342,
	"./hi": 343,
	"./hi.js": 343,
	"./hr": 344,
	"./hr.js": 344,
	"./hu": 345,
	"./hu.js": 345,
	"./hy-am": 346,
	"./hy-am.js": 346,
	"./id": 347,
	"./id.js": 347,
	"./is": 348,
	"./is.js": 348,
	"./it": 349,
	"./it.js": 349,
	"./ja": 350,
	"./ja.js": 350,
	"./jv": 351,
	"./jv.js": 351,
	"./ka": 352,
	"./ka.js": 352,
	"./kk": 353,
	"./kk.js": 353,
	"./km": 354,
	"./km.js": 354,
	"./kn": 355,
	"./kn.js": 355,
	"./ko": 356,
	"./ko.js": 356,
	"./ky": 357,
	"./ky.js": 357,
	"./lb": 358,
	"./lb.js": 358,
	"./lo": 359,
	"./lo.js": 359,
	"./lt": 360,
	"./lt.js": 360,
	"./lv": 361,
	"./lv.js": 361,
	"./me": 362,
	"./me.js": 362,
	"./mi": 363,
	"./mi.js": 363,
	"./mk": 364,
	"./mk.js": 364,
	"./ml": 365,
	"./ml.js": 365,
	"./mr": 366,
	"./mr.js": 366,
	"./ms": 367,
	"./ms-my": 368,
	"./ms-my.js": 368,
	"./ms.js": 367,
	"./my": 369,
	"./my.js": 369,
	"./nb": 370,
	"./nb.js": 370,
	"./ne": 371,
	"./ne.js": 371,
	"./nl": 372,
	"./nl-be": 373,
	"./nl-be.js": 373,
	"./nl.js": 372,
	"./nn": 374,
	"./nn.js": 374,
	"./pa-in": 375,
	"./pa-in.js": 375,
	"./pl": 376,
	"./pl.js": 376,
	"./pt": 377,
	"./pt-br": 378,
	"./pt-br.js": 378,
	"./pt.js": 377,
	"./ro": 379,
	"./ro.js": 379,
	"./ru": 380,
	"./ru.js": 380,
	"./sd": 381,
	"./sd.js": 381,
	"./se": 382,
	"./se.js": 382,
	"./si": 383,
	"./si.js": 383,
	"./sk": 384,
	"./sk.js": 384,
	"./sl": 385,
	"./sl.js": 385,
	"./sq": 386,
	"./sq.js": 386,
	"./sr": 387,
	"./sr-cyrl": 388,
	"./sr-cyrl.js": 388,
	"./sr.js": 387,
	"./ss": 389,
	"./ss.js": 389,
	"./sv": 390,
	"./sv.js": 390,
	"./sw": 391,
	"./sw.js": 391,
	"./ta": 392,
	"./ta.js": 392,
	"./te": 393,
	"./te.js": 393,
	"./tet": 394,
	"./tet.js": 394,
	"./th": 395,
	"./th.js": 395,
	"./tl-ph": 396,
	"./tl-ph.js": 396,
	"./tlh": 397,
	"./tlh.js": 397,
	"./tr": 398,
	"./tr.js": 398,
	"./tzl": 399,
	"./tzl.js": 399,
	"./tzm": 400,
	"./tzm-latn": 401,
	"./tzm-latn.js": 401,
	"./tzm.js": 400,
	"./uk": 402,
	"./uk.js": 402,
	"./ur": 403,
	"./ur.js": 403,
	"./uz": 404,
	"./uz-latn": 405,
	"./uz-latn.js": 405,
	"./uz.js": 404,
	"./vi": 406,
	"./vi.js": 406,
	"./x-pseudo": 407,
	"./x-pseudo.js": 407,
	"./yo": 408,
	"./yo.js": 408,
	"./zh-cn": 409,
	"./zh-cn.js": 409,
	"./zh-hk": 410,
	"./zh-hk.js": 410,
	"./zh-tw": 411,
	"./zh-tw.js": 411
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
webpackContext.id = 756;

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
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(23);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(25);
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_slider_page_slider__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_user_membership_card_page_user_membership_card__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_signup_email_page_signup_email__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_signup_mobile_page_signup_mobile__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_config__ = __webpack_require__(57);
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
    function SignupPage(navCtrl, http, fb, gp, storage, api, events) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.storage = storage;
        this.api = api;
        this.events = events;
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_slider_page_slider__["a" /* SliderPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupEmail = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__page_signup_email_page_signup_email__["a" /* SignupEmailPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.goSignupMobile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__page_signup_mobile_page_signup_mobile__["a" /* SignupMobilePage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SignupPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_14__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '3' }).subscribe(function (res) {
                    _this.getUser(res.json());
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    // fbConnect() {
    //   var baseUrl = Config.baseUrl;
    //
    //   this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
    //     this.fb.api('me?fields=id,email', []).then(profile => {
    //       this.http.post(baseUrl + 'api/users/login',{email: profile['email'], is_social: '1', number: ' ', account_type: '1', status: '1', permission: '3'}).subscribe(res => {
    //         this.navCtrl.setRoot(UserMembershipCardPage, {}, {
    //           animate: true,
    //           direction: 'forward'
    //         });
    //       }, err => {
    //         console.log(err);
    //       });
    //     });
    //   }).catch(err => {
    //     console.log('Error logging into Facebook', err)
    //   });
    // }
    SignupPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__page_user_membership_card_page_user_membership_card__["a" /* UserMembershipCardPage */], {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    SignupPage.prototype.getUser = function (token) {
        var _this = this;
        this.api.Users.user(token.user_id).then(function (user) {
            _this.events.publish('user:login', user);
            _this.storage.set('user', user);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-signup\page-signup.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">Sign Up\n\n  </p>\n\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n  <button class="btn btn-green" (click)="goSignupEmail()"><span class="fa fa-envelope-o"></span> Sign Up with Email</button>\n\n  <button class="btn btn-green" (click)="goSignupMobile()"><span class="fa fa-mobile"></span> Sign Up with Mobile number</button>\n\n\n\n  <!-- <form class="form-signup">\n\n    <label>\n\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n\n      <span class="text-validate">First name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n\n      <span class="text-validate">Last name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n\n      <span class="text-validate">Email address is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n\n    </label>\n\n    <input class="btn-green" type="submit" value="Sign Up" (click)="signMeUp()" />\n\n  </form> -->\n\n  <!-- <p class="description">By signing up, you agree to GoPage\'s <br><a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></p> -->\n\n  <hr class="hr" />\n\n  <p class="description">Already have an account? <a href="#" (click)="goLogin()">Log In</a></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-signup\page-signup.html"*/
    }),
<<<<<<< HEAD
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
=======
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _g || Object])
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
], SignupPage);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(779);
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

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(23);
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
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFavoritesPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    UserFavoritesPage.prototype.ionViewWillEnter = function () {
        this.getFavorites();
    };
    UserFavoritesPage.prototype.getFavorites = function () {
        var _this = this;
        this.storage.get("user").then(function (user) {
            _this.api.Favorites.favorite_list(user._id).then(function (favorites) {
                console.log(favorites);
                favorites.forEach(function (fav) {
                    if (fav.business_id[0].files.length != 0) {
                        var img = fav.business_id[0].files[0].url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
                        fav.business_id[0].files[0].url = img;
                    }
                });
                _this.favorites = favorites;
            });
        });
    };
    UserFavoritesPage.prototype.getBusiness = function (business) {
        var _this = this;
        this.api.Business.business_view(business.business_id[0]._id).then(function (business) {
            console.log(business);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business: business }, {
                animate: true,
                direction: 'forward',
                animation: 'md-transition'
            });
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
        selector: 'page-user-favorites',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Favorites</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="favorites-holder">\n\n    <div *ngIf="favorites?.length !== 0; then hasFavorites else noFavorites"></div>\n\n    <ng-template #hasFavorites>\n\n      <div class="favorites media" *ngFor="let favorite of favorites; let i = index">\n\n        <div class="col-xs-8">\n\n          <div class="img-holder" tappable (click)="getBusiness(favorite)">\n\n            <div *ngIf="favorite.business_id[0].files?.length !== 0; then hasPhoto else noPhoto"></div>\n\n            <ng-template #hasPhoto>\n\n              <img class="d-flex mr-3" [src]="favorite.business_id[0].files[0]?.url" alt="">\n\n            </ng-template>\n\n            <ng-template #noPhoto>\n\n              <img class="d-flex mr-3" src="https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww" alt="">\n\n            </ng-template>\n\n            <!-- <img class="d-flex mr-3" [src]="[favorite.business_id[0].files.length !== 0 ? "{{favorite.business_id[0].files[0].url}}" : \'https://cdn.filestackcontent.com/YLUX5rX8RAWVTNsDRPww\']" alt=""> -->\n\n          </div>\n\n          <div class="text-holder media-body" tappable (click)="getBusiness(favorite)">\n\n            <h3 class="title-text">{{favorite.business_id[0].company_name}}</h3>\n\n            <div class="company-text">{{favorite.business_id[0].title}}</div>\n\n            <div class="location-text">{{favorite.business_id[0].city}}, {{favorite.business_id[0].state}}, {{favorite.business_id[0].country}}</div>\n\n            <!-- <div class="expiration-text"><i class="fa fa-clock-o"></i> Expires {{favorite.end_date | date : \'MM/dd/yyyy\'}}</div> -->\n\n            <i class="fa fa-chevron-right fa-2x"></i>\n\n          </div>\n\n        </div>\n\n\n\n        <div class="favorites-button">\n\n          <a class="btn remove-btn" tappable (click)="removeFavorite(favorite._id, i)">Remove</a>\n\n          <a class="btn btn-more" tappable (click)="getBusiness(favorite)">More Deals <i class="fa fa-chevron-right"></i></a>\n\n        </div>\n\n\n\n      </div>\n\n    </ng-template>\n\n\n\n    <ng-template #noFavorites>\n\n      <div class="no-favorites-holder">\n\n        <h4>Once you favorite a business, it will show up here!</h4>\n\n      </div>\n\n    </ng-template>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-favorites\page-user-favorites.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], UserFavoritesPage);

//# sourceMappingURL=page-user-favorites.js.map

/***/ }),

/***/ 781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details_item_details__ = __webpack_require__(434);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(25);
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
        this.hasNoData = false;
        this.hasSearch = false;
        this.hasNotify = false;
        this.isRefetch = false;
        this.inInbox = true;
        this.init();
    }
    UserInboxPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.fetchInboxData();
    };
    UserInboxPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasData = false;
        this.inInbox = false;
    };
    UserInboxPage.prototype.initializeItems = function () {
        this.items = this.businessList;
    };
    UserInboxPage.prototype.getItems = function (ev) {
        var _this = this;
        this.hasSearch = true;
        this.hasSearchData = false;
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value ocaf the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                if (item.business_id.length != 0 && item.business_id[0].company_name && item.last_chat.length != 0) {
                    if (item.business_id[0].company_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                        _this.hasSearchData = true;
                        return (item.business_id[0].company_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    }
                    else {
                        console.log('No search data');
                    }
                    if (_this.hasSearchData) {
                        _this.hasNoSearchData = false;
                    }
                    else {
                        _this.hasNoSearchData = true;
                    }
                }
                else {
                    if (_this.hasSearchData) {
                        _this.hasNoSearchData = false;
                    }
                    else {
                        _this.hasNoSearchData = true;
                    }
                    console.log('No company name or chat');
                }
            });
        }
        else {
            this.hasNoSearchData = false;
        }
    };
    UserInboxPage.prototype.fetchInboxData = function () {
        var _this = this;
        // Display all business
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.api.Message.room_list(user._id).then(function (business) {
                console.log('Inbox data fetching....');
                if (business.length) {
                    var withChats = [], noChats = [];
                    for (var x = 0; x < business.length; x++) {
                        if (business[x].last_chat.length > 0) {
                            withChats.push(business[x]);
                        }
                        else {
                            noChats.push(business[x]);
                        }
                    }
                    if (withChats.length == 0) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                        _this.hasNoData = true;
                    }
                    else {
                        _this.hasNoData = false;
                    }
                    var chatsSort = withChats.sort(function (a, b) {
                        return b.last_chat[0].epoch - a.last_chat[0].epoch;
                    });
                    var newChats = withChats;
                    noChats.forEach(function (res) {
                        newChats.push(res);
                    });
                    if (!_this.isRefetch) {
                        _this.isRefetch = true;
                        console.log('Refetching inbox data...');
                        return _this.fetchInboxData();
                    }
                    else {
                        _this.businessList = newChats;
                        _this.initializeItems();
                        console.log(newChats);
                        _this.hasData = true;
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                        console.log('Inbox data loaded');
                    }
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                    _this.hasNoData = true;
                }
                // if(!this.hasNotify && this.hasNotify2 && !this.hasNotifyDone){
                //   this.hasNotifyDone = true;
                //   return this.fetchInboxData();
                // }
                // if(this.hasNotify && !this.hasNotify2) {
                //   this.hasNotify = false;
                //   this.hasNotify2 = true;
                //   return this.fetchInboxData();
                // }
                // if(this.msg_user_id && !this.hasData && this.hasNotify) {
                //   this.msg_user_id = '';
                //   console.log('refetch inbox data')
                //   return this.fetchInboxData();
                // }
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserInboxPage.prototype.init = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            console.log('Notif from business');
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    if (chatNotification.user_id == user._id) {
                        _this.hasNotify = true;
                    }
                    if (_this.inInbox) {
                        _this.fetchInboxData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    UserInboxPage.prototype.formatEpoch = function (epoch) {
        return __WEBPACK_IMPORTED_MODULE_7__providers__["e" /* UtilService */].getCalendarDay(epoch);
    };
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserInboxPage.prototype.viewMessage = function (businessDetail, userDetail) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
            "businessDetail": businessDetail,
            "userDetail": userDetail
        }, {
            animate: true,
            direction: 'forward',
            animation: 'md-transition'
        });
    };
    UserInboxPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back',
            animation: 'md-transition'
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
<<<<<<< HEAD
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Inbox</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <h5 *ngIf="hasNoData"> No Conversations </h5>\n\n\n\n    <ion-searchbar placeholder="Search Inbox" *ngIf="hasData" [spellcheck]="true" [type]="search" (ionInput)="getItems($event)"></ion-searchbar>\n\n\n\n    <h5 *ngIf="this.hasSearch && this.hasNoSearchData"> No results </h5>\n\n\n\n    <ion-list id="inbox-list" *ngFor="let business of items;">\n\n\n\n      <ion-item *ngIf="business.last_chat.length != 0" tappable (click)="viewMessage(business.business_id[0],business.user_id[0])">\n\n\n\n          <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="name" *ngIf="business.business_id[0] && business.business_id[0].company_name"> {{business.business_id[0].company_name}}  </span>\n\n\n\n          <span class="name" [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" *ngIf="business.business_id[0] && !business.business_id[0].company_name"> No Company Name </span>\n\n\n\n          <span class="name" *ngIf="business.business_id && business.business_id.length == 0"> No Business Data </span>\n\n\n\n          <p [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="message" *ngIf="business.last_chat.length != 0"> {{ business.last_chat[0].message  }}  </p>\n\n\n\n          <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="date-time" *ngIf="business.last_chat.length != 0">  {{formatEpoch(business.last_chat[0].epoch)}} </span>\n\n\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <span class="fa fa-spinner fa-spin loader"></span>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/
=======
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button class="back-btn" (click)="goBack()"><i class="fa fa-angle-left fa-lg"></i></button>\n\n    <span class="page-title">Inbox</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n\n\n\n\n    <h5 *ngIf="hasNoData"> No Conversations </h5>\n\n\n\n    <ion-list id="inbox-list" *ngFor="let business of businessList;">\n\n\n\n      <ion-item *ngIf="business.last_chat.length != 0" tappable (click)="viewMessage(business.business_id[0],business.user_id[0])">\n\n\n\n          <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="name" *ngIf="business.business_id[0] && business.business_id[0].company_name"> {{business.business_id[0].company_name}}  </span>\n\n\n\n          <span class="name" [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" *ngIf="business.business_id[0] && !business.business_id[0].company_name"> No Company Name </span>\n\n\n\n          <span class="name" *ngIf="business.business_id && business.business_id.length == 0"> No Business Data </span>\n\n\n\n          <p [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="message" *ngIf="business.last_chat.length != 0"> {{ business.last_chat[0].message  }}  </p>\n\n\n\n          <span [ngClass]="[business.last_chat.length != 0 && business.last_chat[0].is_read == false && business.last_chat[0].message_by === \'business\' ? \'new\' : \'\']" class="date-time" *ngIf="business.last_chat.length != 0">  {{formatEpoch(business.last_chat[0].epoch)}} </span>\n\n\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <span class="fa fa-spinner fa-spin loader"></span>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\client-app\src\pages\page-user-inbox\page-user-inbox.html"*/
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(295);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(164);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__sql__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(165);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(755);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(296);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(412);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__socket_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__ = __webpack_require__(803);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 803:
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

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatBubble__ = __webpack_require__(805);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chatBubble__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatBubble; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(80);
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

/***/ 806:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__ = __webpack_require__(807);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardAttachDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(433);
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
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */]])
], KeyboardAttachDirective);

//# sourceMappingURL=keyboard-attach.directive.js.map

/***/ }),

/***/ 82:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_signup_success_page_signup_success__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_signup_mobile_page_signup_mobile__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(52);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupEmailPage);

//# sourceMappingURL=page-signup-email.js.map

/***/ })

},[439]);
//# sourceMappingURL=main.js.map