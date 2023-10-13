import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { addMessageTemplate, addReward } from '../merchant';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rewardadd',
  templateUrl: './rewardadd.component.html',
  styleUrls: ['./rewardadd.component.scss']
})
export class RewardaddComponent {

  IssuedLists = [   
    { name: 'Merchant', id:0 },
    { name: 'Blootusk', id:1},
  ];

  OrganizationNameTemp!:string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!:string;
  EmailIdTemp!: string;
  merchantId:string| any;
  uploadForm!:FormGroup;  
  RewardTypeList: any[] = [];  
  submitted = false;

  currentDate: string;

  dateblock!:Date;
  
  
  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,   private renderer: Renderer2) { 

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const dd = String(today.getDate()).padStart(2, '0');
      this.currentDate = `${yyyy}-${mm}-${dd}`;
    }

  ngOnInit(): void {   


    this.dateblock = new Date();
    this.merchantId = this.route.snapshot.params['id']; 
    this.getMerchantbyId(this.merchantId);
    this.GetRewardTypeList();
       
    this.uploadForm = new FormGroup({
       merchantId : new FormControl('',[]),    
       rewardPoint : new FormControl('',[Validators.required]),    
       rewardTypeId : new FormControl('', [Validators.required]),
       rewardDate : new FormControl('',[Validators.required]),
       issuedBy : new FormControl('',[Validators.required]),  
       validity :  new FormControl('',[Validators.required]),
        recStatus:new FormControl('', []),     
        token: new FormControl('', []),
        createdBy: new FormControl('', []),
        createdDate: new FormControl('', []),
        modifyBy: new FormControl('', []),
        modifyDate: new FormControl('', []),
     
  });
  }
  get f() { return this.uploadForm.controls; }

  public submit() {
   
    this.submitted = true;
  }

  public getMerchantbyId(merchantId: any) {
 
    if (merchantId > 0) {
      this.appService.getById("api/Merchant/GetMerchantById/", merchantId).subscribe(data => {     
        this.OrganizationNameTemp = data.responseData.organizationName,
        this.ContactPersonNameTemp = data.responseData.contactPersonName,
        this.MobileNoTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
        this.EmailIdTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email)
      });
    }
  }

  public GetRewardTypeList()
  {
      this.appService.GetAll("api/RewardPoint/GetrewardPointDDL").subscribe(
      (x: any) => {
        this.RewardTypeList = x.responseData;       
        console.log('rewardlist',x.responseData)
      });
    
  }

     //create new Template
     public createTemplate(formData: any) {

      debugger;
      let AdduserModel: addReward = {
        "merchantId": this.merchantId,
        "rewardPoint" : formData.rewardPoint,
        "rewardTypeId": formData.rewardTypeId,
        "RewardType": formData.RewardType,
        "rewardDate": formData.rewardDate,
        "issuedBy": formData.issuedBy,
        "validity": formData.validity,
        "recStatus": "A",
        "createdBy": 0,
        "createdDate": new Date(),
        "modifyBy": 0,
        "modifyDate": new Date(),
        "IssuedByName":"",
       
      }
  if(this.uploadForm.valid)
  {  
      this.appService.Add('api/RewardPoint/AddEditrewardPoint', AdduserModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })
      ) 
      .subscribe((data: any) => {
        let statuscode : number = data.responseStatusCode;

        switch(statuscode)
        {          
          case 200:
            debugger;       
            
            Swal.fire({
              title:'Success',
              text: 'Reward Added Successfully.',
              icon: 'success',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false
             
            }).then(function() {
         
          });
          this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });
                      
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
                text: 'Reward data already exist',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });                     
                       
              break;
            case 400:  
        }
      },);
  
    }  
  }
  CancelForm()
  {
    this.router.navigate(['/merchant/merchantedit/', this.merchantId], { relativeTo: this.route });
    
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
}
