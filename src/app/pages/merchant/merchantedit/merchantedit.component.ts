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
    private renderer: Renderer2 , ) { }

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

  public messageContent: string = '';
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
  public RewardList!:any[]
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
  messagecontent!:string;

  public isVisibleSuccess: boolean = false;
  public isVisibleDanger: boolean = false;
  public isVisibleWarning: boolean = false;
  
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
    debugger;

    console.log(this.statusLists);
    this.merchantId = this.route.snapshot.params['id'];
    this.TempmerchantId = this.merchantId;
  //  this.GetAlltemplateList();
    this.GetCountryList();
    this.getCatagoryList(); 
    this.GetStateList();
    this.getMerchantbyId(this.merchantId);
    //this.GetAllRewardPointList();
  
   
  this.uploadForm = new FormGroup({     
      merchantCode: new FormControl('', []),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),this.validateStrongPassword]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      posInfo : new FormGroup({
        posname: new FormControl('', []),
        categoryId: new FormControl('', [Validators.required]),
        posAddress: new FormControl('',[ Validators.required, Validators.minLength(3)]),
        zip: new FormControl('', [Validators.required, Validators.minLength(5)]),
        stateId: new FormControl('', [Validators.required]),
        countryId: new FormControl('', [Validators.required]),       
        state: new FormControl('', []),
        countryName: new FormControl('', []),
        organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    
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

  openModalCI(cicontent: any) {  
    this.modalService.open(cicontent, { size: 'lg' }); 
    }

  //add for alert
  showMessageSuccess() {
    //this.messageContent = 'Merchant Update Successfully.';
    this.messageContent = 'Merchant Update Successfully.';
    this.isVisibleSuccess = true;
  }

  showMessageDanger() {
    this.isVisibleDanger = true;
  }

  showMessageWarning() {   
    this.isVisibleWarning = true;
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
  showPasswordStrengthMessage: boolean = false;
  strengthMessage: string = '';
  checkPasswordStrength() {
    const password = this.uploadForm.get('password')?.value;
    this.showPasswordStrengthMessage = true;

   
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[0-9]/.test(password)) {
      this.strengthMessage = 'Strong password';
    } else {
      this.strengthMessage = 'Weak password';
    }
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
    this.urlsubstring = 'https://crm.blootusk.com/#UI/auth/signupuser/'
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
      title: 'Merchant Verifacation Pending',
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
          organizationName: data.responseData.organizationName,
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
      debugger;
      this.OrganizationNameTemp = data.responseData.organizationName,
      this.ContactPersonNameTemp = data.responseData.contactPersonName,
      this.MobileNoTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
      this.EmailIdTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email)
    
    this.TemplateList = data.responseData.smstemplateList;
    console.log("RewardList",data.responseData.rewardPointlist)
    this.RewardList = data.responseData.rewardPointlist;
    
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

public GetRewardData():any[]
{
  debugger;
  console.log('reward',this.RewardList)
  const startIndex = (this.page -1) * this.count;
  const endIndex = startIndex + this.count;
  return this.RewardList.slice(startIndex, endIndex);
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

    AddMerchantModel.GeneratedBy = "",
    AddMerchantModel.posInfo.stateName = ""? "":AddMerchantModel.posInfo.stateName,
    AddMerchantModel.posInfo.categoryName = ""? "":AddMerchantModel.posInfo.categoryName,
    AddMerchantModel.posInfo.countryName = ""? "":AddMerchantModel.posInfo.countryName,
    AddMerchantModel.organizationName = AddMerchantModel.posInfo.organizationName,
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
       AddMerchantModel.posInfo.posname = ""?"":AddMerchantModel.posInfo.posname;
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
        let statuscode : number = res.responseStatusCode;

          switch(statuscode)
          {          
            case 200:
              debugger;       
              
              Swal.fire({
                title:'Success',
                text: 'Merchant Updated Successfully.',
                icon: 'success',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
               
              }).then(function() {
  
              // location.reload();
              
           
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
              case 400:  
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


//       //List of All Template
//       public   GetAlltemplateList() {
//         debugger;
       
     
//           this.appService.getById("api/SMSTemplate/GetAllSmsTemplate/", this.merchantId)
//           .pipe(
//             catchError((error) => {          
//               return throwError(error); 
//             })).subscribe((data: any) => {    
              
//               console.log('allmerchant',data.responseData)
//               this.TemplateList = data.responseData             
//               if(data.responseData.length == 0)
//               {
//                 // this.swalMessage('Data not found')
//               }        
//           },);        
//   }
//   //List Of Reward POint

//     //List of All Company
//     public   GetAllRewardPointList() {
//       debugger;
//         this.appService.getById("api/RewardPoint/GetAllRewardPoint/", this.merchantId)
       
//         .pipe(
//           catchError((error) => {          
//             return throwError(error); 
//           })).subscribe((data: any) => {    
            
//             console.log('reward',data.responseData)
//             this.RewardList = data.responseData             
//             if(data.responseData.length == 0)
//             {
//               // this.swalMessage('Data not found')
//             }        
//         },);  
    
    
// }

validateStrongPassword(control: { value: any; }) {
  const password = control.value;

  if (!password) {
    return null; 
  }

  const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)&& /[0-9]/.test(password);

  return isStrong ? null : { weakPassword: true };
}
}




