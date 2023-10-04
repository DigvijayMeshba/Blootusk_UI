import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { listReward } from '../customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rewardpointlist',
  templateUrl: './rewardpointlist.component.html',
  styleUrls: ['./rewardpointlist.component.scss']
})
export class RewardpointlistComponent {

  CustomerRewardList!:any [];
customerId!:number;
merchantId!:number;
public page: number = 1;
public count = 10;
rewardPointId!:number;

  TransactionTypeLists = [   
    { name: 'Signup', id:'1' },
    { name: 'Refferal', id:'2' },
    { name: 'Redeem', id:'3' },
  ];


  constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService,
    private route: ActivatedRoute,private tokenStorage: TokenStorageService,) {

  //  this.customerId = this.route.snapshot.params['id'];
   // this.GettemplateList()
   }


   ngOnInit(): void {
    debugger;
    this.customerId =this.tokenStorage.getcustcode();
    
    this.GettemplateList()
   }


  public getPageData(): any[] {
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
    return this.CustomerRewardList.slice(startIndex, endIndex);
  }

   public GettemplateList()
   {

    if(this.rewardPointId == undefined)
    {
       this.rewardPointId = 0;
    }

    
       this.appService.GetAllRewardPonit(
        "api/User/GetCustomerListForReward?rewardPointId=" + this.rewardPointId +"&CustomerId= "+this.customerId+""
     
        ).subscribe(
       (x: any) => {
         this.CustomerRewardList = x.responseData.customerList;
         console.log('testrewardpoint' , this.CustomerRewardList )


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



}
