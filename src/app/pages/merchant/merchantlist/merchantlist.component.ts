import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { listMerchant } from '../merchant';
import { catchError, pipe, throwError } from 'rxjs';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';


@Component({
  selector: 'app-merchantlist',
  templateUrl: './merchantlist.component.html',
  styleUrls: ['./merchantlist.component.scss']
})
export class MerchantlistComponent {

    public MerchantList: any = [];
    public NewUserList: any = [];
    public page: number = 1;
    public count = 10;
    public SearchKeyword: any;
    merchnatCode :string;
    keyword! :string;
    mobileNo:string;
    approvalStatus:string;
    test :any;
  
    statusLists = [
      { name: 'New', id:'N' },
      { name: 'In Progress', id:'I' },
      { name: 'Verified', id:'V' },   
      { name: 'Rejected' , id:'R' },
    ];
  
    constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService) {

      this.merchnatCode ='';
      this.keyword = '';
      this.mobileNo ='';
      this.approvalStatus = '';
      this.GetAllMerchantList();
     }
  
    ngOnInit(): void {       

    //  this.GetAllMerchantList();
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


public ClearMerchantList()
{
  this.keyword ='',
    // // this.merchnatCode = 'a',
    // // this.mobileNo ='',
    // // this.approvalStatus = ''
    this.GetAllMerchantList()

    // let edituserModels: listMerchant = {
    //   // "merchantCode": this.merchnatCode == ''? "":this.merchnatCode,
    //   // "merchantPhoneNumber": this.mobileNo == ''? "":this.mobileNo,      
    //   "keyword": this.keyword == ''? "":this.keyword,
    //   // "approvalStatus": this.approvalStatus == ''? "":this.approvalStatus,    
    //    "pageNumber" : this.page ==0 ? 0:this.page
    // }   
    // this.appService.GetAllList("api/Merchant/GetAllMerchant", edituserModels)
    // .pipe(
    //   catchError((error) => {          
    //     return throwError(error); 
    //   })).subscribe((data: any) => {
    //     console.log(data.responseData)
    //     this.MerchantList = data.responseData  
    //     if(data.responseData.length == 0)
    //     {
    //       // this.swalMessage('Data not found')
    //     }
    // },);  
  
}

    //List of All Company
  public   GetAllMerchantList() {
    
    let edituserModel: listMerchant = {
      // "merchantCode": this.merchnatCode == ''? "":this.merchnatCode,
      // "merchantPhoneNumber": this.mobileNo == ''? "":this.mobileNo,      
      "keyword": this.keyword == ''? "":this.keyword,
      // "approvalStatus": this.approvalStatus == ''? "":this.approvalStatus,    
       "pageNumber" : this.page == 0? 0:this.page,
    }   
    
    //var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'M1110001');
    // if( edituserModel.merchantPhoneNumber != '')
    // {
    //   edituserModel.merchantPhoneNumber = this.EncrDecr.set('12$#@BLOO$^@TUSK', edituserModel.merchantPhoneNumber);
    // }

    // if(edituserModel.merchantCode != ''|| edituserModel.merchantName != ''||edituserModel.merchantPhoneNumber != ''|| edituserModel.approvalStatus !='')
    // {
      this.appService.GetAllList("api/Merchant/GetAllMerchant",edituserModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })).subscribe((data: any) => {    
          
          console.log('allmerchant',data.responseData.merchantList)
          this.MerchantList = data.responseData.merchantList  
          this.page =1;
        
         
          if(data.responseData.length == 0)
          {
             this.swalMessage('Data not found')
          }        
      },);  
  
    // }
    // else
    // {
    //   Swal.fire({
    //     title:'Oops...',
    //     text:'Please fill at least one field',
    //     icon: 'info',
    //     confirmButtonColor: '#364574',
    //     allowOutsideClick: false,
    //     allowEscapeKey: false
    //   });
    // }   
 }
  
    deleterecord(object: any) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to block this Merchant?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#364574',
        cancelButtonColor: 'rgb(243, 78, 78)',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          const index: number = this.MerchantList.indexOf(object);
          if (index !== -1) {
            this.MerchantList.splice(index, 1);

            
            this.appService.DeleteMerchant("api/Merchant/DeleteMerchant/", object.merchantId).subscribe(data => {     
              Swal.fire({
                title: 'Block!',
                text: 'The Merchant has been block successfully.',
                icon: 'success',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
            });
          }
        }
      });
    }
  
  
    ///Code for Pagination
    public getPageData(): any[] {
      
      let allmerchantList;
      const startIndex = (this.page - 1) * this.count;
      const endIndex = startIndex + this.count;
    if(this.MerchantList != null)
    {
         allmerchantList=  this.MerchantList.slice(startIndex, endIndex);
    }
    return  allmerchantList;      
    }
  
    public getTotalPages(): number {
      return Math.ceil(this.MerchantList.length / this.count);
    }
  
    public getPageNumbers(): number[] {
      return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
    }
  
    public onPageChanged(page: number) {
      this.page = page;
      window.scrollTo(0, 0);
  
    }


    
  showTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.style.display = 'block';
    }
  }

  hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }


public onPageChanged3(page: number) {
  
  this.page = page;
  window.scrollTo(0, 0);
}

public getPageNumbers3(): number[] {
  return Array.from({ length: this.getTotalPages3() }, (_, i) => i + 1);
}

public getTotalPages3(): number {
return Math.ceil(this.MerchantList.length / this.count);
}

   
  }

