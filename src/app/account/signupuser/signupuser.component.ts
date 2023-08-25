import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { catchError, throwError } from 'rxjs';
import { Signupuser, UserForOtp } from './signupuser';



@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrls: ['./signupuser.component.scss']
})
export class SignupuserComponent {
  
  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

  showDiv = {
    current : true, 
    next : false
  }
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;
    CatagoryList: any[] = []; 
     StateList: any[] = [];
     CountryList: any[] = [];    
     selectedCategoryId!:number;
    selectedCountryId!:number;
    selectedStateId!:number;  
    fieldTextType1!: boolean;
    fieldTextType2!: boolean;   
    submitted = false; 
    compareControlName!: string;  
    
  
    toggleFieldTextType1() {
      this.fieldTextType1 = !this.fieldTextType1;
    }
  
    toggleFieldTextType2() {
      this.fieldTextType2 = !this.fieldTextType2;
    }
  
    SignupForm!: UntypedFormGroup;
    uploadForm!:FormGroup;  
    Otporm!:FormGroup;
    isLoggedIn = false;   
    merchantCode :any;
    public roleId: any;
    prvopt :any;
    prvemailopt:any;
    captchaResponse!: string;
    merchantName!:string;
    isCaptchaVerified = false;
  
    constructor(public formBuilder: FormBuilder,public appService: AppService,
      private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
      private router: Router)
     {
        
     }
  
     ngOnInit(): void {
      this.merchantCode = this.route.snapshot.params['id'];
      this.GetMerchantName(this.merchantCode);


       let addUserDeatil = this.tokenStorage.getUser();
      this.uploadForm = new FormGroup({       
        merchantCode: new FormControl('', []),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
        isPhoneNumberValidate:new FormControl('', []),
        merchantID: new FormControl('', []),
        referCode : new FormControl('', []),
        referBy: new FormControl('', []),
        rewardPoint: new FormControl('', []),
        recStatus: new FormControl('', []),
        approvalStatus: new FormControl('', []),
         
      }),
      this.Otporm =new FormGroup({
        phoneNumber: new FormControl('', []),
        emailOTP: new FormControl('', []),
        phoneNumberOTP : new FormControl('', []),
         email: new FormControl('', []),
      });
  
     if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roleId = this.tokenStorage.getUser().roleId;      
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
    }
  }
    
    get f() { return this.uploadForm.controls; }
  
    GetMerchantName(merchantCode:any)
    {
      debugger
      this.appService.getById("api/Merchant/GetMarchantByCode/",merchantCode).subscribe(data => {
        console.log(data);
       this.merchantName = data.responseData.organizationName;
      });
    }
  
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
    validate(control: AbstractControl): ValidationErrors | null {
      const controlToCompare = control.parent?.get(this.compareControlName);
  
      if (controlToCompare && controlToCompare.value !== control.value) {
        return { compareWith: true };
      }
  
      return null;
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
    }
    onCaptchaVerificationSuccess() {
      this.isCaptchaVerified = true;
    }
    //create new user
    public createUser(formData: Signupuser) {

      if (this.isCaptchaVerified) {
        // Perform signup form submission
        console.log('Form submitted successfully!');
      } else {
        console.log('CAPTCHA verification failed');
      }
      let AdduserModel: Signupuser = formData;  
  
      const userForOtp: UserForOtp = {
        email: "",
        phoneNumber: AdduserModel.phoneNumber,
        emailOTP :'',
        phoneNumberOTP: '',
       }   
        this.tokenStorage.Merchantdata(AdduserModel);
  
        if(this.uploadForm.valid)
        {
        this.appService.Add('api/User/UserVerification',userForOtp)
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
    
                  this.tokenStorage.SaveUSerPhoneOtp(res.responseData.phoneNumberOTP);
                  
                }
                break;
                case 212 :
                  alert("Something Went wrong");
                  this.showDiv = {
                    current : true,
                    next : false
                  }
                  break;
                  
                case  500 : 
                  alert("Error Status ")
                  this.showDiv = {
                    current : true,
                    next : false
                  }
                  break;
                  
                case 601 :
                    alert("Phone Number is Duplicate")
                    this.showDiv = {
                      current : true,
                      next : false
                    }
                  break;
                  
                case 602:
                  alert("Duplicate Email")
                  this.showDiv = {
                    current : true,
                    next : false
                  }
                  break;
               
                case 603:
                    alert("Duplicate Category Status ")  
                    this.showDiv = {
                      current : true,
                      next : false
                    }          
                  break;
                
                case 400:              
                    alert("Bad Request Status")  
                    this.showDiv = {
                      current : true,
                      next : false
                    }     
                    break;
    
            }
          
       })    
      }  
    } 
  
    SubmitForm(formDdt: UserForOtp)
    {

    
      debugger;
      let AdduserOtpModel: UserForOtp = formDdt;
      let addUserDeatil = this.tokenStorage.getUser();   
      let AddUsertDtail=   this.tokenStorage.getMerchant();   
     
      AddUsertDtail.merchantCode = this.merchantCode;
       AddUsertDtail.isPhoneNumberValidate = 0;
      AddUsertDtail.createdBy = 0;
      AddUsertDtail.modifyBy = 0;
      AddUsertDtail.createdDate = new Date();
      AddUsertDtail.modifyDate = new Date();
       AddUsertDtail.merchantID = 28;
      // AddUsertDtail.referCode ="";
       AddUsertDtail.referBy=0;
       AddUsertDtail.rewardPoint=0;
      AddUsertDtail.customerID=0;
      AddUsertDtail.customerCode ="";
      // AddUsertDtail.recStatus ="";
      // AddUsertDtail.approvalStatus=""
       AddUsertDtail.stopMessage =0;
      //stopMessage
    
      
      this.prvopt = this.tokenStorage.getUserPhoneNoOtp();
      
      if(formDdt.phoneNumberOTP == this.prvopt )
      {      
         console.log(AddUsertDtail);
        this.appService.Add('api/User/AddCustomer', AddUsertDtail).subscribe((data: any) => {
          let statuscode : number = data.responseStatusCode;
          switch(statuscode)
          {
            case 200:
              alert("User Added Successfully.")
             
              this.router.navigate(['/dashboards/dashboard'], { relativeTo: this.route });
   
              break;
              case 212 :
                alert("Something Went wrong");
                break;                
              case  500 : 
                alert("Error Status ")
                break;
                
              case 601 :
                  alert("Phone Number is Duplicate")
                break;
                
              case 602:
                alert("Duplicate Email")
                break;
             
              case 603:
                  alert("Duplicate Category Status ")            
                break;
              
              case 400:              
                  alert("Bad Request Status")       
                  break;
  
          }
              
        },);
      }
      else
      {     
          alert("Otp Not Valid")      
      }   
    }
  }
