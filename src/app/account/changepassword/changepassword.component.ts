import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
    // Login passresetForm
       passresetForm!: UntypedFormGroup;
       submitted = false;
       passwordField!: boolean;
       confirmField!: boolean;
       error = '';
       returnUrl!: string;
       // set the current year
       year: number = new Date().getFullYear();

       /**
   * Password Hide/Show
   */
      togglepasswordField() {
        this.passwordField = !this.passwordField;
      }
  
      /**
     * Password Hide/Show
     */
      toggleconfirmField() {
        this.confirmField = !this.confirmField;
      }
}
