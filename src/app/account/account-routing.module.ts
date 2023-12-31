import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { LoginComponent } from "./login/login.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { SignupmerchantComponent } from "./signupmerchant/signupmerchant.component";
import { SignupuserComponent } from "./signupuser/signupuser.component";
import { OptverifyComponent } from "./optverify/optverify.component";

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "forgotpassword",
    component: ForgotpasswordComponent
  },

  {
    path: "changepassword",
    component: ChangepasswordComponent
  },

  {
    path: "otpverify",
    component: OptverifyComponent
  },

  {
    path: "signupmerchant",
    component: SignupmerchantComponent
  },

  {
    path: "signupuser",
    component: SignupuserComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
