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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messageedit',
  templateUrl: './messageedit.component.html',
  styleUrls: ['./messageedit.component.scss']
})
export class MessageeditComponent {
  OrganizationNameTemp!:string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!:string;
  EmailIdTemp!: string;
  merchantId:string| any;
  uploadForm!:FormGroup;  
  TemplateLists: any[] = [];  
  submitted = false;
  templateId!:number;
  messageContent!:string;
  public Editor = ClassicEditor;

  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,   private renderer: Renderer2) { }


  ngOnInit(): void {   

    this.templateId = this.route.snapshot.params['id'];
    this.getTemplatebyId(this.templateId);   
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
      "templateId":this.templateId,
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

        let statuscode : number = data.responseStatusCode;

        switch(statuscode)
        {          
          case 200:
            debugger;       
            
            Swal.fire({
              title:'Success',
              text: 'Message Added Successfully.',
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
        //   this.messageContent = 'Template update Successfully.',
        //   this.showMessageSuccess() 

        //   this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });
                                          
        // }        
      },);
  
    }  
  }

  public isVisibleSuccess: boolean = false;
  public isVisibleDanger: boolean = false;
  public isVisibleWarning: boolean = false;


   //add for alert
   showMessageSuccess() {
   
    this.isVisibleSuccess = true;
  }

  CancelForm()
  {
    this.router.navigate(['/merchant/merchantedit/', this.merchantId], { relativeTo: this.route });
    
  }
 

  public getTemplatebyId(templateId: number) {
    debugger
    if (templateId > 0) {
      this.appService.getById("api/SMSTemplate/GetSmsTemplateById/", templateId).subscribe(data => {
     
        this.uploadForm.patchValue({
          messageTypeId : data.responseData.messageTypeId,
          messageContent: data.responseData.messageContent,
          createdBy: data.responseData.createdBy,
          createdDate:data.responseData.createdDate,
          modifyBy:data.responseData.modifyBy,
          modifyDate: data.responseData.modifyDate,  
          approvalStatus : data.responseData.approvalStatus,
          recStatus : data.responseData.recStatus == "A"? true : false,
        });
        this.merchantId = data.responseData.merchantId,
       this.OrganizationNameTemp = data.responseData.organizationName,
        this.ContactPersonNameTemp = data.responseData.contactPersonName,
        this.MobileNoTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.phoneNumber), 
        this.EmailIdTemp = this.EncrDecr.get('12$#@BLOO$^@TUSK', data.responseData.email)       
       
      });
    }
  }
}
