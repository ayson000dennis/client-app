import { Component } from '@angular/core';
import { Platform, NavController,NavParams } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage'
import moment from 'moment';

import * as $ from "jquery";
declare var google: any;

@Component({
  selector: 'page-user-deals',
  templateUrl: 'page-user-deals.html'
})

export class UserDealsPage {
  pages: Array<{title: string, component: any}>;
  business : string[];
  business_imgs : any[];
  deals : string[];
  hasData :boolean = false;
  operations  : string[];
  template : any;
  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  map: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams : NavParams,
    private api : ApiService,
    private storage : Storage){
  }

  ionViewWillEnter(){
    var self = this;
    var businessHolder = this.navParams.get('business');
    this.business = businessHolder.business_id[0];
    this.business_imgs = businessHolder.business_id[0].files;
    this.template = this.navParams.get('template');
    console.log(businessHolder)

    this.api.Deals.deals_list().then(deals =>{
      this.deals = deals
      console.log(deals)
      this.hasData =true
      // console.log(this.deals)
    })

    // console.log(this.business);
    // if(this.business.operations[0] !== '2' && this.business.operations.length !== 0 && this.hasData == true){
    //
    //
    //   // this.business.operations.forEach(function(val,key){
    //   //     console.log(val);
    //   //
    //   //   // self.operations[this.days[key]] = val;
    //   //
    //   //   // console.log(self.operations);
    //   //
    //   // })
    //     // this.business.push({sample_data:{}});
    //     this.business['sample_data'] = {};
    //
    //     var sample_data = '';
    //     var length = this.business.operations.length;
    //
    //     // this.business.operations.splice(4,1);
    //
    //     for(var index_days = 0 ;index_days < this.business.operations.length; index_days++){
    //       for( var x = 0; x < this.days.length; x++){
    //         if(Object.keys(this.business.operations[index_days]) == this.days[x]){
    //           // console.log(this.days[x]);
    //           this.business.sample_data[this.days[x]] = this.business.operations[index_days][this.days[x]];
    //         }
    //       }
    //     }
    //
    //     console.log(this.business);
    //   // console.log(this.business.operations);
    // }
    // this.operations = this.business;
  }

  ionViewDidLoad() {
    this.initMap();
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
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

  initMap() {
    var businessHolder2 = this.navParams.get('business');
    var business2 = businessHolder2.business_id[0];
    var lat = business2.lat;
    var lng = business2.lng;

    // var default_location = new google.maps.LatLng(lat, lng);
    var center = {lat: business2.lat, lng: business2.lng};
    var self = this;
    this.map = new google.maps.Map(document.getElementById('dealMapView'), {
      center: center,
      zoom: 9
    });

    var marker = new google.maps.Marker({
      position: center,
      map: this.map,
    });

  }

}
