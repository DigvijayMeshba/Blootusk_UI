import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgApexchartsModule } from 'ng-apexcharts';

import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';

const routes: Routes = [
  { path: "admindashboard", component: AdmindashboardComponent },
  { path: "customerdashboard", component: CustomerdashboardComponent },
]

@NgModule({
  declarations: [
    AdmindashboardComponent,
    CustomerdashboardComponent,
  ],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    SharedModule,
    NgbModule,
    NgApexchartsModule,
  ],
  exports: [RouterModule],
})
export class DashboardsModule { }
