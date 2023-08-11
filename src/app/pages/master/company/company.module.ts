import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';

import { CompanyaddeditComponent } from './companyaddedit/companyaddedit.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { AppService } from 'src/app/app.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// import { SweetalertsComponent } from '../../advance-ui/sweetalerts/sweetalerts.component';
import { ChangeDetectorRef } from '@angular/core';
import { FlatpickrModule } from 'angularx-flatpickr';


const routes: Routes = [
  { path: "companylist", component: CompanylistComponent },
  { path: "companyaddedit", component: CompanyaddeditComponent },
  { path: "companyaddedit/:id", component: CompanyaddeditComponent }
]

@NgModule({
  declarations: [
    // SweetalertsComponent,
    CompanyaddeditComponent,
    CompanylistComponent
  ],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    FlatpickrModule
  ],
  exports: [RouterModule],
  providers: [AppService],
})
export class CompanyModule { }
