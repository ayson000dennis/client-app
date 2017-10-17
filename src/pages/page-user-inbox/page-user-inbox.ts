import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';

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

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.initNotification();
  }

  ionViewWillEnter() {
    this.socketService.connect();
  }

  ionViewDidLoad() {
    this.storage.get('user').then(user =>{
      this.user = user;
      // console.log(user)

        this.api.Message.business_list(user._id).then(business => {
          this.businessList = business;
          // console.log(business);

          this.hasData = true;
          this.socketService.connect();
          $('body').find('.fa.loader').remove();
        }).catch((error) => {
            console.log(error);
        });

    }).catch((error) => {
        console.log(error);
    });
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
    this.hasData = false;
  }

  initNotification() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      // console.log(chatNotification);
        console.log('Notif from business');
      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          // if(chatNotification.user_id == user._id) {
          //     this.hasNotify = true;
          //     this.hasNewMsgBusinessId = chatNotification.business_id;
          // }

        }).catch((error) => {
            console.log(error);
        });

      });
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
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
