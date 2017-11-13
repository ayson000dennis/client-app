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
  currentTime: any;
  map: any;
  lat: any;
  lng: any;
  room_id: string;

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
<<<<<<< HEAD
    this.resizeImgs();
=======
>>>>>>> 7143f90bc3113a0c1e0adaf06ab60796eaa9a366

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
          var isClosed = eval("day." + d + ".isChecked");
          var start = eval("day." + d + ".start");
          var end = eval("day." + d + ".end");

          var startDecimal = start.replace(':','.');
          var endDecimal = end.replace(':','.');

          //convert 24hrs to 12hrs time format
          //start time
          if(start.length === 4) {
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
              dayCount: i+1,
              day: d,
              start: start,
              end: end,
              startDecimal: startDecimal,
              endDecimal: endDecimal,
              isClosed: isClosed
            }
          // }
          this.operatingHours.push(work);
        });
        this.operatingHours.forEach(operations => {
          var today = new Date().getDay();
          if(operations.dayCount === today) {
            this.currentDay.push(operations);
          }
        });

        console.log(this.currentDay)
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
  }

  resizeImgs() {
    if (this.business.files.length !== 0) {
      //resize banner imgs
      this.business.files.forEach(files => {
        var banner_imgs = files.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:500/");
        files.url = banner_imgs;
      });
    }

    if (this.business.deal_id.length !== 0) {
      //resize deal imgs
      this.business.deal_id.forEach(deal => {
        var deal_imgs = deal.photo.url.replace("https://cdn.filestackcontent.com/", "https://cdn.filestackcontent.com/resize=width:200/");
        deal.photo.url = deal_imgs;
      });
    }
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
                $('#favHeart').css('color', '#a4c73a');
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

    $('#favHeart').css('color', '#a4c73a');

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
        direction: 'back',
        animation: 'md-transition'
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
      direction: 'back',
      animation: 'md-transition'
    });
  }

  goListView() {
    this.navCtrl.setRoot(UserFindDealsPage, {}, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
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

  readMore() {
    $(".shorten").addClass("hidden");
    $(".read-more").addClass("hidden");
    $(".read-less").removeClass("hidden");
    $(".full-text").removeClass("hidden");
  }

  readLess() {
    $(".shorten").removeClass("hidden");
    $(".read-more").removeClass("hidden");
    $(".read-less").addClass("hidden");
    $(".full-text").addClass("hidden");
  }

  sendMessage() {
    this.storage.get('user').then(user =>{

      this.navCtrl.setRoot(UserChatPage, {
        businessDetail: this.business,
        previousPage: 'deals',
        userDetail: user
      },{
        animate: true,
        direction: 'forward',
        animation: 'md-transition'
      });

    });

  }

  goPrevious() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }
}
