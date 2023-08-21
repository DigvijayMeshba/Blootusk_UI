import { Component } from '@angular/core';
import { UserForOtp, signupMerchant } from '../signupmerchant/signupMerchant';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { catchError, throwError } from 'rxjs';

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

    CatagoryList: any[] = []; 
     StateList: any[] = [];
     CountryList: any[] = [];    
     selectedCategoryId!:number;
    selectedCountryId!:number;
    selectedStateId!:number;  
    fieldTextType1!: boolean;
    fieldTextType2!: boolean;   
    submitted = false;
    merchantId: string | any;    
    compareControlName!: string;  
    
  
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
    merchantCode :any;
    public roleId: any;
    prvopt :any;
    prvemailopt:any;
  
    constructor(public formBuilder: FormBuilder,public appService: AppService,
      private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
      private router: Router,)
     {
        
     }
  
     ngOnInit(): void {
      // this.GetMerchantName(this.merchantCode);
       let addUserDeatil = this.tokenStorage.getUser();
      this.uploadForm = new FormGroup({       
        merchantCode: new FormControl('', []),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
        isPhoneNumberValidate:new FormControl('', []),
        
      }     
       
      );
  
     if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roleId = this.tokenStorage.getUser().roleId;
      this.userId = this.tokenStorage.getUser().userId;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
    }
      
    }
    
    get f() { return this.uploadForm.controls; }
  
    GetMerchantName(merchantCode:any)
    {
      debugger
      this.merchantCode = 'M1110002';
      this.appService.getById("api/Merchant/GetMarchantByCode/",merchantCode).subscribe(data => {
        console.log(data);
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
  
    //create new user
    public createUser(formData: signupMerchant) {
      debugger;
      let AdduserModel: signupMerchant = formData;  
  
      const userForOtp: UserForOtp = {
        email: AdduserModel.email,
        phoneNumber: AdduserModel.phoneNumber,
        emailOTP :'',
        phoneNumberOTP: '',
       }   
        this.tokenStorage.Merchantdata(AdduserModel);
  
        if(this.uploadForm.valid)
        {
        this.appService.Add('api/Merchant/SendOTP',userForOtp)
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
                if (res.responseData.phoneNumberOTP != undefined ||
                  res.responseData.emailOTP != undefined ) {      
    
                  this.tokenStorage.SavePhoneOtp(res.responseData.phoneNumberOTP);
                  this.tokenStorage.SaveEmailOtp(res.responseData.emailOTP);
                  
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
  
    SubmitForm(formData: UserForOtp)
    {
      let AdduserOtpModel: UserForOtp = formData;
      let addUserDeatil = this.tokenStorage.getUser();   
      let AddMerchantDtail=   this.tokenStorage.getMerchant();
      AddMerchantDtail.posInfo.posid = 0;
      AddMerchantDtail.posInfo.merchantId = 0;    
      AddMerchantDtail.isEmailValidate = 1;
      AddMerchantDtail.isPhoneNumberValidate = 1;
      AddMerchantDtail.createdBy = addUserDeatil.adminID;
      AddMerchantDtail.modifyBy = 0;
      AddMerchantDtail.createdDate = new Date();
      AddMerchantDtail.modifyDate = new Date();
      AddMerchantDtail.merchantId = 0;
      
      AddMerchantDtail.merchantCode="M1110002";
      this.prvopt = this.tokenStorage.getPhoneNOOtp();
      this.prvemailopt = this.tokenStorage.getEmailOtp();
  
      if(formData.phoneNumberOTP == this.prvopt || formData.emailOTP == this.prvemailopt)
      {      
         console.log(AddMerchantDtail);
        this.appService.Add('api/Merchant/AddMerchant', AddMerchantDtail).subscribe((data: any) => {
          let statuscode : number = data.responseStatusCode;
          switch(statuscode)
          {
            case 200:
              alert("SMerchant Added Successfully.")
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
