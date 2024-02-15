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
import * as XLSX from 'xlsx';
import { ExcelService } from '../services/excel.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-merchantstatement',
  templateUrl: './merchantstatement.component.html',
  styleUrls: ['./merchantstatement.component.scss']
})
export class MerchantstatementComponent {
  merchantCode!:number;
  customerCode:string | null = null;
 // fromDate!:Date;
  public page: number = 1;
  public count = 10;
  public StatementList: any = [];
  fromDate!: Date;
  toDate!: Date;
  MerchantList: any[] = []; 
  merchantName!:string;
  OpeningBal!:number;
  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,public appService: AppService,
    private route: ActivatedRoute,private excelService: ExcelService,
    private datePipe: DatePipe,
    private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
   )
   {   
    // this.SubmitMerchantStatementList();
        this.GetMerchantList();
   }
   uploadForm!:FormGroup; 
   submitted = false; 

   ngOnInit(): void {
    this.GetMerchantList();    

    this.uploadForm = this.formBuilder.group({
      merchantId: new FormControl('', [Validators.required]),
      CustPhoneNo: new FormControl('', []),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),

    })

  }

  get f()
  {   
    return this.uploadForm.controls;   
  }  

public validateControl = (controlName: string) => {
  return this.uploadForm.controls[controlName].invalid && this.uploadForm.controls[controlName].touched
}

public hasError = (controlName: string, errorName: string) => {
  return this.uploadForm.controls[controlName].hasError(errorName)
}
  public submit() { 
    this.submitted = true;    
  }

  SubmitMerchantStatementList(formData: custmerchtStatement )
  {
    
 
    let AddMerchantModel: custmerchtStatement = formData;  
    AddMerchantModel.fromDate = this.datePipe.transform(AddMerchantModel.fromDate, 'yyyy-MM-dd HH:mm:ss');
    AddMerchantModel.toDate = this.datePipe.transform(AddMerchantModel.toDate, 'yyyy-MM-dd HH:mm:ss');

       this.appService.Add("api/AdminDashbaord/MerchantStatement",AddMerchantModel)
       .pipe(
         catchError((error) => {          
           return throwError(error); 
         })).subscribe((data: any) => {  
          console.log('MerStatement',data)
          this.merchantName = data.merchantName;  
           this.StatementList = data.merchantTransactions;
           this.OpeningBal =data.openingBalance; 
           console.log('Statementmerchant', data)                
       },);  

  }


  GetMerchantList() {
    this.appService.GetAll("api/AdminDashbaord/GetMerchantDDL").subscribe(
      (x: any) => {
        this.MerchantList = x.responseData;     
      });
  }

  

  public getPageData(): any[] {
 
  
  let allStatementList;
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
  if(this.StatementList != null)
  {
       allStatementList=  this.StatementList.slice(startIndex, endIndex);
  }
  return  allStatementList;  
  }

 
public onPageChanged3(page: number) {
  
  this.page = page;
  window.scrollTo(0, 0);
}

public getPageNumbers3(): number[] {
  return Array.from({ length: this.getTotalPages3() }, (_, i) => i + 1);
}

public getTotalPages3(): number {
return Math.ceil(this.StatementList.length / this.count);
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

public ClearSearchdata()
{
  this.uploadForm.reset();

  this.getPageData();
}

exportDataToExcel(): void {
  this.excelService.exportToExcel(this.StatementList, 'Statementdata', 'StatementSheet');  
}

}
