import { NavController,NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { UserDealsPage } from '../page-user-deals/page-user-deals';

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
  // user: string[];

  hasData : boolean = false;
  hasLeave : boolean = false;
  isRefetch : boolean = false;
  message_by : string;

  pages: Array<{title: string, component: any}>;

  private businessDetail;
  private userDetail;
  private previousPage;

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
    this.previousPage = this.navParams.get("previousPage");

    this.btnEmitter = new EventEmitter<string>();
    this.messages = [];
    this.chatBox = "";
    this.room_id = this.userDetail._id + this.businessDetail._id;
    this.init();
  }

  ionViewWillEnter() {

    this.socketService.connect();
    this.socketService.joinRoom(this.room_id);

    this.fetchChats();
    this.updateRead();
  }

  ionViewDidLoad(){

  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
    this.hasData = false;
  }

 fetchChats(){

  //  GET MESSAGES FROM DATABASE
   this.api.Message.fetch_chats(this.room_id).then(chats => {
     console.log('fetching chats...');

     if(this.hasLeave){
       return;
     }

    //  if(this.message_by === 'business' && !this.hasData) {
    //    this.message_by = '';
    //    console.log('load again');
    //    return this.fetchChats();
    //  }

    if(!this.isRefetch) {

      this.isRefetch = true;

      console.log('Refetching inbox data...');

      return this.fetchChats();
    } else {

      this.messages = chats;

      this.hasData = true;

      this.scrollToBottom();

      $('body').find('.fa.loader').remove();

      console.log('Inbox data loaded');
    }

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

      this.message_by = chatMessage.message_by;

      this._zone.run(() => {

        // this.fetchChats();

        this.messages.push(chatMessage);
        this.scrollToBottom();
        this.updateRead();

      });

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
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  goToInbox() {
    this.navCtrl.setRoot(UserInboxPage, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

}
