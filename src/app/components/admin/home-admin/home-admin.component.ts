import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexTitleSubtitle,
  ApexFill,
} from 'ng-apexcharts';

import { EChartsOption } from 'echarts';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

export type SparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.sass']
})
export class HomeAdminComponent implements OnInit, OnDestroy
{

  users: any;
  totalUsers: any;
  totalAdminsHotels: any;
  totalClients: any;

  ngOnInit(): void
  {
    this.getUsers();
  }

  getUsers()
  {
    this.userRest.getUsers().subscribe({
      next: (res: any) =>
      {
        this.users = res.users
        this.totalUsers = this.users.length;
        var arrayAdmins = [];
        var arrayClients = [];
        for(let user of this.users)
        {
          if(user.role === 'ADMIN HOTEL')
            arrayAdmins.push(user);
          else if(user.role === 'CLIENT')
            arrayClients.push(user);
        }
        this.totalAdminsHotels = arrayAdmins.length;
        this.totalClients = arrayClients.length
        //DATA A LA GRAFICA//
        this.donut_chart.series[0].data.push(
          {
            value: this.totalAdminsHotels, name:'Admins Hotels'
          },
          {
            value: this.totalClients, name:'Clients'
          }
          )
      },
      error: (err) => console.log(err)
    })
  }

  donut_chart: EChartsOption =
  {
    tooltip:
    {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend:
    {
      show: true,
      data: ['Admins Hotels', 'Clients'],
      textStyle:
      {
        color: '#9aa0ac',
        padding: [5, 10],
      },
    },
    toolbox:
    {
      show: true,
    },
    series:
    [
      {
        name: 'Role',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },
        data:[],
      },
    ],
    color: ['#0D6EFD', '#FFC107'],
  };

  @ViewChild('chart') chart: ChartComponent;
  // sparkline chart start
  public commonBarSparklineOptions: Partial<SparklineChartOptions> = {
    chart: {
      type: 'bar',
      width: 100,
      height: 25,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    series: [
      {
        name: 'income',
        data: [31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77],
      },
    ],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {},
      marker: {
        show: false,
      },
    },
  };

  // donut chart end
  // area chart start
  public areaChartOptions: Partial<areaChartOptions> = {
    series: [
      {
        name: 'New Customers',
        data: [31, 40, 28, 51, 42, 85, 77],
      },
      {
        name: 'Old Customers',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 380,
      type: 'area',
      toolbar: {
        show: false,
      },
      foreColor: '#9aa0ac',
    },
    colors: ['#9F8DF1', '#E79A3B'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 0,
    },

    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  constructor
  (
    private userRest: UserRestService
  )
  {

  }
  ngOnDestroy(): void
  {
    this.totalAdminsHotels = undefined;
    this.totalClients = undefined;
  }



}
