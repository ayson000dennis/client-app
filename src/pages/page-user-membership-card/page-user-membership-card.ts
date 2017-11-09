import { Component } from '@angular/core';
import { Platform, NavController,NavParams } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
import * as $ from "jquery";
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
@Component({
  selector: 'page-user-membership-card',
  templateUrl: 'page-user-membership-card.html'
})

export class UserMembershipCardPage {
  pages: Array<{title: string, component: any}>;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  user : string[];
  hasData : boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private api:ApiService,
    private storage: Storage){
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back',
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

  viewInbox() {
    this.navCtrl.setRoot(UserInboxPage, {}, {
      animate: true,
      direction: 'back',
      animation: 'md-transition'
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward',
      animation: 'md-transition'
    });
  }

  ionViewWillEnter(){
    this.storage.get('user').then(user =>{
      this.user = user;
      console.log(user)
      var makeQr = {
          MembershipNumber: user.membership_number,
          Name : user.first_name + ' ' + user.last_name,
          MemberSince : user.created_at,
        }
        this.createdCode = JSON.stringify(makeQr)
      this.hasData = true;
    })
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}
