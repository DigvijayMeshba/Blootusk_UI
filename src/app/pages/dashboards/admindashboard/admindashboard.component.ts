import { Component } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
 

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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Ssp', 'Oct', 'Nov','Dec'],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Ssp', 'Oct', 'Nov','Dec'],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Ssp', 'Oct', 'Nov','Dec'],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Ssp', 'Oct', 'Nov','Dec'],
      },
      colors: colors,
    };
  }

}
