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
  hasNoData : boolean = false;
  hasSearch : boolean = false;
  hasSearchData : boolean;
  hasNoSearchData : boolean;
  hasNotify : boolean = false;
  isRefetch : boolean = false;
  inInbox : boolean = true;

  items: any;

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

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasData = false;
    this.inInbox = false;
  }

  initializeItems() {
   this.items = this.businessList;
  }

  getItems(ev: any) {
    this.hasSearch = true;
    this.hasSearchData = false;

    // Reset items back to all of the items
    this.initializeItems();

     // set val to the value ocaf the searchbar
     let val = ev.target.value;

     // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {

       this.items = this.items.filter((item) => {

         if(item.business_id.length != 0 && item.business_id[0].company_name && item.last_chat.length != 0) {

           if(item.business_id[0].company_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
             this.hasSearchData = true;
             return (item.business_id[0].company_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
           } else {
             console.log('No search data');
           }

           if(this.hasSearchData) {
             this.hasNoSearchData = false;
           } else {
             this.hasNoSearchData = true;
           }

         } else {

           if(this.hasSearchData) {
             this.hasNoSearchData = false;
           } else {
             this.hasNoSearchData = true;
           }

           console.log('No company name or chat');
         }

       });
       
     } else {
       this.hasNoSearchData = false;
     }
  }

  fetchInboxData() {

      // Display all business
      this.storage.get('user').then(user =>{
        this.user = user;

        this.api.Message.room_list(user._id).then(business => {
          console.log('Inbox data fetching....');

          if(business.length) {
                var withChats = [],
                  noChats = [];

                for (var x = 0; x < business.length; x++) {
                  if (business[x].last_chat.length > 0) {
                    withChats.push(business[x]);
                  } else {
                    noChats.push(business[x]);
                  }
                }

                if(withChats.length == 0) {
                  $('body').find('.fa.loader').remove();
                  this.hasNoData = true;
                } else {
                  this.hasNoData = false;
                }

                var chatsSort = withChats.sort(function(a, b){
                    return b.last_chat[0].epoch - a.last_chat[0].epoch;
                });

                var newChats = withChats;

                noChats.forEach(function(res) {
                  newChats.push(res);
                });

                if(!this.isRefetch) {

                  this.isRefetch = true;

                  console.log('Refetching inbox data...');

                  return this.fetchInboxData();
                } else {

                  this.businessList = newChats;
                  this.initializeItems();
                  console.log(newChats)

                  this.hasData = true;

                  $('body').find('.fa.loader').remove();

                  console.log('Inbox data loaded');
                }

          } else {
            $('body').find('.fa.loader').remove();
            this.hasNoData = true;
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

        }).catch((error) => {
            console.log(error);
        });

      }).catch((error) => {
          console.log(error);
      });

  }

  init() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      console.log('Notif from business');

      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.user_id == user._id) {
            this.hasNotify = true;
          }

          if(this.inInbox){
             this.fetchInboxData();
          }

        }).catch((error) => {
            console.log(error);
        });

      });

    });
  }

  formatEpoch(epoch) {
      return UtilService.getCalendarDay(epoch);
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  viewMessage(businessDetail,userDetail) {
    this.navCtrl.setRoot(UserChatPage, {
      "businessDetail": businessDetail,
      "userDetail" : userDetail
    }, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }
}
