import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import Swal from 'sweetalert2';
import { listReffreal } from '../customer';
import { UpdateCustMerchant } from 'src/app/account/signupuser/signupuser';
@Component({
  selector: 'app-refferal-link',
  templateUrl: './refferal-link.component.html',
  styleUrls: ['./refferal-link.component.scss']
})
export class RefferalLinkComponent
 {

  CustomerList!:any [];
  customerId!:number;
  phoneNumber!:string;
  toggleValue!:false;
  public page: number = 1;
  keyword! :string;
  public count = 10;
  isCopied!:boolean;
    constructor(public appService: AppService,private EncrDecr: EncrDecrServiceService,
      private route: ActivatedRoute,private tokenStorage: TokenStorageService,private router: Router) {
    }
  
     ngOnInit(): void {
      
      this.customerId =this.tokenStorage.getcustcode();
      this.phoneNumber = this.tokenStorage.GetPhoneNO();
      this.GetRewardPointList()
     }
  
    public getPageData(): any[] {
      const startIndex = (this.page - 1) * this.count;
      const endIndex = startIndex + this.count;
      return this.CustomerList.slice(startIndex, endIndex);
    }
  
     public GetRewardPointList()
     {        
      this.appService.getById("api/User/GetRefferalLinkList/",this.phoneNumber).subscribe(data => {
        console.log(data.responseData)
        this.CustomerList = data.responseData.referlist;        
    });  
  }


  // copyInputMessage(referralLink: string): void {
  
  //   const tempInputElement = document.createElement('textarea');
  //   tempInputElement.value = referralLink;
  //   document.body.appendChild(tempInputElement);

  //   tempInputElement.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(tempInputElement);

  //   // Use the Clipboard API as a fallback if execCommand is not supported
  //   if (navigator.clipboard) {
  //     navigator.clipboard.writeText(referralLink)
  //       .then(() => console.log('Text copied successfully'))
  //       .catch(err => console.error('Error copying text: ', err));
  //   }

  //   this.isCopied = true;

  //   // Reset the 'Copied!' message after a delay (e.g., 2 seconds)
  //   setTimeout(() => {
  //     this.isCopied = false;
  //   }, 2000);
  // }

  lastClickedButtonIndex: number | null = null;

copyInputMessage(referralLink: string, index: number): void {
  const tempInputElement = document.createElement('textarea');
  tempInputElement.value = referralLink;
  document.body.appendChild(tempInputElement);

  tempInputElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempInputElement);

  // Use the Clipboard API as a fallback if execCommand is not supported
  if (navigator.clipboard) {
    navigator.clipboard.writeText(referralLink)
      .then(() => console.log('Text copied successfully'))
      .catch(err => console.error('Error copying text: ', err));
  }

  this.lastClickedButtonIndex = index;

  // Reset the 'Copied!' message after a delay (e.g., 2 seconds)
  setTimeout(() => {
    this.lastClickedButtonIndex = null;
  }, 3000);
 }
  
     public ClearSearchdata()
     {
       
       this.keyword = '';
       this.router.navigate(['/customer/referrallist'], { relativeTo: this.route });
       this.GetRewardPointList()
     }

     

    copyData(copydata:any) {
      return JSON.stringify(copydata);
    }

    toggle(UserId:any,sms:any,index: number)
    {

      const  AddUsertDtail: UpdateCustMerchant  =  {    

        userMerchantMapperId : UserId,
        stopMessage :sms.checked,
        merchantId : 0,
        customerId : 0,
        referCode  :"",
        referBy : 0,
        approvlStatus : "",
      }   

     

      this.appService.Add('api/User/UpdateCustomerMerchant', AddUsertDtail).subscribe((data: any) => {
        let statuscode : number = data.responseStatusCode;
      console.log('adddata',data.responseData)
        switch(statuscode)
        {
              case 200:
          
           

        }
      })
    }
  
     shareReferralLink(referralLink: string) {
      
      const message = `Check out this referral link: ${referralLink}` ;
    
      if (navigator.share) {
        navigator
          .share({
            title: 'Share Referral Link',
            text: message,
            url: referralLink,
          })
          .then(() => console.log('Successfully shared'))
          .catch((error) => console.log('Error sharing:', error));
      } else {
        // Fallback for browsers that do not support the Web Share API
        // Open a WhatsApp share link if WhatsApp is installed
        const isWhatsAppInstalled = /WhatsApp/.test(navigator.userAgent);
    
        if (isWhatsAppInstalled) {
          const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
          window.location.href = whatsappLink;
        } else {
          // Fallback for other browsers
          alert(`Share this link: ${referralLink}`);
        }
      }
    }
    
  }
  
     
    
