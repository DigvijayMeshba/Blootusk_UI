import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ToastService } from './toast-service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserForAuthenticationDto } from './UserForAuthenticationDto.model';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  isLoggedIn = false;
  userId: string | any;
  toggle: boolean = true;
  user: any;
  public roleId: any;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  emailExistsError: string | null = null;

  year: number = new Date().getFullYear();

  constructor(private router: Router, private tokenStorage: TokenStorageService,
    private _authService: AuthenticationService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roleId = this.tokenStorage.getUser().roleId;
      this.userId = this.tokenStorage.getUser().userId;
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue: any) => {
    debugger
    this.submitted = true;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      username: login.email,
      password: login.password,
      deviceID: login.deviceID,
      deviceOS: login.deviceOS,
    }

    if (this.loginForm.valid) { 
      console.log('test',userForAuth);
      this._authService.loginUser('api/Authenticate/AdminLogin', userForAuth).pipe(
        catchError((error) => {
          this.warningmsg();
          return throwError(error); // Throw the error to propagate it further
        })
      )
        .subscribe((res: any) => {
          debugger;
          console.log('token data==',res)
          //status code
          
          if (res.responseData.token != undefined) {
            this.tokenStorage.saveToken(res.responseData.token);
            this.tokenStorage.saveUser(res.responseData);
            this.isLoggedIn = true;
            this._authService.sendAuthStateChangeNotification(res.responseMessage);
            this._router.routeReuseStrategy.shouldReuseRoute = () => false;
            this._router.onSameUrlNavigation = 'reload';
            
            this.router.navigate(['../dashboards/dashboard']);
          
            // if (res.roleId != undefined) {
            //   // if (res.roleId == 1) {
            // //   }
            // // else  if (res.roleId == 2) {
            // //   this.warningManager();
            // //   }
            // // else  if (res.roleId == 3) {
            // //   this.warningUser();
            // //   }
            // }
          }

          else
            this.warningmsg();
        }
        )
    }
  }

  warningUser() {
    Swal.fire({
      title: 'Warning',
      text: 'User Dashboard Currently Not Available',
      icon: 'warning',
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
  warningManager() {
    Swal.fire({
      title: 'Warning',
      text: 'Manager Dashboard Currently Not Available',
      icon: 'warning',
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  warningmsg() {
    Swal.fire({
      title: 'Warning',
      text: 'Please Enter Valid Login Credentials',
      icon: 'warning',
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
}
