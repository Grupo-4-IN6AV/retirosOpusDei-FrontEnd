import { Component, OnInit } from '@angular/core';
import { ScriptsHotelsService } from 'src/app/services/cargarScripts/scripts-hotels.service';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { ServicesRestService } from "src/app/services/servicesRest/services-rest.service";
import { environment } from 'src/environments/environment';

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
  roomsHotel:any;
  uriRoom:any;
  searchRoom:any;
  servicesHotel:any;
  eventsHotel:any;
  searchEvent:any;
  reset:any;
  dates:any;
  room:any;
  uriReservation:any;
  actualDate : any;

  constructor
  (
    public serviceRest: ServicesRestService,
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private eventRest: EventRestService,
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
    this.actualDate = new Date();
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

  getRooms(id:string)
  {
    this.roomRest.getRoomsHotel(id).subscribe({
      next: (res:any)=>
      {
        this.roomsHotel = res.rooms;
        this.uriRoom = environment.baseURI+'room/getImageRoom/'
      },
      error: (err)=> console.log(err)
    })
  }

  getServicesHotel(id:string)
  {
    this.serviceRest.getServicesHotelID(id).subscribe({
      next: (res:any)=>
      {
        this.servicesHotel = res.services
      },
      error: (err) => console.log(err)
    })
  }

  getEvents(id:string)
  {
    this.eventRest.getEventsHotelID(id).subscribe({
      next: (res:any)=>
      {
        var arrayDates:[]
        this.eventsHotel = res.events
        let splitDate
      },
      error: (err) => console.log(err)
    })
  }

  returnHotels()
  {
    this.roomsHotel = this.reset
    this.eventsHotel = this.reset
  }

  reserveRoom(id:string)
  {
    this.roomRest.getRoom(id).subscribe({
      next: (res: any) => {
        this.room = res.room;
        this.uriReservation = environment.baseURI + 'room/getImageRoom/' + res.room.image;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

}
