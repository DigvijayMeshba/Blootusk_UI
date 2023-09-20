import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.scss']
})
export class CustomerdashboardComponent {

CustId:any;
Count!:number;

constructor(  private _authService: AuthenticationService, private _router: Router,
  private tokenStorage: TokenStorageService,public appService: AppService,private route: ActivatedRoute,) 
{ }

ngOnInit(): void {
  this.getcount();
}


public GetList()
{
  debugger;
  this._router.navigate(['/customer/referrallist'], { relativeTo: this.route });
  
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
   
}

