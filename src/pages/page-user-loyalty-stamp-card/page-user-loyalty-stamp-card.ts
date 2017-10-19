import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-user-loyalty-stamp-card',
  templateUrl: 'page-user-loyalty-stamp-card.html',
})
export class UserLoyaltyStampCardPage {
  title: any;
  stamps: any;
  stamps_needed: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public screenOrientation: ScreenOrientation) {

    this.title = this.navParams.get('title');
    this.stamps = this.navParams.get('stamps');
    this.stamps_needed = this.navParams.get('stamps_needed');
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      if ($(window).width() <= 768) {
        this.screenOrientation.unlock();
      }
    });
  }

  ionViewDidEnter() {
    var self = this;

    for (var x = 1; x <= this.stamps_needed; x++) {
      x == this.stamps_needed ?
      $('.holder-stamps').append('<div class="stamp"><span>FREE</span></div>') :
      $('.holder-stamps').append('<div class="stamp"><span>' + x + '</span></div>');
    }

    for (var x = 0; x <= this.stamps - 1; x++) {
      $('.stamp').eq(x).prepend('<img src="assets/images/stamp.png" alt="" />');
    }

    var stampsCss = function () {
      var stampWidth = $('.stamp').css('width');
      $('.stamp').css({'width': stampWidth, 'height': stampWidth});

      if ($(window).width() > $(window).height()) {
        if (self.stamps_needed > 10) {
          $('.holder-stamps').css('width', parseInt(stampWidth) * (Math.ceil(self.stamps_needed / 2)));
        } else {
          $('.holder-stamps').css('width', 'auto');
        }
      }
    }

    stampsCss();

    var currentWidth = $(window).width();

    $(window).resize(function() {
      if (currentWidth != $(window).width()) {
        console.log('resized');
        $('.stamp').css('width', '');
        $('.holder-stamps').css('width', 'auto');

        setTimeout(function() {
          var newWidth = $(window).width();

          stampsCss();

          currentWidth = newWidth;
        },100);
    	}
    });
  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }
}
