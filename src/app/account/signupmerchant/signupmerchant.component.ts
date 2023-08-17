import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { UserForOtp, signupMerchant } from './signupMerchant';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { data } from 'jquery';
import { catchError, throwError } from 'rxjs';


const MERCHANT_KEY = 'Merchant';
@Component({
  selector: 'app-signupmerchant',
  templateUrl: './signupmerchant.component.html',
  styleUrls: ['./signupmerchant.component.scss']
})
 

export class SignupmerchantComponent {
  fieldTextType1!: boolean;
  fieldTextType2!: boolean;
  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ]; 
  submitted = false;
  merchantId: string | any;
  showDiv = {
    current : true,
    next : false
  }
  

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  SignupForm!: UntypedFormGroup;
  uploadForm!:FormGroup;  
  isLoggedIn = false;
  userId: string | any;
  public roleId: any;
  prvopt :any;

  constructor(public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,)
   {
   
   
  }

   ngOnInit(): void {

    //this.merchantId = this.route.snapshot.params['id'];  
    this.uploadForm = new FormGroup({
     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        catagoryId: new FormControl('', []),
        posAddress: new FormControl('', []),
        zip: new FormControl('', []),
        state: new FormControl('', []),
        country: new FormControl('', []),
        posid:new FormControl('', []),
        merchantId:new FormControl('', []),
        poscode: new FormControl('', []),
        latitude: new FormControl('', []),
        longitude: new FormControl('', []),
       }),
         
      // remarkList: new FormGroup( {
      //     remarkID: new FormControl('', []),
      //     remark: new FormControl('', []),
      //   }),

        isPhoneNumberValidate:new FormControl('', []),
        isEmailValidate: new FormControl('', []),
        approvalStatus:new FormControl('', []),
        recStatus:new FormControl('', []),
        remark: new FormControl('', []),    
        deviceID: new FormControl('', []),
        deviceOS: new FormControl('', []),
        token: new FormControl('', []),
        createdBy: new FormControl('', []),
        createdDate: new FormControl('', []),
        modifyBy: new FormControl('', []),
        modifyDate: new FormControl('', []),
        otp: new FormControl('',[]),    
    });

   if (this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
    this.roleId = this.tokenStorage.getUser().roleId;
    this.userId = this.tokenStorage.getUser().userId;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
    
  }
  
  get f() { return this.uploadForm.controls; }

  
  public validateControl = (controlName: string) => {
    return this.uploadForm.controls[controlName].invalid && this.uploadForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.uploadForm.controls[controlName].hasError(errorName)
  }

  public getRoleMaster() {
    this.appService.GetAll("api/DropdownHelper/GetAllRoles").subscribe(data => {
      
    });
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  keyPressOnlyChar(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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

  public submit() {
   
    this.submitted = true;
    
    // if (userObject.userId == "") {
    //   this.createMerchant(userObject);
    // }      
   
  }
  
  successmsg() {
    Swal.fire({
      title: 'User Added Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  //create new user
  public createMerchant(formData: signupMerchant) {
    debugger;
    let AdduserModel: signupMerchant = formData;  

    const userForOtp: UserForOtp = {
      email: AdduserModel.email,
      phoneNumber: AdduserModel.phoneNumber,
      otp: '',
      isOTPSent: true
     
    }
    AdduserModel.merchantCode = "123";

      this.tokenStorage.Merchantdata(AdduserModel);
      
      this.showDiv = {
        current : false,
        next : true
      }
      this.appService.Add('api/Merchant/SendOTP',userForOtp)
      .pipe(
        catchError((error) => {          
          return throwError(error); // Throw the error to propagate it further
        })
      )   
        .subscribe((res: any) => {
          debugger;
          console.log('data',res)
          if (res.responseData.otp != undefined) {      

            this.tokenStorage.SaveOtp(res.responseData.otp);

          }
     }) 
     
  }   

  SubmitForm(formData: UserForOtp)
  {
    debugger;
    let AdduserOtpModel: UserForOtp = formData;

    let AddMerchantDtail=   this.tokenStorage.getMerchant();
    AddMerchantDtail.posInfo.posid = 0;
    AddMerchantDtail.posInfo.merchantId = 0;    
    AddMerchantDtail.isEmailValidate =true;
    AddMerchantDtail.isPhoneNumberValidate = true;

    AddMerchantDtail.merchantId = 0;
    this.prvopt = this.tokenStorage.getOtp();

    if(formData.otp == this.prvopt)
    {      
   console.log(AddMerchantDtail);
      this.appService.Add('api/Merchant/AddMerchant', AddMerchantDtail).subscribe((data: any) => {
        debugger
        console.log("dataaaaaaaaaaaaaa", data)
  
        if (data.message == "User Added Successfully.") {
          this.successmsg()
          this.router.navigate(['../userlist'], { relativeTo: this.route });
        }         
        else {
          alert("Something Went wrong")
        }
  
      },);

    }
    else{
     
        alert("Otp Not Valid")
      
    }

   
  }

}

