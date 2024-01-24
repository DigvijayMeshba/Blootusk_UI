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




@Component({
  selector: 'app-customerstatement',
  templateUrl: './customerstatement.component.html',
  styleUrls: ['./customerstatement.component.scss']
})
export class CustomerstatementComponent {

  customerName!:string;
  OpeningBal!:number;
  merchantCode:string | null = null;
  customerCode:string| null = null;;
  fromDate: Date | null = null;
  toDate: Date | null = null;
  public page: number = 1;
  
  public count = 10;
  public StatementList: any = [];

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,public appService: AppService,
    private route: ActivatedRoute,private excelService: ExcelService , private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,)
   {
      
   }
     get f() { return this.uploadForm.controls; }
     
   uploadForm!:FormGroup; 
   submitted = false; 
   ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
     
      merchantCode: new FormControl('', []),
      customerCode: new FormControl('', []),
      fromDate: new FormControl('', []),
      toDate: new FormControl('', []),
   
    })
    this.SubmitCustomerStatementList();
  }
  public submit() { 
    this.submitted = true;    
  }

  public getPageData(): any[] {
    debugger;
    let allStatementList;
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
  if(this.StatementList != null)
  {
       allStatementList=  this.StatementList.slice(startIndex, endIndex);
  }
  return  allStatementList;      
  }


  SubmitCustomerStatementList()
  {    
    debugger;
  //  let GetCustomerStatement: custmerchtStatement = formData;  
   
    let ListOfStatement: custmerchtStatement = {
   
     "merchantCode":  this.merchantCode == '' ? "":this.merchantCode,
     "customerCode": this.customerCode = ""? "":this.customerCode,
     "fromDate":this.fromDate = ""? new Date:this.fromDate,
     "toDate":  this.toDate = ""?new Date:this.toDate,
    }   
  
      // this.appService.Add("api/AdminDashbaord/Customerstatement",ListOfStatement)
      // .pipe(
      //   catchError((error) => {          
      //     return throwError(error); 
      //   })).subscribe((data: any) => {    
        
      //     this.StatementList = data.customerTransactions
          
      //     this.customerName = data.customerName;  
      //     this.StatementList = data.merchantTransactions;
      //     this.OpeningBal =data.openingBalance;

      //     console.log('Statement', data.customerTransactions)
      //     console.log('StatementList', this.StatementList)
               
      // },);  

      this.appService.Add("api/AdminDashbaord/Customerstatement",ListOfStatement)
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


  public ClearSearchdata()
  {
    this.merchantCode =null;
    this.customerCode = null;
    this.fromDate = null;
    this.toDate =null;
    this.SubmitCustomerStatementList();
    this.getPageData();
  }

  exportDataToExcel(): void {
    this.excelService.exportToExcel(this.StatementList, 'Statementdata', 'StatementSheet');  
  }
  

  public onPageChanged3(page: number) {
    debugger;
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


