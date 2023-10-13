import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { addMessageTemplate, addReward, editReward } from '../merchant';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rewardedit',
  templateUrl: './rewardedit.component.html',
  styleUrls: ['./rewardedit.component.scss']
})
export class RewardeditComponent {

  OrganizationNameTemp!:string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!:string;
  EmailIdTemp!: string;
  merchantId:string| any;
  uploadForm!:FormGroup;   
  RewardTypeList: any[] = [];  
  submitted = false;
  templateId!:number;
  currentDate! :string;
  
  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,   private renderer: Renderer2)
     {

    
      }

    IssuedLists = [   
      { name: 'Merchant', id:0 },
      { name: 'Blootusk', id:1},
    ];

  ngOnInit(): void {   

    this.templateId = this.route.snapshot.params['id'];
    this.getTemplatebyId(this.templateId);   
 
    this.GetRewardTypeList();

       
  this.uploadForm = new FormGroup({
       merchantId : new FormControl('',[]),    
       rewardPoint : new FormControl('',[Validators.required]),     
       rewardTypeID : new FormControl('', []),
       rewardDate : new FormControl('',[]),
       issuedBy : new FormControl('',[]),  
       validity :  new FormControl('',[Validators.required]),
       recStatus:new FormControl('', []),     
       isAdmin :new FormControl('',[]),    
       token: new FormControl('', []),
       createdBy: new FormControl('', []),
       createdDate: new FormControl('', []),
       modifyBy: new FormControl('', []),
       modifyDate: new FormControl('', []),
  });

   
  }
  get f() { return this.uploadForm.controls; }

  public submit() 
  {
    this.submitted = true;
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
     public updateReward(formData: any) {
      debugger;
      let AdduserModel: editReward = {   

      "RewardPonitId":this.templateId ,
      "merchantId" : this.merchantId,    
      "rewardPoint" : formData.rewardPoint,
      "rewardTypeID" : formData.rewardTypeID,
      "RewardType" : "",
      "rewardDate" : formData.rewardDate,
      "issuedBy" : formData.issuedBy,
      "validity" : formData.validity,
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
              text: 'Reward Update Successfully.',
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
                text: 'Duplicate Category Status',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });                     
                       
              break;
            case 400:  
        }
        // if (data.responseStatusCode == 200 ) {
          
        //   this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });
                                          
        // }        
      },);
  
    }  
  }
 

  public getTemplatebyId(templateId: number) {
    debugger
    if (templateId > 0) {
      this.appService.getById("api/RewardPoint/GetRewardPointById/", templateId).subscribe(data => {
     
        console.log('rewarddadta', data.responseData)
        this.uploadForm.patchValue({
          merchantId : data.responseData.merchantId,    
          rewardPoint : data.responseData.rewardPoint,
          rewardTypeID : data.responseData.rewardTypeID,
          rewardDate : data.responseData.rewardDate,
          issuedBy : data.responseData.issuedBy,
          validity : data.responseData.validity,
          createdBy: data.responseData.createdBy,
          createdDate:data.responseData.createdDate,
          modifyBy:data.responseData.modifyBy,
          modifyDate: data.responseData.modifyDate,  
          approvalStatus : data.responseData.approvalStatus,
          // recStatus : data.responseData.recStatus == "A"? true : false,
        });
        this.currentDate  = data.responseData.rewardDate,
        this.merchantId = data.responseData.merchantId,
        this.OrganizationNameTemp = data.responseData.organizationName,
        this.ContactPersonNameTemp = data.responseData.contactPersonName,
        this.MobileNoTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
        this.EmailIdTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email)       
       
      });
    }
  }

  CancelForm()
  {
    this.router.navigate(['/merchant/merchantedit/', this.merchantId], { relativeTo: this.route });
    
  }
}

