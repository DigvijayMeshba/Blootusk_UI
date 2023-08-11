import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { MerchantlistComponent } from './merchantlist/merchantlist.component';
import { MerchantaddComponent } from './merchantadd/merchantadd.component';
import { MerchanteditComponent } from './merchantedit/merchantedit.component';



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
  ],
  exports: [RouterModule]
})
export class MerchantModule { }
