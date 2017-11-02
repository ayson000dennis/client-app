var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, MenuController } from 'ionic-angular';
import { SliderPage } from '../pages/page-slider/page-slider';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from "@ionic-native/keyboard";
import { DatabaseService } from '../providers/database.service';
import { Sql } from '../providers/sql';
import { SocketService } from '../providers/socket.service';
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
        this.rootPage = SliderPage;
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
    ViewChild('nav'),
    __metadata("design:type", NavController)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [Keyboard, DatabaseService, Sql, SocketService]
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController,
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        Keyboard])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map