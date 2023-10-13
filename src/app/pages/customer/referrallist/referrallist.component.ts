import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import Swal from 'sweetalert2';
import { listReffreal } from '../customer';
@Component({
  selector: 'app-referrallist',
  templateUrl: './referrallist.component.html',
  styleUrls: ['./referrallist.component.scss']
})
export class ReferrallistComponent {
CustomerList!:any [];
customerId!:number;
public page: number = 1;
keyword! :string;
public count = 10;
  constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService,
    private route: ActivatedRoute,private tokenStorage: TokenStorageService,private router: Router) {

  //  this.customerId = this.route.snapshot.params['id'];
   // this.GettemplateList()
   }


   ngOnInit(): void {
    debugger;
    this.customerId =this.tokenStorage.getcustcode();
    this.GetRewardPointList()
   }


  public getPageData(): any[] {
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
    return this.CustomerList.slice(startIndex, endIndex);
  }

   public GetRewardPointList()
   {
    debugger;
    let edituserModel: listReffreal = {
      "CustomerId" : this.customerId,
      "Keyword": this.keyword == undefined? "" : this.keyword,
       "pageNumber" : this.page ==0 ? 0:this.page,
       "MerchantID" : 0,
    }   
       this.appService.GetAllList("api/User/GetCustomerListForRefferal",edituserModel).subscribe(
       (x: any) => {
         this.CustomerList = x.responseData.customerList;
         console.log('ListCustref',x.responseData);

         if(x.responseData.length == 0)
         {
           Swal.fire({
             title:'Data not found',
             icon: 'info',
             confirmButtonColor: '#364574',
             allowOutsideClick: false,
             allowEscapeKey: false
      
           });
          }
       });
   }


   public ClearSearchdata()
   {
     debugger;
     this.keyword = '';
     this.router.navigate(['/customer/rewardpointlist'], { relativeTo: this.route });
     this.GetRewardPointList()
   }

}
