import { Component } from '@angular/core';
;
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { data } from 'jquery';
import { Observable, catchError, throwError } from 'rxjs';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-discountcouponlist',
  templateUrl: './discountcouponlist.component.html',
  styleUrls: ['./discountcouponlist.component.scss']
})
export class DiscountcouponlistComponent {

  customerId!:number;
  CustomerCouponList!:any [];
  constructor(public formBuilder: FormBuilder,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,)
   {
      
   }
   ngOnInit(): void {
    this.customerId =this.tokenStorage.getcustcode();
    this.GetCouponList(); 
  
  }

  GetCouponList()
  {
    debugger;
   
      this.appService.getById("api/CouponMaster/GetCustomerCouponList/", this.customerId).subscribe
      (data => {  
          this.CustomerCouponList = data.responseData.customerList;
          //type = percentage %
          //value 16

         console.log('CustomerCouponList' , this.CustomerCouponList )
      });
  }

}
