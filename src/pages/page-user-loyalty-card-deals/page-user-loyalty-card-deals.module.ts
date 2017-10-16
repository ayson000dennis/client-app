import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLoyaltyCardDealsPage } from './page-user-loyalty-card-deals';

@NgModule({
  declarations: [
    UserLoyaltyCardDealsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLoyaltyCardDealsPage),
  ],
})
export class UserLoyaltyCardDealsPageModule {}
