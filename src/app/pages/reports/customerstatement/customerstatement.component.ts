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
import { ExcelService } from '../services/excel.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-customerstatement',
  templateUrl: './customerstatement.component.html',
  styleUrls: ['./customerstatement.component.scss']
})
export class CustomerstatementComponent {

  customerName!:string;
  OpeningBal!:number;
  merchantCode!:number;
  customerCode:string| null = null;;
  fromDate!: Date;
  toDate!: Date;
  fromDateddmmyyy!:Date;
  toDateddmmyyy!:Date;
  addRoleDeatil:any;  
  public page: number = 1;
  MerchantList: any[] = []; 
  
  public count = 10;
  public StatementList: any = [];

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,public appService: AppService,
    private route: ActivatedRoute,private excelService: ExcelService , private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,private datePipe: DatePipe,)
   {
    this.GetMerchantList();
   }
     get f() { return this.uploadForm.controls; }
     
   uploadForm!:FormGroup; 
   submitted = false; 
   ngOnInit(): void {
    this.addRoleDeatil = this.tokenStorage.GetRole();  
    this.uploadForm = this.formBuilder.group({
      merchantId: new FormControl('', []),
      CustPhoneNo: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),

    })
    
  }
  public submit() { 

    this.submitted = true;    
  }


  GetMerchantList() {
    this.appService.GetAll("api/AdminDashbaord/GetMerchantDDL").subscribe(
      (x: any) => {
        this.MerchantList = x.responseData;   
        console.log('MerchantList',this.MerchantList)  
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

 

  SubmitCustomerStatementList(formData: custmerchtStatement)
  {    
    debugger;

    if(this.uploadForm.valid || this.addRoleDeatil == "Customer" )
    {
      let AddMerchantModel: custmerchtStatement = formData; 
      
    if(this.addRoleDeatil == "Customer")
    {
      AddMerchantModel.CustPhoneNo = this.tokenStorage.GetPhoneNO();
    }
      AddMerchantModel.fromDate = this.datePipe.transform(AddMerchantModel.fromDate, 'yyyy-MM-dd HH:mm:ss');
      AddMerchantModel.toDate = this.datePipe.transform(AddMerchantModel.toDate, 'yyyy-MM-dd HH:mm:ss');
      AddMerchantModel.merchantId = Number(AddMerchantModel.merchantId);
       
        this.appService.Add("api/AdminDashbaord/Customerstatement",AddMerchantModel)
        .pipe(
          catchError((error) => {          
            return throwError(error); 
          })).subscribe((data: any) => {  
           console.log('MerStatement',data)
  
           this.customerName = data.customerName;  
           this.StatementList = data.customerTransactions;
           this.OpeningBal =data.openingBalance;
            console.log('Statement', data)
            console.log('StatementList', this.StatementList)               
        },); 
    }
  }


  public ClearSearchdata()
  {
    this.uploadForm.reset();
    this.getPageData();
  }

  exportDataToExcel(): void {
    this.excelService.exportToExcel(this.StatementList, 'Statementdata', 'StatementSheet');  
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
  
}


