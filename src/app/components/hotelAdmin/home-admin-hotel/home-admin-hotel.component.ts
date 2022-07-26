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
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { ServicesRestService } from 'src/app/services/servicesRest/services-rest.service';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';

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
  selector: 'app-home-admin-hotel',
  templateUrl: './home-admin-hotel.component.html',
  styleUrls: ['./home-admin-hotel.component.sass']
})
export class HomeAdminHotelComponent implements OnInit {


  user: any;
  hotel: any;

  rooms: any;
  totalRooms: any;

  services: any;
  totalServices: any;

  typesRooms: any;

  ngOnInit(): void {
    this.getHotel();
    this.userLogin();
    this.getRooms();
    this.getServices();
    this.getTypesRooms();
  }

  userLogin() {
    this.userRest.getUser(this.credentialsRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getHotel() {
    this.hotelRest.getHotelManager().subscribe({
      next: (res: any) => {
        this.hotel = res.hotel
      },
      error: (err) => console.log(err)
    })
  }

  getRooms() {
    this.roomRest.getRoomsHotelAdmin().subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
        this.totalRooms = this.rooms.length;
      },
      error: (err) => console.log(err)
    })
  }

  getServices() {
    this.serviceRest.getServicesHotel().subscribe({
      next: (res: any) => {
        this.services = res.services;
        this.totalServices = this.services.length;
      },
      error: (err) => console.log(err)
    })
  }

  getTypesRooms() {
    this.typeRoomRest.getTypeRoomHotel().subscribe({
      next: (res: any) => {
        var arrayData = []
        this.typesRooms = res.typesRooms;
        for (let typeRoom of this.typesRooms) {
          arrayData.push({ value: 1, name: typeRoom.name })
        }
        this.donut_chart =
        {
          tooltip:
          {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series:
            [
              {
                name: 'Type Rooms',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 2,
                },
                data: [],
              },
            ],
        };
        this.donut_chart.series[0].data = arrayData
      },
      error: (err) => console.log(err)
    })
  }


  donut_chart: EChartsOption


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
      private hotelRest: HotelRestService,
      private userRest: UserRestService,
      private credentialsRest: CredentialsRestService,
      private roomRest: RoomRestService,
      private serviceRest: ServicesRestService,
      private typeRoomRest: TypeRoomRestService
    ) {

  }


}
