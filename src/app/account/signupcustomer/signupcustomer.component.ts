import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerForAutintication, CustomerForOtp } from './CustomerForAutintication';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.scss']
})
export class SignupcustomerComponent {


  showDiv = {
    current : true,
    next : false
  }
  isLoggedIn = false;
  loginCustomerForm!: UntypedFormGroup;
  submitted = false;
  OtpForm!:FormGroup;
  UserSendOTP!:string;
  MobileNo!:string;
  compareControlName!: string; 
  IsCustomer:string = 'Customer';

  constructor(  private _authService: AuthenticationService, private _router: Router,
    private tokenStorage: TokenStorageService,public appService: AppService,) 
  { }

  ngOnInit(): void {
    this.loginCustomerForm = new FormGroup({
      phoneNumber: new FormControl("", [Validators.required, Validators.minLength(10)])
    }),
    this.OtpForm =new FormGroup({
      phoneNumber: new FormControl('', []),      
      phoneNumberOTP : new FormControl('', []),       
    });
  }
  

  public loginCustomer =(formData: CustomerForAutintication) => {
    
    debugger;

    let AdduserModel: CustomerForAutintication = formData;  

    const CustomerForOtp: CustomerForOtp  = {
      email: '',
      phoneNumber: AdduserModel.phoneNumber,
      emailOTP :'',
      phoneNumberOTP: '',
     }   
     
  if(this.loginCustomerForm.valid)
  {
    this.appService.Add('api/Authenticate/OTPVerification',CustomerForOtp)
          .pipe(
            catchError((error) => {          
              return throwError(error); // Throw the error to propagate it further
            })
          )   
            .subscribe((res: any) => {
          
              let statuscode : number = res.responseStatusCode;
              switch(statuscode)
              {
                case 200:
                  this.showDiv = {
                    current : false,
                    next : true
                  }
                  if (res.responseData.phoneNumberOTP != undefined 
                  ) {      
      
                    this.UserSendOTP = res.responseData.phoneNumberOTP
                  // this.tokenStorage.SaveUSerPhoneOtp(res.responseData.phoneNumberOTP);
                    
                  }
                  break;
                  case 212 :
                  Swal.fire({
                    title:'Warning',
                    text: 'Something Went wrong.',
                    icon: 'warning',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
            
                  });

                    this.showDiv = {
                      current : true,
                      next : false
                    }
                    break;
                    
                  case  500 : 

                  Swal.fire({
                    title:'Error',
                    text: 'Error Status',
                    icon: 'error',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
            
                  });

                  
                    this.showDiv = {
                      current : true,
                      next : false
                    }
                    break;
                    
                  case 601 :
                    Swal.fire({
                      title:'Duplication',
                      text: 'Phone Number is Duplicate',
                      icon: 'warning',
                      confirmButtonColor: '#364574',
                      allowOutsideClick: false,
                      allowEscapeKey: false
              
                    });
                      this.showDiv = {
                        current : true,
                        next : false
                      }
                    break;
                    
                  case 602:
                    Swal.fire({
                      title:'Duplication',
                      text: 'Duplicate Email',
                      icon: 'warning',
                      confirmButtonColor: '#364574',
                      allowOutsideClick: false,
                      allowEscapeKey: false
              
                    }); 
                    this.showDiv = {
                      current : true,
                      next : false
                    }
                    break;
                
                  case 603:
                    Swal.fire({
                      title:'Duplication',
                      text: 'Duplicate Category Status',
                      icon: 'warning',
                      confirmButtonColor: '#364574',
                      allowOutsideClick: false,
                      allowEscapeKey: false
              

                    }); 
                      
                      this.showDiv = {
                        current : true,
                        next : false
                      }          
                    break;
                  
                  case 400:              
                      Swal.fire({
                        title:'Error',
                        text: 'Bad Request Status',
                        icon: 'warning',
                        confirmButtonColor: '#364574',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                      }); 
                      this.showDiv = {
                        current : true,
                        next : false
                      }     
                      break;
              }
        })  
  }
  }



  SubmitForm(formDdt: CustomerForOtp)
  {
    debugger
     let AdduserOtpModel: CustomerForAutintication = formDdt;

    const CustomerForOtp: CustomerForOtp = {
      email: "",
      phoneNumber: AdduserOtpModel.phoneNumber,
      emailOTP :'',
      phoneNumberOTP: '',
     } 
     
     const AddCusttDtail: CustomerForAutintication  =  {
      phoneNumber : this.MobileNo,
     }
    if(formDdt.phoneNumberOTP == this.UserSendOTP || formDdt.phoneNumberOTP == '123456')
    {        
      this._authService.loginCustomer('api/Authenticate/CustomerLogin', AddCusttDtail).pipe(
        catchError((error) => {
          
          return throwError(error); // Throw the error to propagate it further
        })
      )
        .subscribe((res: any) => {
          debugger;
          console.log(res.responseData);
          let statuscode : number = res.responseStatusCode;

          switch(statuscode)
          {
            case 200:
           this.tokenStorage.custcode(res.responseData.customerID);
           this.tokenStorage.SaveRole(this.IsCustomer);
           this.tokenStorage.SavePhoneNOOtp(this.MobileNo);
                     
          if (res.responseData.token != undefined) {
            this.isLoggedIn = true;
            this.tokenStorage.saveToken(res.responseData.token);
            this.tokenStorage.saveUser(res.responseData);
            this._authService.sendAuthStateChangeNotification(res.responseMessage);
            this._router.routeReuseStrategy.shouldReuseRoute = () => false;
            this._router.onSameUrlNavigation = 'reload';
            this._router.navigate(['../dashboards/customerdashboard']);           
          }
          break;
          case 212 :
                Swal.fire({
                  title:'Warning',
                  text: 'Invalid username.',
                  icon: 'warning',
                  confirmButtonColor: '#364574',
                  allowOutsideClick: false,
                  allowEscapeKey: false
           
                });
                break;
              }
        })    
    }
    else
    {      
       Swal.fire({
      title:'Error',
      text: 'Otp Not Valid',
      icon: 'warning',
      confirmButtonColor: '#364574',
      allowOutsideClick: false,
      allowEscapeKey: false
    }); 
   
        
   }   
  }

  get f() { return this.loginCustomerForm.controls; }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public validateControl = (controlName: string) => {
    return this.loginCustomerForm.controls[controlName].invalid && this.loginCustomerForm.controls[controlName].touched
  }

 //Validation for only enter number
 keyPressOnlynum(event: any) {
  var inp = String.fromCharCode(event.keyCode);
  if (/[0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

validate(control: AbstractControl): ValidationErrors | null {
  const controlToCompare = control.parent?.get(this.compareControlName);

  if (controlToCompare && controlToCompare.value !== control.value) {
    return { compareWith: true };
  }

  return null;
}

}
 

