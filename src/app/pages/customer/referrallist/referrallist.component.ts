import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
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
  constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService,private route: ActivatedRoute) {

    this.customerId = this.route.snapshot.params['id'];
   // this.GettemplateList()
   }

   public getPageData(): any[] {
    const startIndex = (this.page - 1) * this.count;
    const endIndex = startIndex + this.count;
    return this.CustomerList.slice(startIndex, endIndex);
  }

   public GettemplateList()
   {
       this.appService.GetAll("api/User/GetCustomerList",).subscribe(
       (x: any) => {
         this.CustomerList = x.responseData;
         console.log(x.responseData);
       });
     
   }


}
