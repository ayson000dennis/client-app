import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';

import { UserChatPage } from '../page-user-chat/page-user-chat';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

// import { ApiServiceChat } from '../../service/api.service.component.chat';

import {ChatMessage, DatabaseService, SocketService, UtilService} from "../../providers";

import * as _ from "lodash";
import * as $ from "jquery";
import Config from '../../app/config';

@Component({
  selector: 'page-user-inbox',
  templateUrl: 'page-user-inbox.html'
})

export class UserInboxPage {
  pages: Array<{title: string, component: any}>;
  businessList: string[];
  user: string[];
  hasData: boolean = false;
  hasNotify : boolean = false;
  hasLeave : boolean = false;
  hasNewMsgBusinessId : string;
  message = [];
  room_id : string;
  rooms : string[];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.init();
  }

  ionViewWillEnter() {
    this.socketService.connect();
    this.fetchInboxData();
  }

  ionViewDidLoad() {
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
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasData = false;
  }

  fetchInboxData() {
    console.log('data inbox fetching... INBOX PAGE')
      // Display all business
      this.storage.get('user').then(user =>{
        this.user = user;

        this.api.Message.room_list(user._id).then(business => {

          var withChats = [],
            noChats = [];

          for (var x = 0; x < business.length; x++) {
            if (business[x].last_chat.length > 0) {
              withChats.push(business[x]);
            } else {
              noChats.push(business[x]);
            }
          }

          var chatsSort = withChats.sort(function(a, b){
              return b.last_chat[0].epoch - a.last_chat[0].epoch;
          });

          var newChats = withChats;

          noChats.forEach(function(res) {
            newChats.push(res);
          });

          this.businessList = newChats;

          this.hasData = true;
          this.socketService.connect();
          $('body').find('.fa.loader').remove();

          // this.businessList = business;

        }).catch((error) => {
            console.log(error);
        });

      });
    }

    formatEpoch(epoch) {
        return UtilService.getCalendarDay(epoch);
    }


  init() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      // console.log(chatNotification);
        console.log('Notif from business');
      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.user_id == user._id) {
              this.hasNotify = true;
              // this.hasNewMsgBusinessId = chatNotification.business_id;
          }

        }).catch((error) => {
            console.log(error);
        });

          this.fetchInboxData();

      });
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {
      animate: true,
      direction: 'back'
    });
  }

  viewMessage(businessDetail,userDetail) {
    this.navCtrl.push(UserChatPage, {
      animate: true,
      direction: 'forward',
      "businessDetail": businessDetail,
      "userDetail" : userDetail
    });
  }
}
