import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import * as QRCode from 'qrcode'; 
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { listCustCoupon } from 'src/app/pages/customer/customer';
import { AppService } from 'src/app/app.service';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-redeem-coupon',
  templateUrl: './redeem-coupon.component.html',
  styleUrls: ['./redeem-coupon.component.scss']
})
export class RedeemCouponComponent {
  array = ['Qr'];
  qrCode!: string;
  CustPhoneNumber!:string;
  customerId!:number;
  receivedLink!: string;
  phoneNumber!:string;

  CouponTailtal !:string;
  CouponDescription!:string;
  CouponDiscount!:number;
  MerchantName!:number;
  CoponCode!:string;
  ExpiryDate!:Date;

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,public appService: AppService,)
   {
    debugger; 

   // this.GetCoupondata(ecodeMerchantCode);
    //this.customerId =this.tokenStorage.getcustcode();
    //this.CustPhoneNumber = this.tokenStorage.GetPhoneNO();
    //this.phoneNumber = this.EncrDecr.set('12$#@BLOO$^@TUSK', this.CustPhoneNumber);
   }
   ngOnInit(): void {
    debugger;
    let ecodeMerchantCode = this.route.snapshot.params['id'];   
   this.GetCoupondata(ecodeMerchantCode);
   }
   

  public trivialDownload() {
    console.log("Downloading image one by one, without a loop");
    this._download(0, this.array);
  }

  private _download(index:any, array:any) {
    debugger;
    if (index >= array.length) {
      console.log("Done!")
    } else {
      let docElem = document.getElementById(array[index].toString());
        html2canvas(docElem!).then((canvas) => {
          let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          let a = document.createElement('a');
          a.href = generatedImage;
          a.download = `${array[index]}.png`;
          a.click();
          // at this point, image has been downloaded, then call the next download.
          this._download(index + 1, array)
        });
    }
  }

  openModalQR(qrcontent: any,CouponCode:any) {  
    this.receivedLink = "/" + CouponCode + "/" +  this.CustPhoneNumber;
   // this.receivedLink = 'http://crm.blootusk.com/CouponCode='  + CouponCode + "/" +  this.CustPhoneNumber;
   this.receivedLink = 'http://crm.blootusk.com/#/C/'  + CouponCode + "/" +  this.CustPhoneNumber;
   
    QRCode.toDataURL( this.receivedLink, (err, url) => {
      debugger;
      if (err) {
        console.error(err);
      } else {
        this.qrCode = url;
      }
    });
    this.modalService.open(qrcontent, { size: 'sm' }); 
    }

    GetCoupondata(couponcode :any)
    {
      this.appService.getById("api/CouponMaster/GetCouponByCouponCode/",couponcode).subscribe(data => {
        
        console.log('QrData' , data)
        this.CouponTailtal  =data.responseData.couponTitle
        this.CouponDescription =data.responseData.couponDiscerption
        this.CouponDiscount=data.responseData.discountType
        this.MerchantName=data.responseData.merchantName
        this.CoponCode=data.responseData.couponCode
        this.ExpiryDate=data.responseData.endDate
       });  
    }

  
}
