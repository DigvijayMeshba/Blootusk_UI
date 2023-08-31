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
    public count = 8;
    public SearchKeyword: any;
    merchnatCode :string;
    merchnatName :string;
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
      this.merchnatName = '';
      this.mobileNo ='';
      this.approvalStatus = '';
     }
  
    ngOnInit(): void {          
   //   this.GetAllUserList();
    }
  
    //List of All Company
    public GetAllMerchantList() {


    let edituserModel: listMerchant = {
      "merchantCode": this.merchnatCode == ''? "":this.merchnatCode,
      "merchantPhoneNumber": this.mobileNo == ''? "":this.mobileNo,      
      "merchantName": this.merchnatName == ''? "":this.merchnatName,
      "approvalStatus": this.approvalStatus == ''? "":this.approvalStatus     
    }   
    console.log(edituserModel);
    debugger;
    //var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'M1110001');
    if( edituserModel.merchantPhoneNumber != '')
    {
      edituserModel.merchantPhoneNumber = this.EncrDecr.set('12$#@BLOO$^@TUSK', edituserModel.merchantPhoneNumber);
    }

    if(edituserModel.merchantCode != ''|| edituserModel.merchantName != ''||edituserModel.merchantPhoneNumber != ''|| edituserModel.approvalStatus !='')
    {
      this.appService.GetAllList("api/Merchant/GetAllMerchant",edituserModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })).subscribe((data: any) => {    
          
          console.log(data.responseData)
          this.MerchantList = data.responseData  

         if(data.responseData[0].approvalStatus == "I")
         {
            this.MerchantList.approvalStatus = 'InProgress';
         }
         
          if(data.responseData.length == 0)
          {
            Swal.fire({
              title:'Data not found',
              icon: 'info',
              confirmButtonColor: '#364574'
            });
          }
        
      },);  
  
    }
    else
    {
      Swal.fire({
        title:'Oops...',
        text:'Please fill at least one field',
        icon: 'info',
        confirmButtonColor: '#364574'
      });
    }
        
      }
  
    deleterecord(object: any) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this user?',
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
            this.appService.DeleteMerchant("api/Merchant/DeleteMerchant/", parseInt(object.merchantId)).subscribe(data => {     
  
              Swal.fire({
                title: 'Deleted!',
                text: 'The merchantId has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#364574'
              });
            });
          }
        }
      });
    }
  
  
    ///Code for Pagination
    public getPageData(): any[] {
      const startIndex = (this.page - 1) * this.count;
      const endIndex = startIndex + this.count;
      return this.MerchantList.slice(startIndex, endIndex);
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
   
  }

