import { NavController,NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import { Storage } from '@ionic/storage';

//chat
import {Component, EventEmitter, NgZone, ViewChild} from "@angular/core";
import {ChatMessage, DatabaseService, SocketService, UtilService} from "../../providers";

import * as _ from "lodash";
import * as $ from "jquery";

import Config from '../../app/config';
import { ApiService } from '../../service/api.service.component';

@Component({
  selector: 'page-user-chat',
  templateUrl: 'page-user-chat.html'
})

export class UserChatPage {

  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  messages: any[];
  chatBox: string;
  room_id: string;
  btnEmitter: EventEmitter<string>;
  user: string[];

  private businessDetail;
  private userDetail;
  hasData : boolean = false;
  hasLeave : boolean = false;
  hasNewMsg : boolean = false;

  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _zone: NgZone,
    public databaseService: DatabaseService,
    public socketService: SocketService,
    private storage: Storage,
    public api: ApiService) {

    this.businessDetail = this.navParams.get("businessDetail");
    this.userDetail = this.navParams.get("userDetail");

    this.btnEmitter = new EventEmitter<string>();
    this.messages = [];
    this.chatBox = "";
    this.room_id = this.userDetail._id + this.businessDetail._id
    this.init();

    // console.log(this.businessDetail);
    // console.log(this.userDetail);
  }

  ionViewWillEnter() {
    this.socketService.connect();
    this.socketService.joinRoom(this.room_id);
  }

  ionViewDidLoad(){
    this.fetchChats();
     this.updateRead();
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
  }

 fetchChats(){

   // GET MESSAGES FROM DATABASE
   this.api.Message.fetch_chats(this.room_id).then(chats => {
     if(this.hasLeave){
       return;
     }

     if(this.hasNewMsg && !this.hasData){
       this.hasNewMsg = false;
       console.log('load again')
       return this.fetchChats();
     }

     this.messages = chats;
     this.hasData = true;
     console.log('Chats loaded')

    $('body').find('.fa.loader').remove();
    this.scrollToBottom();
   }).catch((error) => {
       console.log(error);
   });

 }

 updateRead(){
   this.api.Message.update_read(this.room_id,'business').then(update => {
     console.log('is_read updated');
   });
 }

  init() {
    // Get real time message response
    this.socketService.messages.subscribe((chatMessage: ChatMessage) => {
      this._zone.run(() => {
        this.messages.push(chatMessage);
      });

      this.hasNewMsg = true;

     this.scrollToBottom();
    });
  }

  public sendMessage() {
    this.btnEmitter.emit("sent clicked");
    this.txtChat.setFocus();
    let message = this.txtChat.content;
    this.send(message);
    this.txtChat.clearInput();
  }

  send(message) {
    let user_id = this.userDetail._id,
    first_name = this.userDetail.first_name,
    last_name = this.userDetail.last_name,
    business_id = this.businessDetail._id

    this.socketService.newRequest(UtilService.formatMessageRequest(user_id,business_id,first_name,last_name,message));
    this.chatBox = '';
    this.scrollToBottom();
  }


  scrollToBottom() {
    this._zone.run(() => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goToInbox() {
    this.navCtrl.push(UserInboxPage, {
      animate: true,
      direction: 'forward'
    });
  }

}
