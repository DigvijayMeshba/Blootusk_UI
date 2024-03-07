import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { data } from 'jquery';
import { catchError, throwError } from 'rxjs';
import { addMerchant } from '../merchant';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import Validation from 'src/app/account/matchpassword.validator';

@Component({
  selector: 'app-merchantadd',
  templateUrl: './merchantadd.component.html',
  styleUrls: ['./merchantadd.component.scss']
})

export class MerchantaddComponent {

  open: boolean = false;
  dismissible: boolean = true;
  timeout: number = 5000;

  public isVisibleSuccess: boolean = false;
  public isVisibleDanger: boolean = false;
  public isVisibleWarning: boolean = false;

  showSuccessAlert() : void {
    if (this.isVisibleSuccess) { 
      return;
    } 
    this.isVisibleSuccess = true;
    setTimeout(()=> this.isVisibleSuccess = false,5000)
  }

  showdangerAlert() : void {
    if (this.isVisibleDanger) { 
      return;
    } 
    this.isVisibleDanger = true;
    setTimeout(()=> this.isVisibleDanger = false,5000)
  }

  showWarningAlert() : void {
    if (this.isVisibleWarning) { 
      return;
    } 
    this.isVisibleWarning = true;
    setTimeout(()=> this.isVisibleWarning = false,5000)
  }


  StateLists: any[] = [];
  CatagoryLists: any[] = [];  
  CountryLists: any[] = []; 

  selectedCategoryId!:number;
  selectedCountryId!:number;
  selectedStateId!:number;
  messageContent!:string; 

  fieldTextType1!: boolean;
  
  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

   
  fieldTextType2!: boolean;
  submitted = false;
  merchantId: string | any;
  compareControlName!: string;
  
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
  outerForm!: FormGroup;
  isLoggedIn = false;
  userId: string | any;
  public roleId: any;
  prvopt :any;
  prvemailopt:any;
  showPasswordStrengthMessage: boolean = false;
  strengthMessage: string = '';

  constructor(public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService)
   {
   
   }

