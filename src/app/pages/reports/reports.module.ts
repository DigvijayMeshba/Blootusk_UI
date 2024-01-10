import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MerchantstatementComponent } from './merchantstatement/merchantstatement.component';
import { CustomerstatementComponent } from './customerstatement/customerstatement.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';


const routes: Routes = [
  { path: "merchantstatement", component: MerchantstatementComponent },
  { path: "customerstatement", component: CustomerstatementComponent },
]

@NgModule({
  declarations: [
    MerchantstatementComponent,
    CustomerstatementComponent
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
    NgbModule,
    CKEditorModule,
  ],
  exports: [RouterModule]
})
export class ReportsModule { }
