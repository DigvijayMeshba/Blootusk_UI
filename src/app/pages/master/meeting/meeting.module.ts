import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';

import { AppService } from 'src/app/app.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// import { SweetalertsComponent } from '../../advance-ui/sweetalerts/sweetalerts.component';
import { ChangeDetectorRef } from '@angular/core';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';

import { MeetingaddComponent } from './meetingadd/meetingadd.component';
import { MeetinglistComponent } from './meetinglist/meetinglist.component';
import { MeetingeditComponent } from './meetingedit/meetingedit.component';

const routes: Routes = [
  { path: "meetinglist", component: MeetinglistComponent },
  { path: "meetingadd", component: MeetingaddComponent },
  { path: "meetingedit", component: MeetingeditComponent },
]

@NgModule({
  declarations: [
    MeetingaddComponent,
    MeetinglistComponent,
    MeetingeditComponent
  ],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    FlatpickrModule,
    NgSelectModule
  ],
  exports: [RouterModule],
  providers: [AppService],
})
export class MeetingModule { }
