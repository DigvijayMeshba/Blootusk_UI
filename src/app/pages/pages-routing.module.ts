import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Link Routing Pages
import { AdmindashboardComponent } from "./dashboards/admindashboard/admindashboard.component";

import { MerchantlistComponent } from "./merchant/merchantlist/merchantlist.component"
import { MerchantaddComponent } from "./merchant/merchantadd/merchantadd.component"
import { MerchanteditComponent } from "./merchant/merchantedit/merchantedit.component"

import { BusinesscategorylistComponent } from "./businesscategory/businesscategorylist/businesscategorylist.component"
import { BusinesscategoryaddComponent } from "./businesscategory/businesscategoryadd/businesscategoryadd.component"
import { BusinesscategoryeditComponent } from "./businesscategory/businesscategoryedit/businesscategoryedit.component"

const routes: Routes = [

  { path: "dashboards/dashboard",component: AdmindashboardComponent },

  { path: "merchant/merchantlist",component: MerchantlistComponent },
  { path: "merchant/merchantadd",component: MerchantaddComponent },
  { path: "merchant/merchantedit",component: MerchanteditComponent },

  { path: "businesscategory/businesscategorylist",component: BusinesscategorylistComponent },
  { path: "businesscategory/businesscategoryadd",component: BusinesscategoryaddComponent },
  { path: "businesscategory/businesscategoryedit",component: BusinesscategoryeditComponent },

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
