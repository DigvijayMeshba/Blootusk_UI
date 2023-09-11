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

const routes: Routes = [
  { path: "referrallist", component: ReferrallistComponent },
]


@NgModule({
  declarations: [
    ReferrallistComponent
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
