import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})

export class ForgotpasswordComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private _authService: AuthenticationService, public formBuilder: FormBuilder, public _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
    }, {});
  }

  public forgotUser(email: any): void {
    if (this.loginForm.valid) {
      this._authService.forgotUser(`api/User/ForgetPassword?email=${this.loginForm.value.email}`, {}).subscribe((response: any) => {
        const parsedResponse = JSON.parse(response);
        const massage = parsedResponse.message;
        if (massage == "Email not found. Plese check.") {
          this.warningmsg();
        }
        else if (massage == "You have sent link on your email Please check.") {
          this.successmsg()
          this._router.navigate(['/auth/login']);
        }
      });
    }
  }

  warningmsg() {
    Swal.fire({
      title: 'Warning',
      text: 'Please Enter Registered Email',
      icon: 'warning',
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  successmsg() {
    Swal.fire({
      title: 'Password Request Send Successfully',
      icon: 'success',
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
}
