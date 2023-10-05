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
  selector: 'app-messageadd',
  templateUrl: './messageadd.component.html',
  styleUrls: ['./messageadd.component.scss']
})
export class MessageaddComponent {

  OrganizationNameTemp!: string;
  ContactPersonNameTemp!: string;
  MobileNoTemp!: string;
  EmailIdTemp!: string;
  merchantId: string | any;
  uploadForm!: FormGroup;

  public Editor = ClassicEditor;
  ModeLists: any[] = [];
  showDiv = {
    current: true,
    next: false
  }

  TemplateLists = [
    { messageType: 'Signup', modeTypeId: '1' },
    { messageType: 'Refferal', modeTypeId: '2' },
    { messageType: 'Redeem', modeTypeId: '3' },
  ];
  userText!: any;
  submitted = false;
  messagecontent!: string;
  public isVisibleSuccess: boolean = false;
  public isVisibleDanger: boolean = false;
  public isVisibleWarning: boolean = false;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService, private tokenStorage: TokenStorageService,
    private router: Router, private EncrDecr: EncrDecrServiceService, private renderer: Renderer2,) { }


  ngOnInit(): void {
    this.merchantId = this.route.snapshot.params['id'];
    this.getMerchantbyId(this.merchantId);
    // this.GettemplateList();
    this.GetModeList();
    this.uploadForm = new FormGroup({
      merchantId: new FormControl('', []),
      messageContent: new FormControl('', []),
      messageTypeId: new FormControl('', []),
      modeTypeId: new FormControl('', []),
      recStatus: new FormControl('', []),
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

  selectedValue!:number;
  onDropdownChange(event: Event) {
    debugger;
    const selectedValue = (event.target as HTMLSelectElement).value;
  

    if (selectedValue == "1" ) {
      this.showDiv = {
        current: true,
        next: false
      }
    }
    else {
      this.showDiv = {
        current: false,
        next: true
      }
    }

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


  public GetModeList() {
    this.appService.GetAll("api/SMSTemplate/GetMessageTypeDDL").subscribe(
      (x: any) => {
        this.ModeLists = x.responseData;
        console.log(x.responseData);
      });

  }

  //create new Template
  public createTemplate(formData: any) {
    debugger;
    let AdduserModel: addMessageTemplate = {
      "templateId": 0,
      "messageTypeId": formData.messageTypeId,
      "modeTypeId": formData.modeTypeId,
      "merchantId": this.merchantId,
      "messageContent": formData.messageContent,
      "recStatus": "A",
      "createdBy": 0,
      "messsageType": "",
      "createdDate": new Date(),
      "modifyBy": 0,
      "modifyDate": new Date(),

    }
    if (this.uploadForm.valid) {
      this.appService.Add('api/SMSTemplate/AddSMSTemplate', AdduserModel)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe((data: any) => {
          let statuscode: number = data.responseStatusCode;

          switch (statuscode) {
            case 200:
              debugger;

              Swal.fire({
                title: 'Success',
                text: 'Message Added Successfully.',
                icon: 'success',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false

              }).then(function () {

              });
              this.router.navigate(['/merchant/merchantedit', this.merchantId], { relativeTo: this.route });

              break;

            case 212:
              Swal.fire({
                title: 'Warning',
                text: 'Something Went wrong.',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
              break;
            case 500:

              Swal.fire({
                title: 'Error',
                text: 'Error Status',
                icon: 'error',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
              break;
            case 601:
              Swal.fire({
                title: 'Duplication',
                text: 'Mobile Number is Duplicate',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
              break;
            case 602:
              Swal.fire({
                title: 'Duplication',
                text: 'Duplicate Email',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
              break;
            case 603:
              Swal.fire({
                title: 'Duplication',
                text: 'Duplicate Template Status',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });

              break;
            case 400:
          }
          // if (data.responseStatusCode == 200 ) {
          //   this.messagecontent = 'Template add Successfully.',          
          //   this.router.navigate(['/merchant/merchantedit',this.merchantId], { relativeTo: this.route });

          // }       

        },);

    }
  }
  CancelForm() {
    this.router.navigate(['/merchant/merchantedit/', this.merchantId], { relativeTo: this.route });

  }
}
