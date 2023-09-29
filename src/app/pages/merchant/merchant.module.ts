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

import { MerchantlistComponent } from './merchantlist/merchantlist.component';
import { MerchantaddComponent } from './merchantadd/merchantadd.component';
import { MerchanteditComponent } from './merchantedit/merchantedit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MessageaddComponent } from './messageadd/messageadd.component';
import { MessageeditComponent } from './messageedit/messageedit.component';
import { RewardaddComponent } from './rewardadd/rewardadd.component';
import { RewardeditComponent } from './rewardedit/rewardedit.component';



const routes: Routes = [
  { path: "merchantlist", component: MerchantlistComponent },
  { path: "merchantedit", component: MerchanteditComponent },
  //  { path: "merchantaddedit/:id", component: MerchanteditComponent } 
  { path: "messageadd", component: MessageaddComponent },
  { path: "messageedit", component: MessageeditComponent },
  { path: "rewardadd", component: RewardaddComponent },
  { path: "rewardedit", component: RewardeditComponent },

]


@NgModule({
  declarations: [
    MerchantlistComponent,
    MerchantaddComponent,
    MerchanteditComponent,
    MessageaddComponent,
    MessageeditComponent,
    RewardaddComponent,
    RewardeditComponent,
    
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
export class MerchantModule { }
