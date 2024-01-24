import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent {

  groupedBarChart: any;
  groupedBarChart1: any;
  groupedBarChart2: any;
  groupedBarChart3: any;

  Users !:number;
  UsersMtd !:number;
  UserRefferal !:number;
  UserWalkIn !:number;
  FrequentUserVisit !:number;
  FrequentUser !:number;
  Merchants !:number;
  MerchantsMtd !:number;
  Points !:number;
  PointsMtd !:number;
  SignInPoint !:number;
  RefferalPoint !:number;      
  EarnPoint !:number;
  ReddemPoints !:number;
  ReddemPointsMtd !:number;  
  Campaign !:number;
  CampaignMtd !:number;
  Coupon !:number;
  CouponRedeem !:number;
  CouponTransfer !:number;
  MerchantsPending !:number;

  MerchantList: any[] = []; 
  uploadForm!:FormGroup; 
  selectedMerchantId: any;

  constructor(public appService: AppService,) { }

  // ngOnInit(): void {
  //   this.uploadForm = new FormGroup({
  //     merchantId : new FormControl('', [Validators.required]),
  //   });

    ngOnInit(): void {
      this.viewMerchantData(0);
      // Create the form group and add form controls
      this.uploadForm = new FormGroup({
        merchantId: new FormControl('')
      });
     



    this.GetMerchantList();
     // Chart Color Data Get Function

     this._groupedBarChart('["--vz-primary", "--vz-success"]');
     this._groupedBarChart1('["--vz-primary", "--vz-success"]');
     this._groupedBarChart2('["--vz-primary", "--vz-success"]');
     this._groupedBarChart3('["--vz-primary", "--vz-success"]');
  }

    // Chart Colors Set
    private getChartColorsArray(colors:any) {
      colors = JSON.parse(colors);
      return colors.map(function (value:any) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
              if (color) {
              color = color.replace(" ", "");
              return color;
              }
              else return newValue;;
          } else {
              var val = value.split(',');
              if (val.length == 2) {
                  var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                  rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                  return rgbaColor;
              } else {
                  return newValue;
              }
          }
      });
    }

  private _groupedBarChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.groupedBarChart = {
      series: [{
          name: "Walk In",
          data: [44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
        },
        {
          name: "Referral",
          data: [53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
        },
      ],
      chart: {
        type: "bar",
        height: 310,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: "8px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

  private _groupedBarChart1(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.groupedBarChart1 = {
      series: [{
          name: "Points Earn",
          data: [44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
        },
        {
          name: "Points Redeemed",
          data: [53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
        },
      ],
      chart: {
        type: "bar",
        height: 310,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: "8px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

  private _groupedBarChart2(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.groupedBarChart2 = {
      series: [{
          name: "Coupons",
          data: [44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
        },
        {
          name: "Redeemed",
          data: [53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
        },
      ],
      chart: {
        type: "bar",
        height: 310,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: "8px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

  private _groupedBarChart3(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.groupedBarChart3 = {
      series: [{
          name: "Visits",
          data: [44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
        },
        {
          name: "Users",
          data: [53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
        },
      ],
      chart: {
        type: "bar",
        height: 310,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: "8px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

  GetMerchantList() {
    this.appService.GetAll("api/AdminDashbaord/GetMerchantDDL").subscribe(
      (x: any) => {
        this.MerchantList = x.responseData;     
      });
  }

  viewMerchantData(merchantId: any) {
debugger;


    this.appService.getById("api/AdminDashbaord/AdminDashboard/", merchantId)
    .subscribe(data => {  
      console.log('test', data);
      
     this.Users = data.users;
      this.UsersMtd =data.usersMtd;
      this.UserRefferal =data.userRefferal;
      this.UserWalkIn =data.userWalkIn;
      this.FrequentUserVisit =data.frequentUserVisit;
      this.FrequentUser =data.frequentUser;
      this.Merchants =data.merchants;
      this.MerchantsMtd =data.merchantsMtd;
      this.MerchantsPending = data.merchantsPending;
      this.Points =data.points;
      this.PointsMtd =data.pointsMtd;
      this.SignInPoint =data.signInPoint;
      this.RefferalPoint =data.refferalPoint;      
      this.EarnPoint =data.earnPoint;
      this.ReddemPoints =data.reddemPoints;
      this.ReddemPointsMtd =data.reddemPointsMtd;  
      this.Campaign =data.campaign;
      this.CampaignMtd =data.campaignMtd;
      this.Coupon =data.coupon;
      this.CouponRedeem =data.couponRedeem;
      this.CouponTransfer =data.couponTransfer;

      
    
    
    });
  
    // You can perform further actions with the merchantId as needed
  }

}
