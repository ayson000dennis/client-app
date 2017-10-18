import { Component, ViewChild } from '@angular/core';
import { Platform, NavController,NavParams,Slides } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserFindDealsPage } from '../page-user-find-deals/page-user-find-deals';
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
  business : string[];
  business_imgs : any[];
  business_address : string;
  deals : string[];
  hasData :boolean = false;
  operations  : string[];
  template : any;
  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  map: any;
  lat: any;
  lng: any;
  swiper:any;
  @ViewChild('slider') slider: Slides;
  slidesOptions = { initialSlide: 0 }

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams : NavParams,
    private api : ApiService,
    private storage : Storage){
  }

  slideNext(){
    this.slider.slideNext();
  }

  slidePrev(){
    this.slider.slidePrev();
  }

  ionViewWillEnter(){
    // var self = this;
    var businessHolder = this.navParams.get('business');
    console.log(businessHolder.business_id[0].lat)
    this.lat = businessHolder.business_id[0].lat;
    this.lng = businessHolder.business_id[0].lng;
    this.business = businessHolder.business_id[0];
    this.business_imgs = businessHolder.business_id[0].files;
    this.template = this.navParams.get('template');
    console.log(businessHolder)

    this.initMap(businessHolder.business_id[0].lat, businessHolder.business_id[0].lng);

    this.business_address = businessHolder.business_id[0].country + " " + businessHolder.business_id[0].state + " " + businessHolder.business_id[0].zip_postal;
    this.business_address = this.business_address.replace(/^[, ]+|[, ]+$|[, ]+/g, "+").trim();
    // console.log(this.business_address)

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
    // this.initMap();
  }

  ionViewDidLoad() {
    console.log(this.lat, this.lng)
    // this.initMap();
    // var self = this;
    // setTimeout(function(){
    //   self.initMap();
    // }, 650);
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

  goPrevious() {
    this.navCtrl.pop();
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

  initMap(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    // var center = {lat: business2.lat, lng: business2.lng};
    // console.log(center.lat(), center.lng())
    var map = new google.maps.Map(document.getElementById('mapView'), {
      center: center,
      zoom: 9
    });

    var marker = new google.maps.Marker({
      position: center,
      map: map,
    });

  }

}
