import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: "admindashboard", component: AdmindashboardComponent },
]

@NgModule({
  declarations: [
    AdmindashboardComponent,
  ],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    SharedModule,
    NgbModule
  ],
  exports: [RouterModule],
})
export class DashboardsModule { }
