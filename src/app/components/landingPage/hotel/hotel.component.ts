import { Component, OnInit, Injectable } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { ScriptsHotelsService } from 'src/app/services/cargarScripts/scripts-hotels.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { HotelViewComponent } from '../hotel-view/hotel-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotels:any;
  hotelsNameUp: boolean = false;
  hotelsNameDown: boolean = false;
  searchHotel: any;

  notFound: boolean = false;

  //tipos de vistas//
  viewGrid: boolean = false;
  viewList: boolean = true;
  viewBlock: boolean = false;

  //HABITACIONES DEL HOTEL//
  rooms:any;
  prices:any;

  constructor
  (
    private roomRest : RoomRestService,
    private hotelRest: HotelRestService,
    private _ScriptsHotes: ScriptsHotelsService,
    private router: Router,
  )
  {
    _ScriptsHotes.Carga(["landingHotel"]);
  }

  ngOnInit(): void
  {
    this.getHotels();
    this.getPricesHotels();
  }

  getHotels()
  {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) =>
      {
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  getHotelsNameUp()
  {
    this.hotelsNameDown = false;
    this.hotelsNameUp = true;
    this.hotelRest.getHotelsNameUp().subscribe({
      next: (res: any) =>
      {
        this.hotels = res.hotels;
      },
      error: (err) => console.log(err)
    })
  }

  getHotelsNameDown()
  {
    this.hotelsNameDown = true;
    this.hotelsNameUp = false;
    this.hotelRest.getHotelsNameDown().subscribe({
      next: (res: any) =>
      {
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  getPricesHotels()
  {
    this.roomRest.getRoomsHotelPrice().subscribe({
      next: (res: any) =>
      {
        this.prices = res.arrayPrices
      },
      error: (err) => console.log(err)
    })
  }

  //VISTA DE HOTELES//

  hotelsViewList()
  {
    this.viewGrid = false;
    this.viewList = true;
    this.viewBlock = false
  }

  hotelsViewGrid()
  {
    this.viewBlock = false
    this.viewGrid = true;
    this.viewList = false;
  }

  hotelsViewBlock()
  {
    this.viewBlock = true
    this.viewGrid = false;
    this.viewList = false;
  }

  getRoomsHotel(id:string)
  {

  }


}
