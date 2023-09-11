import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
//Wizard
import { ArchwizardModule } from 'angular-archwizard';
// Load Icons
import { defineElement  } from 'lord-icon-element';
import lottie from 'lottie-web';

import { ToastsContainer } from './login/toasts-container.component';


import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SignupuserComponent } from './signupuser/signupuser.component';
import { SignupmerchantComponent } from './signupmerchant/signupmerchant.component';
import { OptverifyComponent } from './optverify/optverify.component';

import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';



@NgModule({
  declarations: [
    LoginComponent,
    ToastsContainer,
    ChangepasswordComponent,
    SignupuserComponent,
    SignupmerchantComponent,
    OptverifyComponent,
    ImageCaptchaComponent,
    SignupcustomerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
    CommonModule,
    NgSelectModule,
    NgbNavModule,
    ArchwizardModule,
    SharedModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { 
  constructor() {
    defineElement (lottie.loadAnimation);
  }
}
