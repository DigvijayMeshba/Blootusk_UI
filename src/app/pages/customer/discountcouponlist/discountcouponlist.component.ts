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
import * as QRCode from 'qrcode'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { listCustCoupon } from '../customer';
import { url } from 'inspector';

@Component({
  selector: 'app-discountcouponlist',
  templateUrl: './discountcouponlist.component.html',
  styleUrls: ['./discountcouponlist.component.scss']
})
export class DiscountcouponlistComponent {

  customerId!:number;

  public CustomerCouponList: any = [];
  qrCode!: string;
  receivedLink!: string;
  phoneNumber!:string;
  CustPhoneNumber!:string;
  public page: number = 1;
  public count = 12;
  merchantName!:string;
  array = ['Qr'];

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,public appService: AppService,
    private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
    private router: Router,private EncrDecr: EncrDecrServiceService,)
   {
      
   }
   
   ngOnInit(): void {
    this.customerId =this.tokenStorage.getcustcode();
    this.CustPhoneNumber = this.tokenStorage.GetPhoneNO();
    this.phoneNumber = this.EncrDecr.set('12$#@BLOO$^@TUSK', this.CustPhoneNumber);
    this.GetCouponList(); 
  }

  GetCouponList()
  {
    let GetCouponListModel: listCustCoupon = {         
      "phoneNumber": this.phoneNumber == ''? "":this.phoneNumber,  
      "customerId" : 0,
      "pageNumber" : this.page,
    } 

    // this.appService.GetAllList("api/CouponMaster/GetCustomerCouponList", GetCouponListModel).subscribe
    //   (data => {  
    //       this.CustomerCouponList = data.responseData;
    //      console.log('CustomerCouponList' , this.CustomerCouponList )
    //   });
      this.appService.GetAllList("api/CouponMaster/GetCustomerCouponList",GetCouponListModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })).subscribe((data: any) => {    
          
          this.CustomerCouponList = data.responseData.couponList 
        
          if(data.responseData.length == 0)
          {
             this.swalMessage('Data not found')
          }        
      },);  
  

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

  openModalQR(qrcontent: any,CouponCode:any,SourceName:any) {  
    this.merchantName = SourceName;
    this.receivedLink = "/" + CouponCode + "/" +  this.CustPhoneNumber;
   // this.receivedLink = 'http://crm.blootusk.com/CouponCode='  + CouponCode + "/" +  this.CustPhoneNumber;
   this.receivedLink = 'http://crm.blootusk.com/#/C/'  + CouponCode + "/" +  this.CustPhoneNumber;
   
    QRCode.toDataURL( this.receivedLink, (err, url) => {
      
      if (err) {
        console.error(err);
      } else {
        this.qrCode = url;
      }
    });
    this.modalService.open(qrcontent, { size: 'sm' }); 
  }

    public trivialDownload() {
      console.log("Downloading image one by one, without a loop");
      this._download(0, this.array);
    }

    private _download(index:any, array:any) {
      
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

    ///Code for Pagination
    public getPageData(): any[] {
      
      let allmerchantList;
      const startIndex = (this.page - 1) * this.count;
      const endIndex = startIndex + this.count;
    if(this.CustomerCouponList != null)
    {
         allmerchantList=  this.CustomerCouponList.slice(startIndex, endIndex);
    }
    return  allmerchantList;      
    }

  public onPageChanged3(page: number) {
    
    this.page = page;
    window.scrollTo(0, 0);
  }
  
  public getPageNumbers3(): number[] {
    return Array.from({ length: this.getTotalPages3() }, (_, i) => i + 1);
  }
  
  public getTotalPages3(): number {
  return Math.ceil(this.CustomerCouponList.length / this.count);
  }
      ///Code for Pagination

      ShareInputMessage(referralLink: string): void {
  
        const tempInputElement = document.createElement('textarea');
        tempInputElement.value = referralLink;
        document.body.appendChild(tempInputElement);
    
        tempInputElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempInputElement);
     
      }


  shareMessage() {
    const message = 'Check out this amazing message!';
    const websiteUrl = 'https://your-website.com'; // Replace with your actual website URL

    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'Shared Message',
        text: `${message}\n\n${websiteUrl}`,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: If Web Share API is not supported, provide an alternative way to share the message
      console.log('Web Share API is not supported. Fallback:');
      // Implement your custom fallback here
    }
  }


  shareReferralLink(referralLink: string, sourcename: string) {
      
      let messagetitle = "Hi, I just discovered a great place called " + sourcename + ". Show this coupon";
      

    const urlParts = window.location.href.split('#');
    const urlWithoutHash = urlParts.length > 0 ? urlParts[0] : '';

  // Define the URL
  const testurl = urlWithoutHash + '#/C/' + referralLink;

  if (navigator.share) {
    const websiteUrl = ''+testurl+''; // Replace with your actual website URL
  
    navigator.share({
      title: 'Shared Message',
      text: `${messagetitle}\n\n${testurl} at store and enjoy coupon benefits`,
    //  url:  '#/C/' + referralLink // `${messagetitle}\n\n${testurl} at store and enjoy coupon benefits`, // You can include the URL in the 'text' property
  })
  
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback: If Web Share API is not supported, provide an alternative way to share the message
    console.log('Web Share API is not supported. Fallback:');
    // Implement your custom fallback here
  }
  
}      
     
}
