import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { addMessageTemplate, addReward } from '../merchant';
import { catchError, throwError } from 'rxjs';

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
    this.merchantId = this.route.snapshot.params['id']; 
    this.getMerchantbyId(this.merchantId);
    this.GetRewardTypeList();
       
    this.uploadForm = new FormGroup({
       merchantId : new FormControl('',[]),    
       rewardPoint : new FormControl('',[]),    
       rewardTypeId : new FormControl('', []),
       rewardDate : new FormControl('',[]),
       issuedBy : new FormControl('',[]),  
       validity :  new FormControl('',[]),
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

      console.log('template', formData)
      debugger;
      let AdduserModel: addReward = {
        "merchantId": this.merchantId,
        "rewardPoint" : formData.rewardPoint,
        "rewardTypeId": formData.rewardTypeID,
        "RewardType": '',
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
      
        if (data.responseStatusCode == 200 ) {
          
          this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });
                                          
        }    
      },);
  
    }  
  }
  CancelForm()
  {
    this.router.navigate(['/merchant/merchantedit/', this.merchantId], { relativeTo: this.route });
    
  }
}
