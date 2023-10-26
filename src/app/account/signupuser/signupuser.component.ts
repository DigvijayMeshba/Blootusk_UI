import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { catchError, throwError } from 'rxjs';
import { AddCustomer, Signupuser, UserForOtp } from './signupuser';
import Swal from 'sweetalert2';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';



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
    generatedText!: string;
    userText!: string;
    isVerified = false;
    CustName!:string;
    MobileNo!:string;

    isSubmitBtnDisabled: boolean= true;
    
  
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
    merchantId!:number;
    customerName!:string;
    customerId!:number;
    isCaptchaVerified = false;
    UserSendOTP!:string;
    CustomerCode!:any;
  
    constructor(public formBuilder: FormBuilder,public appService: AppService,
      private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
      private router: Router,private EncrDecr: EncrDecrServiceService)
     {

      let ecodeMerchantCode = this.route.snapshot.params['id'];    
      let dcodeMerchantCode = atob(ecodeMerchantCode); 
      let dryptedmerchantcode = this.EncrDecr.get('12$#@BLOO$^@TUSK', dcodeMerchantCode)
      //if condition use for a referal singup
      if(dryptedmerchantcode.length > 8)
      {
        let SplitCode = dryptedmerchantcode.split("C");
        this.merchantCode = SplitCode[0];
        this.CustomerCode = 'C'+SplitCode[1];

      //   this.merchantCode = this.EncrDecr.set('12$#@BLOO$^@TUSK', this.merchantCode);
         this.merchantCode = btoa(this.merchantCode)
   
      }
       //if condition use for a QR singup     
      else
      {
        this.merchantCode = btoa(dryptedmerchantcode)
     //   this.merchantCode = this.EncrDecr.set('12$#@BLOO$^@TUSK', dryptedmerchantcode)
      }
      this.GetMerchantName(this.merchantCode);
      this.GetCustomerName(this.CustomerCode)
     }
  
     ngOnInit(): void {
      //this.isSubmitBtnDisabled = false;
  
      
      this.generateCaptcha();
       let addUserDeatil = this.tokenStorage.getUser();
      this.uploadForm = new FormGroup({       
        merchantCode: new FormControl('', []),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phoneNumber: new FormControl('', []),
        isPhoneNumberValidate:new FormControl('', []),
        merchantID: new FormControl('', []),
        referCode : new FormControl('', []),
        referBy: new FormControl('', []),
        rewardPoint: new FormControl('', []),
        recStatus: new FormControl('', []),
        approvalStatus: new FormControl('', []),
        usertext : new FormControl('', []),
         
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
      this.appService.getById("api/Merchant/GetMarchantByCode/",merchantCode).subscribe(data => {
      
       this.merchantName = data.responseData.organizationName;
       this.merchantId = data.responseData.merchantID;
      });
    }


    GetCustomerName(customerCode:any)
    {
      debugger;
      this.appService.getById("api/User/GetCustomerByCOde/",this.CustomerCode).subscribe(data => {
      console.log('custdata', data.responseData)
       this.customerName = data.responseData.phoneNumber;
       this.customerId = data.responseData.customerID;
      
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
      debugger;

      let AdduserModel: Signupuser = formData;  
  
      const userForOtp: UserForOtp = {
        email: '',
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
          console.log(res.responseData)
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
  
    SubmitForm(formDdt: Signupuser)
    {
debugger;
    let refer;
      debugger;
      let AdduserOtpModel: Signupuser = formDdt;

      // const userForOtp: UserForOtp = {
      //   email: "",
      //   phoneNumber: AdduserOtpModel.phoneNumber,
      //   emailOTP :'',
      //   phoneNumberOTP: '',
      //  } 
       if(this.CustomerCode != null)
       {
        refer = this.customerId;
       }
       else{
        refer = 0;
       }

      //let addUserDeatil = this.tokenStorage.getUser();   
      const  AddUsertDtail: AddCustomer  =  {
      
        
        merchantID:this.merchantId,
        name :"",
        phoneNumber:this.MobileNo,
        merchantCode: this.merchantCode,
        isPhoneNumberValidate:0,
        createdBy:0,
        modifyBy:0,      
        createdDate : new Date(),
        modifyDate :new Date(),        
        referBy:refer,
        rewardPoint:0,
        customerID:0,
        customerCode :"",       
        stopMessage :0, 
        referCode: '',
        approvalStatus: '',
        recStatus: '',  
        MerchantName : "",
      }  
     
      // if(formDdt.phoneNumberOTP == this.UserSendOTP || formDdt.phoneNumberOTP == '123456')
      // {      
         console.log(AddUsertDtail);
        this.appService.Add('api/User/AddCustomer', AddUsertDtail).subscribe((data: any) => {
          let statuscode : number = data.responseStatusCode;
        console.log('adddata',data.responseData)
          switch(statuscode)
          {
                case 200:
            
              Swal.fire({
                title:'Success',
                text: 'User Added Successfully.',
                icon: 'success',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
               
              }).then(function() {
  
              location.reload();
            });
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
                  break;
                case  500 : 

                Swal.fire({
                  title:'Warning',
                  text: 'Customer is added but We are Unable to send Messages',
                  icon: 'error',
                  confirmButtonColor: '#364574',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });    
                  break;
                case 601 :
                  Swal.fire({
                    title:'Duplication',
                    text: 'Mobile Number is Duplicate',
                    icon: 'warning',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  });
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
                  break;
                case 603:
                  Swal.fire({
                    title:'Duplication',
                    text: 'Merchant Not Save RewardPoint or Message Template ',
                    icon: 'warning',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  });                     
                           
                  break;
                case 400:              
                    Swal.fire({
                      title:'Error',
                      text: 'Bad Request Status',
                      icon: 'error',
                      confirmButtonColor: '#364574',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    }); 
          }   
        },);
      // }
      // else
      // {      
        //  Swal.fire({
        // title:'Error',
        // text: 'Otp Not Valid',
        // icon: 'warning',
        // confirmButtonColor: '#364574',
        // allowOutsideClick: false,
        // allowEscapeKey: false
     // }); 
     
          
     // }   
    }


    generateCaptcha() 
    {
      debugger;
      const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const captchaLength = 6; // Length of the generated CAPTCHA text
      let captcha = '';
  
      for (let i = 0; i < captchaLength; i++) {
        captcha += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      }
  
      this.generatedText = captcha;

      this.isVerified = false;
    }
  
    capchatext : any;
    verifyCaptcha() {
debugger;
      if (this.userText.toLowerCase() === this.generatedText.toLowerCase()) {
  
        this.capchatext ="CAPTCHA verification successful.",
        this.isVerified = true;
        this.isSubmitBtnDisabled = false;
  
      }
       else {
        this.generateCaptcha();
        this.capchatext ="CAPTCHA verification failed."
        
      }
    }
  }