   ngOnInit(): void {
    this.outerForm = this.formBuilder.group({
      innerGroup: this.formBuilder.group({
        nestedControl: ['', Validators.required] // Apply required validation here
      })
    });
    let addUserDeatil = this.tokenStorage.getUser();    
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();    

    this.uploadForm = this.formBuilder.group({
     
      merchantCode: new FormControl('', []),
     // organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [this.validateStrongPassword,Validators.required, Validators.minLength(8),Validators.maxLength(15)]),
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
        merchantURL: new FormControl('',[]),    
        posInfo : this.formBuilder.group({
        posName: new FormControl('', []),
        categoryId: new FormControl('', [Validators.required]),
        organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3)]),
        posAddress: new FormControl('',[ Validators.required, Validators.minLength(3)]),
        zip: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
       })      
    },
     { 
      validators: [Validation.match('password', 'confirmPassword')], 
     },
    );

   if (this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
    this.roleId = this.tokenStorage.getUser().roleId;
    this.userId = this.tokenStorage.getUser().userId;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
}
  get conposinfo() { return this.uploadForm.get('posInfo')?.hasError;  }

  get PosInfos(){
    return this.uploadForm.get('posInfo') as FormGroup;
  }

  get PosName()
  {
    return this.PosInfos.get('posName');
  }
  get PosAddress()
  {
    return this.PosInfos.get('posAddress');
  }

  validateStrongPassword(control: { value: any; }) {
    const password = control.value;

    if (!password) {
      return null; 
    }

    const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)&& /[0-9]/.test(password);

    return isStrong ? null : { weakPassword: true };
  }


  get f()
   {   
     return this.uploadForm.controls;
    
    }

    get isNestedControlInvalid() {
      const nestedControl = this.outerForm.get('innerGroup.nestedControl');
      return nestedControl?.invalid && (nestedControl.dirty || nestedControl.touched);
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

  getCatagoryList() {
    this.appService.GetAll("api/CategoryMaster/GetCategoryDDL").subscribe(
    (x: any) => {
      this.CatagoryLists = x.responseData;
      console.log(x.responseData);
    });
  }
  
   GetCountryList() {
    this.appService.GetAll("api/Merchant/GetCountryDDL").subscribe(
      (x: any) => {
        this.CountryLists = x.responseData;
        console.log(x.responseData);
      });
  }
  allowOnlySpaces(event:any) {
    if (event.key !== ' ' && !/^[a-zA-Z]*$/.test(event.key)) {
      event.preventDefault();
    }
  }
   GetStateList()
  {
    this.appService.GetAll("api/Merchant/GetStateDDL").subscribe(
      (data:any) => {
      this.StateLists = data.responseData;
    });
  }

  public submit() {
 console.log( this.PosName)

    this.submitted = true;
  }
  checkPasswordStrength() {
    const password = this.uploadForm.get('password')?.value;
    this.showPasswordStrengthMessage = true;

    // You can implement your password strength logic here
    // For example, you can check for uppercase, lowercase, digits, special characters, etc.
    // Update this logic to match your password strength requirements

    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[0-9]/.test(password)) {
      this.strengthMessage = 'Strong password';
    } else {
      this.strengthMessage = 'Weak password';
    }
  }
  CancelForm()
  {
    this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });
    
  }

  
  //create new user
  public createMerchant(formData: addMerchant) {
    
    let addUserDeatil = this.tokenStorage.getUser();
    let AddMerchantModel: addMerchant = formData;  
        
    if(this.uploadForm.valid)
    {
      AddMerchantModel.GeneratedBy = "",
      AddMerchantModel.posInfo.stateName = ""? "":AddMerchantModel.posInfo.stateName,
      AddMerchantModel.posInfo.categoryName = ""? "":AddMerchantModel.posInfo.categoryName,
      AddMerchantModel.posInfo.countryName = ""? "":AddMerchantModel.posInfo.countryName,
      AddMerchantModel.organizationName = AddMerchantModel.posInfo.organizationName,
      AddMerchantModel.city = AddMerchantModel.posInfo.city,
      AddMerchantModel.posInfo.posid = 0;
      AddMerchantModel.posInfo.merchantId = 0;    
      AddMerchantModel.isEmailValidate = 1;
      AddMerchantModel.isPhoneNumberValidate = 1;
      AddMerchantModel.createdBy = addUserDeatil.adminID;
      AddMerchantModel.modifyBy = 0;
      AddMerchantModel.createdDate = new Date(); 
      AddMerchantModel.modifyDate = new Date();
      AddMerchantModel.merchantId = 0;
      AddMerchantModel.deviceId=  "",
      AddMerchantModel.deviceOs = "",
      AddMerchantModel.posInfo.stateName = ""? "":AddMerchantModel.posInfo.stateName,
      AddMerchantModel.posInfo.categoryName = ""? "":AddMerchantModel.posInfo.categoryName,
      AddMerchantModel.posInfo.countryName = ""? "":AddMerchantModel.posInfo.countryName,
      AddMerchantModel.password=   AddMerchantModel.password;
      AddMerchantModel.merchantURL = '';
      AddMerchantModel.posInfo.posname = ""?"":AddMerchantModel.posInfo.posname,
  
      console.log(AddMerchantModel);
        this.appService.Add('api/Merchant/AddMerchant', AddMerchantModel)      
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
            
              Swal.fire({
                title:'Success',
                text: 'Merchant added Successfully.',
                icon: 'success',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
               
              }).then(function() {
           //     location.reload();
             
              
            });
             this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });      
             
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
                  title:'Error',
                  text: 'Error Status',
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
                    text: 'Duplicate Category Status',
                    icon: 'warning',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  });                     
                           
                  break;
                    
            }
       
  
         
       }) 
        
    }
    
  }   

  
}
  

