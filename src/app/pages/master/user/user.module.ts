import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';

import { UseraddeditComponent } from './useraddedit/useraddedit.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AppService } from 'src/app/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

const routes: Routes = [
  { path: "userlist", component: UserlistComponent },
  { path: "useraddedit", component: UseraddeditComponent } ,
  { path: "useraddedit/:id", component: UseraddeditComponent } 

]

@NgModule({
  declarations: [
    UseraddeditComponent,
    UserlistComponent
  ],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    FlatpickrModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [AppService],

})
export class UserModule { }
