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
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

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
    private router: Router,private EncrDecr: EncrDecrServiceService) { }

  activeTab = 1;
  uploadForm!:FormGroup;  
  remarkForm!:FormGroup;
  isLoggedIn = false;
  userId: string | any;
  merchantId:string| any;
  public roleId: any;
  submitted = false;
  fieldTextType1!: boolean;
  StateLists: any[] = [];
  CatagoryLists: any[] = [];  
  CountryLists: any[] = []; 
  public RemarkList: any = [];
  
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
    this.appService.getById("api/Merchant/GetRemarkHistory/",this.merchantId).subscribe(data => {  
      this.RemarkList = data.responseData;
    });
  }
  get f() { return this.uploadForm.controls; }

  ngOnInit(): void {
    this.merchantId = this.route.snapshot.params['id'];
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();
    this.getMerchantbyId(this.merchantId);
   
  this.uploadForm = new FormGroup({
     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl('', []),
        posAddress: new FormControl('', []),
        zip: new FormControl('', []),
        state: new FormControl('', []),
        countryName: new FormControl('', []),
        stateName: new FormControl('', []),
        categoryName: new FormControl('', []),
        countryId :new FormControl('', []),
        stateId :new FormControl('', []),
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

  this.remarkForm =new FormGroup({
    remark: new FormControl('', []),  
    merchantID: new FormControl('', []),  
    approvalStatus: new FormControl('', []),  
    remarkDate: new FormControl('', []),  
  });
    
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
    this.getRemarkData();
  
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
    title: 'Merchant Updated Successfully',
    icon: 'success',
    // showCancelButton: true,
    confirmButtonColor: '#364574',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  });
}

public getMerchantbyId(merchantId: any) {
 
  if (merchantId > 0) {
    this.appService.getById("api/Merchant/GetMerchantById/", merchantId).subscribe(data => {     
   
      console.log(data.responseData)

      this.uploadForm.patchValue({
        phoneNumber: this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
        email: this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email),

        password: data.responseData.password,
        organizationName: data.responseData.organizationName,
        contactPersonName: data.responseData.contactPersonName,           
        posInfo:{
          posid: data.responseData.posInfo.posid,
          zip: data.responseData.posInfo.zip,        
          merchantId: data.responseData.posInfo.merchantId,           
          poscode: data.responseData.posInfo.poscode,    
          countryName:data.responseData.posInfo.countryName,    
          stateName: data.responseData.posInfo.stateName,    
          categoryName: data.responseData.posInfo.categoryName,    
          latitude: data.responseData.posInfo.latitude,    
          longitude: data.responseData.posInfo.longitude,    
          posAddress: data.responseData.posInfo.posaddress,
          posname: data.responseData.posInfo.posname,
          stateId: data.responseData.posInfo.stateId,
          countryId: data.responseData.posInfo.countryId,
          categoryId: data.responseData.posInfo.categoryId,
        },
        createdBy: data.responseData.createdBy,
        createdDate:data.responseData.createdDate,
        modifyBy:data.responseData.modifyBy,
        modifyDate: data.responseData.modifyDate,  
      });
    });
  }
}

//create Remark 
AddRemark(formDt: remarkHistory)
{
  debugger;
  let AddRemarkModel: remarkHistory = formDt;  
  
  const remarkdetail = { ...formDt };   
  remarkdetail.merchantID = this.merchantId;
  remarkdetail.remarkDate = new Date();
  const addremarks: remarkHistory = {
    remark: remarkdetail.remark,
    remarkID: remarkdetail.merchantID,            
     merchantID: this.merchantId,
        approvalStatus: "",
     remarkDate:  remarkdetail.remarkDate, 
    
  }
  this.appService.Add('api/Merchant/AddMerchantRemark', remarkdetail).subscribe((data: any) => {
    debugger  
   
    if (data.responseData == 200) {    
      
      Swal.fire({
        title:'Remark added',
        text: 'Phone Number is Duplicate.',
        icon: 'success',
        confirmButtonColor: '#364574'
      });
  
      this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });    
    }   
  },);
}


  public updateMerchant(formData: editMerchant) {
    debugger;
    let AddMerchantModel: editMerchant = formData;  
       AddMerchantModel.merchantId = this.merchantId,
       AddMerchantModel.posInfo.merchantId = this.merchantId,
       AddMerchantModel.isEmailValidate = 1;
       AddMerchantModel.isPhoneNumberValidate = 1;
       AddMerchantModel.posInfo.posid = 0,
       AddMerchantModel.createdBy = this.userId;
       AddMerchantModel.modifyBy = 0;
       AddMerchantModel.createdDate = new Date(); 
       AddMerchantModel.modifyDate = new Date();
       
       AddMerchantModel.posInfo.stateName = "";
       AddMerchantModel.posInfo.categoryName = "";
       AddMerchantModel.posInfo.countryName = "";
     
    console.log(AddMerchantModel);
         this.appService.Add('api/Merchant/EditMerchant', AddMerchantModel)
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
             
              Swal.fire({
                title:'Merchant Update successfully',
                text: 'Phone Number is Duplicate.',
                icon: 'success',
                confirmButtonColor: '#364574'
              });
            
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
