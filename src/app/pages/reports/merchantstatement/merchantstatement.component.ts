import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

import {  catchError, throwError } from 'rxjs';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { custmerchtStatement } from '../custmerchtStatement';

@Component({
  selector: 'app-merchantstatement',
  templateUrl: './merchantstatement.component.html',
  styleUrls: ['./merchantstatement.component.scss']
})
export class MerchantstatementComponent {

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,)
   {
      
   }
     get f() { return this.uploadForm.controls; }
   uploadForm!:FormGroup; 
   submitted = false; 
   ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
     
      merchantCode: new FormControl('', [Validators.required]),
      customerCode: new FormControl('', []),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
   
    })
  }
  public submit() { 
    this.submitted = true;    
  }

  SubmitCustomerStatementList(formData: custmerchtStatement)
  {
    
    let GetCustomerStatement: custmerchtStatement = formData;  
    
    GetCustomerStatement.merchantCode,
    GetCustomerStatement.customerCode = ""? "":GetCustomerStatement.customerCode,
    GetCustomerStatement.fromDate,
    GetCustomerStatement.toDate,   
  
      this.appService.Add("api/CouponMaster/GetCustomerCouponList",GetCustomerStatement)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })).subscribe((data: any) => {    
          
          if(data.responseData.length == 0)
          {
             this.swalMessage('Data not found')
          }        
      },);  
  

  }

  swalMessage(swalTitle:any)
{
  Swal.fire({
    title:swalTitle,
    icon: 'info',
    confirmButtonColor: '#364574',
    allowOutsideClick: false,
    allowEscapeKey: false
    
  });
}

}
