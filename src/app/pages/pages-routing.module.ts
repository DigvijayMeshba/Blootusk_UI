import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Link Routing Pages
import { AdmindashboardComponent } from "./dashboards/admindashboard/admindashboard.component";

import { MerchantlistComponent } from "./merchant/merchantlist/merchantlist.component"
import { MerchantaddComponent } from "./merchant/merchantadd/merchantadd.component"
import { MerchanteditComponent } from "./merchant/merchantedit/merchantedit.component"

import { MessageaddComponent } from "./merchant/messageadd/messageadd.component"
import { MessageeditComponent } from "./merchant/messageedit/messageedit.component"

import { BusinesscategorylistComponent } from "./businesscategory/businesscategorylist/businesscategorylist.component"
import { BusinesscategoryaddComponent } from "./businesscategory/businesscategoryadd/businesscategoryadd.component"
import { BusinesscategoryeditComponent } from "./businesscategory/businesscategoryedit/businesscategoryedit.component"
import { CustomerdashboardComponent } from './dashboards/customerdashboard/customerdashboard.component';
import { ReferrallistComponent } from './customer/referrallist/referrallist.component';

const routes: Routes = [

  { path: "dashboards/dashboard",component: AdmindashboardComponent },
  { path: "dashboards/cdashboard",component: CustomerdashboardComponent },

  { path: "merchant/merchantlist",component: MerchantlistComponent },
  { path: "merchant/merchantadd",component: MerchantaddComponent },
  { path: "merchant/merchantedit/:id",component: MerchanteditComponent },

  { path: "merchant/messageadd/:id",component: MessageaddComponent },
  { path: "merchant/messageedit/:id",component: MessageeditComponent },

  { path: "businesscategory/businesscategorylist",component: BusinesscategorylistComponent },
  { path: "businesscategory/businesscategoryadd",component: BusinesscategoryaddComponent },
  { path: "businesscategory/businesscategoryedit/:id",component: BusinesscategoryeditComponent },
  {path:"customer/referrallist",component:ReferrallistComponent},

  {
    path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule)
  },  
  {
    path: 'merchant', loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)
  }, 
  {
    path: 'businesscategory', loadChildren: () => import('./businesscategory/businesscategory.module').then(m => m.BusinesscategoryModule)
  }, 
  {
    path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
