import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { ResetPassSuccessPage } from '../page-reset-pass-success/page-reset-pass-success';

import { Http }  from '@angular/http';
import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-reset-pass',
  templateUrl: 'page-reset-pass.html'
})

export class ResetPassPage {
  posts: {email: string} = {
    email : ''
  }

  constructor(
    public navCtrl: NavController,
    public http : Http) {
  }

  goBack() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  resetMe() {
    var getUser = this.posts.email,
      baseUrl = Config.baseUrl;

    if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
      $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
    }

    if (getUser) {
      this.http.post(baseUrl + 'api/users/sendemail',this.posts).subscribe(res => {
      $('.btn-green[type="submit"]').find('.fa-spinner').remove();

      this.navCtrl.setRoot(ResetPassSuccessPage, {}, {
        animate: true,
        direction: 'forward'
      });
      }, err => {
        $('.btn-green[type="submit"]').find('.fa-spinner').remove();

        $('.form-reset label').each(function() {
        var thisInput = $(this).find('input'),
          thisPlaceholder = thisInput.attr('placeholder');

          thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder + '. Are you sure you are registered?');
        });
      });
    } else {
      $('.btn-green[type="submit"]').find('.fa-spinner').remove();

      $('.form-reset label').each(function() {
        var thisInput = $(this).find('input'),
          thisPlaceholder = thisInput.attr('placeholder');

        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
      });
    }
  }
}
