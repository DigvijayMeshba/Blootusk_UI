import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { editMerchant, remarkHistory } from '../merchant';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-merchantedit',
  templateUrl: './merchantedit.component.html',
  styleUrls: ['./merchantedit.component.scss']
})
export class MerchanteditComponent {

  showDiv = {
    inputs : false,
    buttons : false
  }

  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,) { }

  activeTab = 1;
  uploadForm!:FormGroup;  
  isLoggedIn = false;
  userId: string | any;
  merchantId:string| any;
  public roleId: any;
  submitted = false;
  fieldTextType1!: boolean;
  
  remark!:string;
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

 
  getRemarkData()
  {
    this.appService.getById("api/Merchant/GetRemarkHistory",this.merchantId).subscribe(data => {      
    });
  }
  get f() { return this.uploadForm.controls; }

  ngOnInit(): void {
  this.uploadForm = new FormGroup({
     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl('', []),
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
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
   

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
    title: 'Merchant UPdated Successfully',
    icon: 'success',
    // showCancelButton: true,
    confirmButtonColor: '#364574',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  });
}

public getMerchantbyId(merchantId: any) {
  debugger;
  merchantId =3;
  if (merchantId > 0) {
    this.appService.getById("api/Merchant/GetMerchantById/", merchantId).pipe(
      catchError((error)=>{
      return throwError(error);
    }))    
    .subscribe(data => {

      console.log(data.responseData)
      // this.uploadForm.controls['merchantId'].setValue(data.merchantId);
      // this.uploadForm.controls['merchantCode'].setValue(data.merchantCode);
      // this.uploadForm.controls['phoneNumber'].setValue(data.phoneNumber);
      // this.uploadForm.controls['email'].setValue(data.email);
      // this.uploadForm.controls['password'].setValue(data.password);
      // this.uploadForm.controls['organizationName'].setValue(data.organizationName);
      // this.uploadForm.controls['contactPersonName'].setValue(data.contactPersonName);
      // this.uploadForm.controls['deviceId'].setValue(data.deviceId);
      // this.uploadForm.controls['deviceOs'].setValue(data.deviceOs);
      // this.uploadForm.controls['token'].setValue(data.token);
      // this.uploadForm.controls['isPhoneNumberValidate: true'].setValue(data.isPhoneNumberValidate);
      // this.uploadForm.controls['isEmailValidate: true'].setValue(data.isEmailValidate);
      // this.uploadForm.controls['approvalStatus'].setValue(data.approvalStatus);
      // this.uploadForm.controls['recStatus'].setValue(data.recStatus);
      // this.uploadForm.controls['remark'].setValue(data.remark);
      // this.uploadForm.controls['posname'].setValue(data.posInfo.posname);
    

    });
  }
}

//create Remark 
AddRemark()
{
  debugger;
  let AddRemarkModel: remarkHistory = {
    "remarkID": 0 ,
    "remark": this.remark, 
    "merchantID": 0, 
    "approvalStatus" :' ',
    "remarkDate": new Date()
  }
  this.appService.Add('api/Merchant/AddMerchantRemark', AddRemarkModel).subscribe((data: any) => {
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


  public updateMerchant(formData: editMerchant) {
    debugger;
    let AdduserModel: editMerchant = formData;  

    AdduserModel.merchantCode = "123";     
       
        this.appService.Add('api/Merchant/AddMerchant', AdduserModel)
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
             
              alert("Merchant Update successfully")
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
