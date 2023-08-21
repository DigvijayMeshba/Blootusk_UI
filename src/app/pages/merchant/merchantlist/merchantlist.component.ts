import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { listMerchant } from '../merchant';

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
    
  
    constructor(public appService: AppService) {

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
      "merchantCode": this.merchnatCode,
      "merchantPhoneNumber": this.mobileNo,
      
      "merchantName": this.merchnatName,
      "approvalStatus": this.approvalStatus      
    }   
console.log(edituserModel);
debugger;
      this.appService.GetAllList("api/Merchant/GetAllMerchant",edituserModel).subscribe(data => {
        this.MerchantList = data;      
        console.log(data);
      });
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
            this.appService.Delete(`api/Merchant/DeleteMerchant?merchantId=${object.merchantId}`, {}).subscribe(data => {
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

