import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';

import { ReferrallistComponent } from './referrallist/referrallist.component';
import { RewardpointlistComponent } from './rewardpointlist/rewardpointlist.component';
import { DiscountcouponlistComponent } from './discountcouponlist/discountcouponlist.component';

const routes: Routes = [
  { path: "referrallist", component: ReferrallistComponent },
  { path: "rewardpointlist", component: RewardpointlistComponent },
  { path: "discountcouponlist", component: DiscountcouponlistComponent },
]


@NgModule({
  declarations: [
    ReferrallistComponent,
    RewardpointlistComponent,
    DiscountcouponlistComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgbNavModule,
    ArchwizardModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxPaginationModule,
    FormsModule,
    FlatpickrModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [RouterModule]
})
export class CustomerModule { }
