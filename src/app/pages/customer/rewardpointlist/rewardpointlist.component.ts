import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { listReward } from '../customer';
import Swal from 'sweetalert2';
import { mode } from 'crypto-js';
import { event } from 'jquery';

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
rewardPointId:number = 0;
selectedValue: string = '';
CustPhoneNumber!:string;

  TransactionTypeLists = [   
    { name: 'Signup', id:'1' },
    { name: 'Refferal', id:'2' },
    { name: 'Redeem', id:'3' },
  ];


  phoneNumber!:string;

  constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService,
    private route: ActivatedRoute,private tokenStorage: TokenStorageService,private router: Router) {

   // this.customerId = this.route.snapshot.params['id'];
   // this.GettemplateList()
   }


   ngOnInit(): void {
    
    this.customerId =this.tokenStorage.getcustcode();
    this.phoneNumber = this.tokenStorage.GetPhoneNO();    
    this.GettemplateList()
   }


  public getPageData(): any[] {
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
    return this.CustomerRewardList.slice(startIndex, endIndex);
  }

  ShareCaptiitalTypeIdPost: any

  onChangeShareCapitalType(event: any) {

    if (event.target.value != undefined)
    {
      this.rewardPointId = event.target.value;     
    } 
    else 
     {    
     
       event.target.value.options = 0;     
    }

  }

   public GettemplateList()
   {

    if(this.rewardPointId == undefined)
    {
       this.rewardPointId = 0;
    }
  this.CustPhoneNumber = this.EncrDecr.set('12$#@BLOO$^@TUSK', this.phoneNumber);
    
       this.appService.GetAllRewardPonit(
        "api/User/GetCustomerListForReward?rewardPointId=" + this.rewardPointId +"&PhoneNumber="+this.phoneNumber +""
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
          this.rewardPointId = 0;
       });
   }
eventreward:undefined;     
   public ClearSearchdata()
   {
          
      
    // this.onChangeShareCapitalType(this.eventreward)
     this.selectedValue ='';
    //  this.router.navigate(['/customer/rewardpointlist'], { relativeTo: this.route });
     this.GettemplateList()
   }

}
