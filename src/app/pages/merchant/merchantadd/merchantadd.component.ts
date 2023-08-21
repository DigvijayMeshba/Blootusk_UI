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
  prvemailopt:any;

  constructor(public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,)
   {
   
   
  }

   ngOnInit(): void {
    let addUserDeatil = this.tokenStorage.getUser();    
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();

    this.uploadForm = new FormGroup({
     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        posAddress: new FormControl('', []),
        zip: new FormControl('', []),
        stateId: new FormControl('', []),
        countryId: new FormControl('', []),
        categoryId : new FormControl('',[]),
        posid:new FormControl('', []),
        merchantId:new FormControl('', []),
        poscode: new FormControl('', []),
        latitude: new FormControl('', []),
        longitude: new FormControl('', []),
        
       }),

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

   GetStateList()
  {
    this.appService.GetAll("api/Merchant/GetStateDDL").subscribe(
      (data:any) => {
      this.StateLists = data.responseData;
    });
  }

  public submit() {
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

  //create new user
  public createMerchant(formData: addMerchant) {
    debugger;
    let AddMerchantModel: addMerchant = formData;  
    debugger;    

    AddMerchantModel.posInfo.posid = 0;
    AddMerchantModel.posInfo.merchantId = 0;    
    AddMerchantModel.isEmailValidate = 1;
    AddMerchantModel.isPhoneNumberValidate = 1;
    AddMerchantModel.createdBy = 0;
    AddMerchantModel.modifyBy = 0;
    AddMerchantModel.createdDate = new Date(); 
    AddMerchantModel.modifyDate = new Date();
    AddMerchantModel.merchantId = 0;
   
    
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
          }
          else if(res.responseStatusCode == 212)
          {
            alert("Something Went wrong")
           
          }
          else if(res.responseStatusCode == 500)
          {
            alert("Error Status ")
            
          }
          else if(res.responseStatusCode == 601)
          {
            alert("Phone Number is Duplicate")
           
          }
          else if(res.responseStatusCode == 602)
          {
            alert("Duplicate Email")
            
          }
          else if(res.responseStatusCode == 603)
          {
            alert("Duplicate Category Status ")
            
          }
          else if(res.responseStatusCode == 400)
          {
            alert("Bad Request Status")
           
          }
          else{
            alert("Something Went wrong")
            
          }

       
     }) 
      
  }   

  
}
  

