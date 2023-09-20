import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { Status, editMerchant, listTemplate, remarkHistory } from '../merchant';
import { catchError, throwError } from 'rxjs';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import * as QRCode from 'qrcode'; 
import { url } from 'inspector';
const QRious = require('qrious');
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-merchantedit',
  templateUrl: './merchantedit.component.html',
  styleUrls: ['./merchantedit.component.scss']
})
export class MerchanteditComponent {
  qrCode!: string;
 // @ViewChild('qrCodeContainer') qrCodeContainer?: ElementRef;
 @ViewChild('divToDownload', { static: false }) divToDownload?: ElementRef;
// @ViewChild('screen') screen?: ElementRef;
 @ViewChild('screen', { static: false }) screen!: ElementRef;
 @ViewChild('canvas') canvas?: ElementRef;
 @ViewChild('downloadLink') downloadLink?: ElementRef;


  showDiv = {
    inputs : false,
    buttons : false
  }

  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,
    private renderer: Renderer2) { }

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
  approvstatus!:string;
  receivedLink!: string;
  OrganizationNameTemp!:string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!:string;
  EmailIdTemp!: string;

//use for a template List
  public page: number = 1;
  public count = 10;
  public TemplateList! : any[]
  TempmerchantId ! : number;
  
  
  statusLists = [   
    { name: 'New', id:'N' },
    { name: 'In Progress', id:'I' },
    { name: 'Verified', id:'V' },   
    { name: 'Rejected' , id:'R' },
  ];
  StatusRec!:boolean;
  signupurl!:string;
  remark!:string;
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];
  RecStatus!:boolean;
 urlsubstring!:string;
  getRemarkData()
  {
    this.appService.getById("api/Merchant/GetRemarkHistory/",this.merchantId).subscribe(data => {  
      this.RemarkList = data.responseData;
      console.log( data.responseData)
    });
  }
  get f() { return this.uploadForm.controls; }

  ngOnInit(): void {
    console.log(this.statusLists);
    this.merchantId = this.route.snapshot.params['id'];
    this.TempmerchantId = this.merchantId;
    this.GetAlltemplateList();
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();
    this.getMerchantbyId(this.merchantId);
  
   
  this.uploadForm = new FormGroup({     
      merchantCode: new FormControl('', []),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl('', [Validators.required]),
        posAddress: new FormControl('',[ Validators.required, Validators.minLength(3)]),
        zip: new FormControl('', [Validators.required, Validators.minLength(5)]),
        stateId: new FormControl('', [Validators.required]),
        countryId: new FormControl('', [Validators.required]),       
        state: new FormControl('', []),
        countryName: new FormControl('', []),
        stateName: new FormControl('', []),
        categoryName: new FormControl('', []),
        country: new FormControl('', []),
        posid:new FormControl('', []),
        merchantId:new FormControl('', []),
        poscode: new FormControl('', []),
        latitude: new FormControl('', []),
        longitude: new FormControl('', []),
      //    latitude: ['', [Validators.required, latitudeValidator()]],
//longitude: ['', [Validators.required, longitudeValidator()]],
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
        merchantURL: new FormControl('',[]), 
       
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
    this.showDiv.inputs = false;
    this.showDiv.buttons = false;
    this.getRemarkData();
  }

openModalQR(qrcontent: any) {  
  debugger;
  if(this.approvstatus == 'V')
  {

    this.receivedLink= this.signupurl
    this.urlsubstring = 'http://crm.blootusk.com/#UI/auth/signupuser/'
    let encryptedcode = this.receivedLink.replace(this.urlsubstring,'') 

     encryptedcode = btoa(encryptedcode);
//-- its use to decode value --//
   //  const decryptedData = atob(encryptedcode);
   
  //  let test = this.EncrDecr.get('12$#@BLOO$^@TUSK', 'xof0gDd/9lWWEyMXQSboYw==')
  //  console.log(test)
    
   this.receivedLink = this.urlsubstring + encryptedcode;

      // QRCode.toDataURL(this.receivedLink)
      //   .then(url => {
      //     this.qrCodeDataURL = url;
      //   })
      //   .catch(err => {
      //     console.error('QR Code generation error:', err);
      //   });

    QRCode.toDataURL(this.receivedLink, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.qrCode = url;
      }
    });
    this.modalService.open(qrcontent, { size: 'sm' });

    //-------------------------//

  }
  else{
    Swal.fire({
      title: 'Merchant Verifacation Not Verified',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

   allowOnlySpaces(event:any) {
    if (event.key !== ' ' && !/^[a-zA-Z]*$/.test(event.key)) {
      event.preventDefault();
    }
  }

//Validation for only enter Character
  keyPressOnlyChar(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp) ) {
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

successmsg() {
  Swal.fire({
    title: 'Merchant Information Updated Successfully',
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
   
      console.log('merchant by id' , data.responseData)

      this.uploadForm.patchValue({
        phoneNumber: this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
         email: this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email),
        //phoneNumber:data.responseData.phoneNumber,
        //email:data.responseData.email,
        password: this.EncrDecr.get('12$#@BLOO$^@TUSK',data.responseData.password),
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
        approvalStatus : data.responseData.approvalStatus,
        merchantURL : data.responseData.merchantURL,
        recStatus : data.responseData.recStatus == "A"? true : false,
      });
      this.OrganizationNameTemp = data.responseData.organizationName,
      this.ContactPersonNameTemp = data.responseData.contactPersonName,
      this.MobileNoTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
      this.EmailIdTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email)
    });
  }
}

//create Remark 
AddRemark(formDt: remarkHistory)
{
  debugger;
  let AddRemarkModel: remarkHistory = formDt;  

  const remarkdetail = { ...formDt };   
  
  const addremarks: remarkHistory = {
    remark: remarkdetail.remark,
    remarkID: 0,            
    merchantID: this.merchantId,
    approvalStatus: this.approvstatus,
    remarkDate:  new Date(),     
  }

  console.log(remarkdetail);
  debugger;
  this.appService.Add('api/Merchant/AddMerchantRemark', addremarks).subscribe((data: any) => {
    debugger  
   
    if (data.responseStatusCode == 200) {    
      
      Swal.fire({
        title:'Remark added',      
        icon: 'success',
        confirmButtonColor: '#364574',
        allowOutsideClick: false,
        allowEscapeKey: false
 
      });
  

                                              
     // this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });    

      this.modalService.dismissAll();
    }   
  },);
}

public GetTemplateData():any[]
{
  const startIndex = (this.page -1) * this.count;
  const endIndex = startIndex + this.count;
  return this.TemplateList.slice(startIndex, endIndex);

}


CancelForm()
{
  this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });
}
  public updateMerchant(formData: editMerchant) {
    debugger;

    if(formData.recStatus == true)
    {
      formData.recStatus = 'A'
    }
    else{
      formData.recStatus = 'I'
    }

    let AddMerchantModel: editMerchant = formData;  
       AddMerchantModel.merchantId = this.merchantId,
       AddMerchantModel.posInfo.merchantId = this.merchantId,
       AddMerchantModel.isEmailValidate = 1;
       AddMerchantModel.isPhoneNumberValidate = 1;
       AddMerchantModel.createdBy = this.userId;
       AddMerchantModel.modifyBy = 0;
       AddMerchantModel.createdDate = new Date(); 
       AddMerchantModel.modifyDate = new Date();
      AddMerchantModel.merchantURL ='';
       AddMerchantModel.posInfo.stateName = "";
       AddMerchantModel.posInfo.categoryName = "";
       AddMerchantModel.posInfo.countryName = "";
       AddMerchantModel.password=this.EncrDecr.set('12$#@BLOO$^@TUSK', AddMerchantModel.password);
       AddMerchantModel.phoneNumber =  this.EncrDecr.set('12$#@BLOO$^@TUSK', AddMerchantModel.phoneNumber);
       AddMerchantModel.email = this.EncrDecr.set('12$#@BLOO$^@TUSK', AddMerchantModel.email.toLowerCase());
       
    if(this.uploadForm.valid)
    {
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
            this.successmsg();
            this.router.navigate(['/merchant/merchantlist'], { relativeTo: this.route });
          }
          else if(res.responseStatusCode == 212)
          {
            Swal.fire({
              text: 'Something Went wrong',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false       
            });           
          }
          else if(res.responseStatusCode == 500)
          {
            Swal.fire({
              title:'Error',
              text: 'Error Status',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false
            });   
          }
          else if(res.responseStatusCode == 601)
          {
            Swal.fire({
              title:'Warning',
              text: 'Phone Number is Duplicate.',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false       
            });           
          }
          else if(res.responseStatusCode == 602)
          {
            Swal.fire({
              title:'Warning',
              text: 'Duplicate Email.',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }
          else if(res.responseStatusCode == 603)
          {
            Swal.fire({
              title:'Warning',
              text: 'const int DuplicateCategory Status',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false       
            });              
          }
          else if(res.responseStatusCode == 400)
          {
            Swal.fire({
              title:'Warning',
              text: 'Bad Request Status',
              icon: 'warning',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false
            });  
          }
          else{

            Swal.fire({
              title:'Error',
              text: 'Data not save ',
              icon: 'error',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false
       
            });   
          }
     }) 
   }  
  }   

 
    array = ['Qr'];

    public trivialDownload() {
      console.log("Downloading image one by one, without a loop");
      this._download(0, this.array);
    }

     private _download(index:any, array:any) {
      debugger;
      if (index >= array.length) {
        console.log("Done!")
      } else {
        let docElem = document.getElementById(array[index].toString());
          html2canvas(docElem!).then((canvas) => {
            let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            let a = document.createElement('a');
            a.href = generatedImage;
            a.download = `${array[index]}.png`;
            a.click();
            // at this point, image has been downloaded, then call the next download.
            this._download(index + 1, array)
          });
      }
  }


      //List of All Company
      public   GetAlltemplateList() {
        debugger;
          this.appService.GetAllLists("api/SMSTemplate/GetAllSmsTemplate")
          .pipe(
            catchError((error) => {          
              return throwError(error); 
            })).subscribe((data: any) => {    
              
              console.log('allmerchant',data.responseData)
              this.TemplateList = data.responseData             
              if(data.responseData.length == 0)
              {
                // this.swalMessage('Data not found')
              }        
          },);  
      
      
  }
}




