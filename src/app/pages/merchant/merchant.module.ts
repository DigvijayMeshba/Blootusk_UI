import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { MerchantlistComponent } from './merchantlist/merchantlist.component';
import { MerchantaddComponent } from './merchantadd/merchantadd.component';
import { MerchanteditComponent } from './merchantedit/merchantedit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';


const routes: Routes = [
  { path: "merchantlist", component: MerchantlistComponent },
  { path: "merchantedit", component: MerchanteditComponent } ,
//  { path: "merchantaddedit/:id", component: MerchanteditComponent } 

]


@NgModule({
  declarations: [
    MerchantlistComponent,
    MerchantaddComponent,
    MerchanteditComponent
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
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class MerchantModule { }
