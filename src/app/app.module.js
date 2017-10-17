var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SliderPage } from '../pages/page-slider/page-slider';
import { LoginPage } from '../pages/page-login/page-login';
import { ResetPassPage } from '../pages/page-reset-pass/page-reset-pass';
import { ResetPassSuccessPage } from '../pages/page-reset-pass-success/page-reset-pass-success';
import { SignupPage } from '../pages/page-signup/page-signup';
import { SignupEmailPage } from '../pages/page-signup-email/page-signup-email';
import { SignupMobilePage } from '../pages/page-signup-mobile/page-signup-mobile';
import { SignupSuccessPage } from '../pages/page-signup-success/page-signup-success';
import { SignupMobileSuccessPage } from '../pages/page-signup-mobile-success/page-signup-mobile-success';
import { MenuPage } from '../pages/page-menu/page-menu';
import { CategoryMenuPage } from '../pages/page-menu/page-category-menu/page-category-menu';
import { SortMenuPage } from '../pages/page-menu/page-sort-menu/page-sort-menu';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { UserMembershipCardPage } from '../pages/page-user-membership-card/page-user-membership-card';
import { UserLoyaltyCardsPage } from '../pages/page-user-loyalty-cards/page-user-loyalty-cards';
import { UserFindDealsPage } from '../pages/page-user-find-deals/page-user-find-deals';
import { UserFindDealsMapPage } from '../pages/page-user-find-deals-map/page-user-find-deals-map';
import { UserFavoritesPage } from '../pages/page-user-favorites/page-user-favorites';
import { UserLoyaltyStampCardPage } from '../pages/page-user-loyalty-stamp-card/page-user-loyalty-stamp-card';
import { UserLoyaltyCardDealsPage } from '../pages/page-user-loyalty-card-deals/page-user-loyalty-card-deals';
import { UserInboxPage } from '../pages/page-user-inbox/page-user-inbox';
import { UserDealsPage } from '../pages/page-user-deals/page-user-deals';
import { ListPage } from '../pages/list/list';
import { PaginationService } from '../directives/pagination/index.pagination';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiService } from '../service/api.service.component';
import { IonicStorageModule } from '@ionic/storage';
import { UserChatPage } from '../pages/page-user-chat/page-user-chat';
import { DatabaseService, SocketService, Sql, UtilService } from "../providers";
import { ElasticTextarea } from "../components/elasticTextarea";
import { ChatBubble } from "../components/chatBubble";
import { KeyboardAttachDirective } from "../directives";
import { AgmCoreModule } from '@agm/core';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            SliderPage,
            LoginPage,
            ResetPassPage,
            ResetPassSuccessPage,
            SignupPage,
            SignupEmailPage,
            SignupMobilePage,
            SignupSuccessPage,
            SignupMobileSuccessPage,
            MenuPage,
            CategoryMenuPage,
            SortMenuPage,
            ItemDetailsPage,
            UserMembershipCardPage,
            UserLoyaltyCardsPage,
            UserFavoritesPage,
            UserFindDealsPage,
            UserFindDealsMapPage,
            UserInboxPage,
            ListPage,
            UserDealsPage,
            UserLoyaltyCardDealsPage,
            UserLoyaltyStampCardPage,
            ElasticTextarea,
            ChatBubble,
            KeyboardAttachDirective,
            UserChatPage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            HttpModule,
            IonicStorageModule.forRoot(),
            NgxQRCodeModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCTAVQFoMmvTVvuUTj3DPXWzaMmsIFquKs',
                libraries: ["places", "geometry"]
            })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            SliderPage,
            LoginPage,
            ResetPassPage,
            ResetPassSuccessPage,
            SignupPage,
            SignupEmailPage,
            SignupMobilePage,
            SignupSuccessPage,
            SignupMobileSuccessPage,
            MenuPage,
            CategoryMenuPage,
            SortMenuPage,
            ItemDetailsPage,
            UserMembershipCardPage,
            UserLoyaltyCardsPage,
            UserFavoritesPage,
            UserFindDealsPage,
            UserFindDealsMapPage,
            UserInboxPage,
            UserLoyaltyStampCardPage,
            ListPage,
            UserDealsPage,
            UserLoyaltyCardDealsPage,
            ElasticTextarea,
            ChatBubble,
            UserChatPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            ScreenOrientation,
            Facebook,
            GooglePlus,
            BarcodeScanner,
            ApiService,
            Sql,
            DatabaseService,
            SocketService,
            UtilService,
            PaginationService
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map