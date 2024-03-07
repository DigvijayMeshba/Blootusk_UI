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


  adminCouponsGraphs:any;

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
  selectedMerchantId: any = 0;
  MerchantList: any[] = []; 
  uploadForm!:FormGroup; 
  //selectedMerchantId: any;
 


  constructor(public appService: AppService,) {

   
   }



    ngOnInit(): void {
      this.viewMerchantData();
      // Create the form group and add form controls
      this.uploadForm = new FormGroup({
        merchantId: new FormControl('')
      });

    this.GetMerchantList();
    
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

  private _groupedBarChart(usergraphdatares: any,colors:any) {
    colors = this.getChartColorsArray(colors);
    console.log('usergraph',usergraphdatares.userwainindata)
    let couponresdatas = usergraphdatares.userwainindata.replace(/'/g, '').split(', ');
    let CouponRedeemData =  usergraphdatares.userrefferaldata.replace(/'/g, '').split(', ');
    
    let dataArray = usergraphdatares.usermonthdata.replace(/'/g, '').split(', ');


    this.groupedBarChart = {
      series: [{
          name: "Walk In",
          data: couponresdatas,
        },
        {
          name: "Referral",
          data: CouponRedeemData,
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
        categories: dataArray,// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }



  private _groupedBarChart1(pointdatares: any,colors:any) {
    colors = this.getChartColorsArray(colors);
 debugger;
  let pointresdatas = pointdatares.pointearndata.replace(/'/g, '').split(', ');
  let pointRedeemData =  pointdatares.pointreddemdata.replace(/'/g, '').split(', ');  
  let pointdataArray = pointdatares.pointmonthdata.replace(/'/g, '').split(', ');

    this.groupedBarChart1 = {           


    series: [{
      name: "Points Earn",
      data: pointresdatas,// [44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
    },
    {
      name: "Redeem Point",
      data: pointRedeemData,//[53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
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
      // xaxis: {
      //   categories: pointdataArray,
      // },
      xaxis: {
        categories: pointdataArray,//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

  private _groupedBarChart2(coupondatares: any,colors:any) {
    colors = this.getChartColorsArray(colors);

  let couponresdatas = coupondatares.coupondata.replace(/'/g, '').split(', ');
  let CouponRedeemData =  coupondatares.couponredeemdata.replace(/'/g, '').split(', ');  
  let dataArray = coupondatares.monthdata.replace(/'/g, '').split(', ');
   

    this.groupedBarChart2 = {     
      series: [{
        name: "Coupons",
        data: couponresdatas,
      },
      {
        name: "Redeemed",
        data: CouponRedeemData,
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
        categories: dataArray,
      },
      colors: colors,
    };
  }

  private _groupedBarChart3(frequentdatares: any,colors:any) {

    let couponresdatas = frequentdatares.frequentvistdata.replace(/'/g, '').split(', ');
    let CouponRedeemData =  frequentdatares.frequentuserdata.replace(/'/g, '').split(', ');  
    let dataArray = frequentdatares.frequentmonthdata.replace(/'/g, '').split(', ');

    colors = this.getChartColorsArray(colors);
    this.groupedBarChart3 = {
      series: [{
          name: "Visits",
          data: couponresdatas, //[44, 55, 41, 64, 22, 43, 21, 35, 52, 36, 42, 38],
        },
        {
          name: "Users",
          data: CouponRedeemData, //[53, 32, 33, 52, 13, 44, 32, 38, 48, 34, 40, 35],
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
        categories: dataArray,// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
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


  merchantSelectedid(id : any)
  {
    this.selectedMerchantId = id;
  }

  viewMerchantData() { 



    this.appService.getById("api/AdminDashbaord/AdminDashboard/", this.selectedMerchantId)
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


    this.appService.getById("api/AdminDashbaord/AdminGrapgData/",this.selectedMerchantId)
    .subscribe(data => {  
      console.log('graph', data);
      
    //  this.groupedBarChart1.data =data.adminCouponsGraphs.month;
      this.adminCouponsGraphs =data;
    //   this.groupedBarChart3.series.data =data;
    //   this.groupedBarChart.series.data =data;
     this._groupedBarChart(this.adminCouponsGraphs, '["--vz-primary", "--vz-success"]')
     this._groupedBarChart1(this.adminCouponsGraphs,'["--vz-primary", "--vz-success"]')
    this._groupedBarChart2(this.adminCouponsGraphs, '["--vz-primary", "--vz-success"]')
     this._groupedBarChart3(this.adminCouponsGraphs, '["--vz-primary", "--vz-success"]')
   
    });


    
    // this._groupedBarChart2(this.adminCouponsGraphs, '["--vz-primary", "--vz-success"]')
    // You can perform further actions with the merchantId as needed
  }


  
}
