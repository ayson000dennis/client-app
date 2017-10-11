import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import Config from '../../../app/config';

@Component({
  selector: 'page-sort-menu',
  templateUrl: 'page-sort-menu.html'
})

export class SortMenuPage {
  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController) {
  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }
}
