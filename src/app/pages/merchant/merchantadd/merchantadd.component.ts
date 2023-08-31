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

@Component({
  selector: 'app-merchantadd',
  templateUrl: './merchantadd.component.html',
  styleUrls: ['./merchantadd.component.scss']
})

export class MerchantaddComponent {

  StateLists: any[] = [];
  CatagoryLists: any[] = [];  
  CountryLists: any[] = []; 

  selectedCategoryId!:number;
  selectedCountryId!:number;
  selectedStateId!:number;

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
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
     // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
     // confirmPassword: new FormControl('', [Validators.required]),
     
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
       posInfo : this.formBuilder.group({
        posName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl('', [Validators.required]),
        posAddress: new FormControl('',[ Validators.required, Validators.minLength(6)]),
        zip: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
      
    });


    
  

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
  
  successmsg() {
    Swal.fire({
      title: 'Merchant Added Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

 
  CancelForm()
  {
    this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });
    
  }
  //create new user
  public createMerchant(formData: addMerchant) {
    debugger;
    let AddMerchantModel: addMerchant = formData;  
    debugger;    
    if(this.uploadForm.valid)
    {
      AddMerchantModel.posInfo.posid = 0;
      AddMerchantModel.posInfo.merchantId = 0;    
      AddMerchantModel.isEmailValidate = 1;
      AddMerchantModel.isPhoneNumberValidate = 1;
      AddMerchantModel.createdBy = 0;
      AddMerchantModel.modifyBy = 0;
      AddMerchantModel.createdDate = new Date(); 
      AddMerchantModel.modifyDate = new Date();
      AddMerchantModel.merchantId = 0;
      AddMerchantModel.posInfo.stateName = ""? "":AddMerchantModel.posInfo.stateName,
      AddMerchantModel.posInfo.categoryName = ""? "":AddMerchantModel.posInfo.categoryName,
      AddMerchantModel.posInfo.countryName = ""? "":AddMerchantModel.posInfo.countryName,
      AddMerchantModel.password=   "123456";
  
      console.log(AddMerchantModel);
        this.appService.Add('api/Merchant/AddMerchant', AddMerchantModel)      
        .pipe(
          catchError((error) => {          
            return throwError(error); // Throw the error to propagate it further
          })
        )   
          .subscribe((res: any) => {
            debugger;
            console.log('data',res)
  
            if(res.responseStatusCode == 200)
            {           
              this.successmsg();
              this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });
            }
            else if(res.responseStatusCode == 212)
            {
              Swal.fire({
                text: 'Something Went wrong',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });
             
            }
            else if(res.responseStatusCode == 500)
            {

              Swal.fire({
                title:'Duplication Error',
                text: 'Error Status',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });
             
              
            }
            else if(res.responseStatusCode == 601)
            {
              Swal.fire({
                title:'Warning',
                text: 'Phone Number is Duplicate.',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });
             
            }
            else if(res.responseStatusCode == 602)
            {
              Swal.fire({
                title:'Warning',
                text: 'Duplicate Email.',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });
              
            }
            else if(res.responseStatusCode == 603)
            {
              Swal.fire({
                title:'Warning',
                text: 'const int DuplicateCategory Status',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });              
            }
            else if(res.responseStatusCode == 400)
            {
              Swal.fire({
                title:'Warning',
                text: 'Bad Request Status',
                icon: 'warning',
                confirmButtonColor: '#364574'
              });                   
            
             
            }
            else{

              Swal.fire({
                title:'Error',
                text: 'Data not save ',
                icon: 'error',
                confirmButtonColor: '#364574'
              });      
             
              
            }
  
         
       }) 
        
    }
    
  }   

  
}
  
