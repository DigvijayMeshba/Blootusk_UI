import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-referrallist',
  templateUrl: './referrallist.component.html',
  styleUrls: ['./referrallist.component.scss']
})
export class ReferrallistComponent {
CustomerList!:any [];
customerId!:number;
public page: number = 1;
public count = 10;
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
    return this.CustomerList.slice(startIndex, endIndex);
  }

   public GettemplateList()
   {
       this.appService.getById("api/User/GetCustomerListForRefferal?CustId=",this.customerId).subscribe(
       (x: any) => {
         this.CustomerList = x.responseData.customerList;
         console.log('ListCustref',x.responseData);
       });
     
   }


}
