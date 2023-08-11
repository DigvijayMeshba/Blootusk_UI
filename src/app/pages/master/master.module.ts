import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'meeting', loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule)},
]

@NgModule({
  declarations: [],
  imports: [
    ArchwizardModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class MasterModule { }
