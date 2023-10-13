import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import * as QRCode from 'qrcode'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.scss']
})
export class CustomerdashboardComponent {

CustId:any;
Count!:number;
RewardPointCount!:number;
receivedLink!: string;
qrCode!: string;

constructor( private modalService: NgbModal, private _authService: AuthenticationService, private _router: Router,
  private tokenStorage: TokenStorageService,public appService: AppService,private route: ActivatedRoute,) 
{ }

ngOnInit(): void {
  this.getcount();
  this.getRewardPointcount();
  this.getreffrallink()
}


public GetList()
{
  debugger;
  this._router.navigate(['/customer/referrallist'], { relativeTo: this.route });
  
}

public GetCouponList()
{
  this._router.navigate(['/customer/discountcouponlist'], { relativeTo: this.route });
}

public GetRewardList()
{
  this._router.navigate(['/customer/rewardpointlist'], { relativeTo: this.route });
}

public getcount()
{
  this.CustId =  this.tokenStorage.getcustcode();

    debugger;
    this.appService.getById("api/User/GetReferalCount/",this.CustId).subscribe(data => {
    console.log('custdata', data.responseData)
     this.Count = data.responseData;

   
    });
  
}


public getRewardPointcount()
{
  this.CustId =  this.tokenStorage.getcustcode();


    debugger;
    this.appService.getById("api/User/GetRewardPointCount/",this.CustId).subscribe(data => {
    console.log('custdata', data.responseData)
     this.RewardPointCount = data.responseData;

   
    });
  
}

public getreffrallink()
{
  this.CustId =  this.tokenStorage.getcustcode();

  debugger;
    this.appService.getById("api/User/GetRefferalLink/",this.CustId).subscribe(data => {
      console.log(data.responseData)
       this.receivedLink = data.responseData;
  });
}

openModalQR(qrcontent: any) {  

  
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

 
  array = ['Qr'];

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
   
}

