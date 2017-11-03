import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { UserFavoritesPage } from '../page-user-favorites/page-user-favorites';
import { UserChatPage } from '../page-user-chat/page-user-chat';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage'
import moment from 'moment';

import * as $ from "jquery";

import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'page-user-deals',
  templateUrl: 'page-user-deals.html'
})

export class UserDealsPage {
  pages: Array<{title: string, component: any}>;
  business : any;
  business_type: any;
  business_imgs : any[];
  business_address : string;
  deals : string[];
  hasData :boolean = false;
  user : any[];
  favorites : any;
  operations  : string[];
  template : any;
  operatingHours = [];
  currentDay = [];
  map: any;
  lat: any;
  lng: any;
  room_id: string;

  //place.icon
  // googleMarker = {
  //   url: 'https://cdn.filestackcontent.com/8BeI5gTQrG7u1R98oogt',
  //   size: new google.maps.Size(50, 50),
  //   origin: new google.maps.Point(0, 0),
  //   scaledSize: new google.maps.Size(48, 50)
  // };
  //
  // memberMarker = {
  //   url: 'https://cdn.filestackcontent.com/yRYj4h7URfKVAJfxNlLd',
  //   size: new google.maps.Size(50, 50),
  //   origin: new google.maps.Point(0, 0),
  //   scaledSize: new google.maps.Size(48, 50)
  // };
  //
  // premiumMemberMarker = {
  //   url: 'https://cdn.filestackcontent.com/spT9FsVTTiqszaTddma0',
  //   size: new google.maps.Size(50, 50),
  //   origin: new google.maps.Point(0, 0),
  //   scaledSize: new google.maps.Size(48, 50)
  // };

  //in app browser option
  private iabOptions: InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    toolbarposition: 'top',
    fullscreen : 'yes'//Windows only
  };

  swiper:any;
  @ViewChild('slider') slider: Slides;
  slidesOptions = { initialSlide: 0 }

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    public platform: Platform,
    public navParams : NavParams,
    private api : ApiService,
    public alertCtrl: AlertController,
    private storage : Storage){
  }

  slideNext(){
    this.slider.slideNext();
  }

  slidePrev(){
    this.slider.slidePrev();
  }

  ionViewWillEnter(){
    this.business = this.navParams.get('business');
    if(this.business.operations){

      var days = this.business.operations;
      if (this.business.operations[0] === '0') {
        //Do something
      } else if (this.business.operations[0] === '2') {
        //Do something
      } else if (this.business.operations[0] === '1') {
        //Do something
      } else {
        days.forEach((day, i) => {
          var d = Object.keys(day)[0];

          var work = {
            dayCount: i+1,
            day: d,
            start: eval("day." + d + ".start"),
            end: eval("day." + d + ".end"),
            isClosed: eval("day." + d + ".isChecked")
          }
          this.operatingHours.push(work);
        });

        this.operatingHours.forEach(operations => {
          var today = new Date().getDay();
          if(operations.dayCount === today) {
            this.currentDay.push(operations);
          }
        });
        console.log(this.business.operations)
      }
    }

    if (this.business !== null) {
      this.hasData = true;
    }
    this.getFavorites();
  }

  getFavorites() {
    this.storage.get('user').then(user =>{
      this.api.Favorites.favorite_list(user._id).then(favorites => {
        this.favorites = favorites;
        if(this.hasData) {
          this.favorites.forEach(favorite => {
            // this.business.forEach((business, i) => {
              if(this.business._id === favorite.business_id[0]._id){
                this.business.is_favorite = true;
              }
            // });
          });
        }
      });
    });
  }

  addToFavorites(business) {
    let selectedButton = document.getElementById('addToFavorite1');
    selectedButton.style.display = "none";

    let addedToFavBtn = document.getElementById('addedToFavorite2');
    addedToFavBtn.style.display = "block";

    this.storage.get('user').then(user =>{
      var deal_id = [];

      if (business.deal_id.length !== 0) {
        console.log('with deal')
        business.deal_id.forEach(id => {
          deal_id.push(id)
        });
      } else {
        console.log('business only')
        deal_id = [];
      }

      let deal_body = {
        deals_id : deal_id,
        business_id : business._id,
        customer_id : user._id
      };

      this.api.Favorites.add_to_favorite(deal_body).then(favorite => {
        console.log(JSON.stringify(favorite.message));
      })
      .catch(error => {
        console.log(error._body);
      });
    });

  }

  goToFavorites() {
      this.navCtrl.setRoot(UserFavoritesPage, {
        animate: true,
        direction: 'back'
      });
  }

  viewMap(address, state, zip) {
    var map_url = 'https://www.google.com/maps/place/';
    this.iab.create(map_url + address + ',' + state + ',' + zip, '_blank', this.iabOptions);
  }

  ionViewDidLoad() {
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goListView() {
    this.navCtrl.setRoot(UserFindDealsPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  showHours() {
    if($(".operations-list").hasClass("open")) {
      $(".operations-list").removeClass("open");
      $(".toggle-collapse").text("(show more)");
    }
    else {
      $(".operations-list").addClass("open");
      $(".toggle-collapse").text("(show less)");
    }
  }

  sendMessage() {
    this.storage.get('user').then(user =>{

      this.navCtrl.setRoot(UserChatPage, {
        businessDetail: this.business,
        previousPage: 'deals',
        userDetail: user
      },{
        animate: true,
        direction: ' forward'
      });

    });

  }

  goPrevious() {
    this.navCtrl.pop();
  }

}
