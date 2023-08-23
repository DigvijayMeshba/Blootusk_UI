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
import { Observable, catchError, throwError } from 'rxjs';
import Validation from '../matchpassword.validator';



const MERCHANT_KEY = 'Merchant';
@Component({
  selector: 'app-signupmerchant',
  templateUrl: './signupmerchant.component.html',
  styleUrls: ['./signupmerchant.component.scss']
})
 

export class SignupmerchantComponent {
  CatagoryList: any[] = []; 
   StateList: any[] = [];
   CountryList: any[] = [];    
   selectedCategoryId!:number;
   selectedCountryId!:number;
   selectedStateId!:number;

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
  public roleId: any;
  prvopt :any;
  prvemailopt:any;

  constructor(public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,)
   {
      
   }

   ngOnInit(): void {
    debugger;

    let addUserDeatil = this.tokenStorage.getUser();
    console.log(addUserDeatil);
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();
    this.uploadForm = new FormGroup({
     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
     
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]), 
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
        phoneNumberOTP: new FormControl('',[]),   
        emailOTP : new FormControl('',[]),    
       posInfo : new FormGroup({
        posName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl('', [Validators.required]),
        posAddress: new FormControl('', [Validators.required, Validators.minLength(3)]),
        zip: new FormControl('', [Validators.required, Validators.minLength(3)]),
        stateId: new FormControl('', [Validators.required]),
        countryId: new FormControl('', [Validators.required]),
        countryName: new FormControl('', []),
        stateName: new FormControl('', []),
        categoryName: new FormControl('', []),
        posid:new FormControl('', []),
        merchantId:new FormControl('', []),
        poscode: new FormControl('', []),
        latitude: new FormControl('', []),
        longitude: new FormControl('', []),
       }),
      
    },
    
     { 
      validators: [Validation.match('password', 'confirmPassword')]
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

  getCatagoryList() {
    this.appService.GetAll("api/CategoryMaster/GetCategoryDDL").subscribe(
    (x: any) => {
      this.CatagoryList = x.responseData;
      console.log(x.responseData);
    });
  }
  
   GetCountryList() {
    this.appService.GetAll("api/Merchant/GetCountryDDL").subscribe(
      (x: any) => {
        this.CountryList = x.responseData;
        console.log(x.responseData);
      });
  }

   GetStateList()
  {
    this.appService.GetAll("api/Merchant/GetStateDDL").subscribe(
      (data:any) => {
      this.StateList = data.responseData;
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
    
  }

  //create new user
  public createMerchant(formData: signupMerchant) {
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
    
    AddMerchantDtail.stateName = ""? "":AddMerchantDtail.stateName,
    AddMerchantDtail.categoryName = ""? "":AddMerchantDtail.categoryName,
    AddMerchantDtail.countryName = ""? "":AddMerchantDtail.countryName,
   

    console.log(AddMerchantDtail);

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
            alert("Merchant Added Successfully.")
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

