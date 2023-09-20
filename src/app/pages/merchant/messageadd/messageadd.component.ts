import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { addMessageTemplate } from '../merchant';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-messageadd',
  templateUrl: './messageadd.component.html',
  styleUrls: ['./messageadd.component.scss']
})
export class MessageaddComponent {

  OrganizationNameTemp!:string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!:string;
  EmailIdTemp!: string;
  merchantId:string| any;
  uploadForm!:FormGroup;  
  TemplateLists: any[] = [];  
  submitted = false;

  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,   private renderer: Renderer2) { }


  ngOnInit(): void {   
    this.merchantId = this.route.snapshot.params['id']; 
    this.getMerchantbyId(this.merchantId);
    this.GettemplateList();

       
  this.uploadForm = new FormGroup({
       merchantId : new FormControl('',[]),     
       messageContent : new FormControl('', []),
       messageTypeId : new FormControl('', []),
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

  public GettemplateList()
  {
      this.appService.GetAll("api/SMSTemplate/GetMessageTypeDDL").subscribe(
      (x: any) => {
        this.TemplateLists = x.responseData;
        console.log(x.responseData);
      });
    
  }

     //create new Template
     public createTemplate(formData: any) {
      debugger;
      let AdduserModel: addMessageTemplate = {      
      "templateId":0,
      "messageTypeId":formData.messageTypeId,
      "merchantId": this.merchantId,
      "messageContent": formData.messageContent,
      "recStatus": "A",
      "createdBy": 0,
      "messsageType":"",
      "createdDate": new Date(),
      "modifyBy": 0,
      "modifyDate": new Date(),
    
    }
  if(this.uploadForm.valid)
  {  
      this.appService.Add('api/SMSTemplate/AddSMSTemplate', AdduserModel)
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

}
