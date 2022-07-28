import { Component, OnInit } from '@angular/core';
import { ScriptsHotelsService } from 'src/app/services/cargarScripts/scripts-hotels.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { ServicesRestService } from "src/app/services/servicesRest/services-rest.service";

@Component({
  selector: 'app-hotel-user',
  templateUrl: './hotel-user.component.html',
  styleUrls: ['./hotel-user.component.scss','./hotel-user.css']
})
export class HotelUserComponent implements OnInit {

  hotels: any;
  services:any
  rooms: any;
  prices:any;
  searchHotel:any;

  constructor
  (
    public serviceRest: ServicesRestService,
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private _ScriptsHotels: ScriptsHotelsService,
  )
  {
    _ScriptsHotels.Carga(["hotel-user"]);
  }
  ngOnInit(): void
  {
    this.getHotels();
    this.getServices();
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

  getServices()
  {
    this.serviceRest.getServicesHotelArray().subscribe({
      next: (res: any) =>
      {
        this.services = res.arrayServices
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

}
