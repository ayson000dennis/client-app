import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//database service
import { ApiService } from '../../../service/api.service.component';
import { UserFindDealsPage } from '../../page-user-find-deals/page-user-find-deals';

import * as $ from "jquery";

import Config from '../../../app/config';

@Component({
  selector: 'page-category-menu',
  templateUrl: 'page-category-menu.html'
})

export class CategoryMenuPage {
  pages: Array<{title: string, component: any}>;
    business_category : string[];
    business_filter_data: string[];
    hasData :boolean = false;
    private first_word = [];

    filtered_business_deals: any[];

  constructor(
    public navCtrl: NavController,
    private api: ApiService,
    public navParams: NavParams,
    ) {
  }

  ionViewWillEnter(){
    console.log('asdasdasdasdasd')
      this.api.BusinessCategory.business_category().then(business_category => {
        business_category.forEach(business => {
          console.log(business)
          let category = business.name;
          let cat = category.split(/[ ,]+/);
          this.first_word.push(cat[0].toLowerCase());
        });
        this.business_category = business_category;
        this.hasData = true;

        // business_category.forEach(business => {
        //   let category = business.name;
        //   let cat = category;
        //   this.category.push(cat);
        // });
        // this.category.forEach(cat => {
        //   this.business_category.push(cat);
        // });

        // this.first_word.forEach(first_word => {
        //   this.business_category.push(first_word);
        // });

      });

  }

  seeAll() {
    this.navCtrl.setRoot(UserFindDealsPage, { business_category: null }, {
      animate: true,
      direction: 'back'
    });
  }

  goFilterBusiness(business_cat){
    var input = this.navParams.get('user_input');

    this.api.Business.business_deals_category(input, business_cat).then(businesses => {
      console.log(businesses)
      this.navCtrl.setRoot(UserFindDealsPage, { user_input: input, filtered_business_deals: businesses.hits.hits, business_cat: business_cat }, {
        animate: true,
        direction: 'back'
      });
    });

  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

}
