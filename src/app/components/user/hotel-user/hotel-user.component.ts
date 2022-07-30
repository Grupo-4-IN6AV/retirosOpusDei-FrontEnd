import { Component, OnInit } from '@angular/core';
import { ScriptsHotelsService } from 'src/app/services/cargarScripts/scripts-hotels.service';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { ServicesRestService } from "src/app/services/servicesRest/services-rest.service";
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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

  //CALCULOS EN TIEMPO REAL//
  totalNights: any;
  totalReservation: number = 0;
  entryDate: any;
  exitDate: any;
  totalPersons: any;
  pricesServices: number = 0;
  pushServices:any = [];
  //Fechas//
  setDateEntry : any;
  setDateExit: any;

  constructor
  (
    public serviceRest: ServicesRestService,
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private eventRest: EventRestService,
    private reservationRest: ReservationRestService,
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

  addServices(prices:any , checked:any,)
  {
    let check =! checked.checked

    if(check === false)
    {
      this.pricesServices = this.pricesServices - prices;
    }
    if(check === true)
    {
      this.pricesServices = parseInt(this.pricesServices + prices);
    }
  }

  pushingServices(checked:any, dataService:any)
  {
    var array = this.pushServices
    let check =! checked.checked

    if(check === true)
    {
      array = this.pushServices.push(dataService);
    } else if(check === false) {
      const indice = this.pushServices.indexOf(dataService);
      array = this.pushServices.splice(indice,1);
    }
  }

  returnTotal()
  {
    return this.pricesServices
  }

  calculateNights(exit:number, entry:number)
  {
    if(exit<entry)
    {
      this.totalNights = 0;
      return this.totalNights
    }
    let calculate = exit - entry;
    this.totalNights = (calculate/(1000*60*60*24))
    return this.totalNights
  }

  calculateDayEntry(entry:any)
  {
    let dateEntry = new Date(entry).toISOString().split('T');
    let splitDate = dateEntry[0].split('-')
    return splitDate[2]
  }

  calculateDayExit(exit:any)
  {
    let dateExit = new Date(exit).toISOString().split('T');
    let splitDate = dateExit[0].split('-')
    return splitDate[2]
  }

  calculateMonthExit(exit:any)
  {
    let monthExit = new Date(exit).toISOString().split('T')
    let splitDate = monthExit[0].split('-')
    var month = ''
    if(splitDate[1]==='01')
    {
      month = 'Jan'
    }
    if(splitDate[1]==='02')
    {
      month = 'Feb'
    }
    if(splitDate[1]==='03')
    {
      month = 'Mar'
    }
    if(splitDate[1]==='04')
    {
      month = 'Apr'
    }
    if(splitDate[1]==='05')
    {
      month = 'May'
    }
    if(splitDate[1]==='06')
    {
      month = 'Jun'
    }
    if(splitDate[1]==='07')
    {
      month = 'Jul'
    }
    if(splitDate[1]==='08')
    {
      month = 'Aug'
    }
    if(splitDate[1]==='09')
    {
      month = 'Sep'
    }
    if(splitDate[1]==='10')
    {
      month = 'Oct'
    }
    if(splitDate[1]==='11')
    {
      month = 'Nov'
    }
    if(splitDate[1]==='12')
    {
      month = 'Dec'
    }
    return month
  }

  calculateMonthEntry(entry:any)
  {
    let monthEntry = new Date(entry).toISOString().split('T')
    let splitDate = monthEntry[0].split('-')
    var month = ''
    if(splitDate[1]==='01')
    {
      month = 'Jan'
    }
    if(splitDate[1]==='02')
    {
      month = 'Feb'
    }
    if(splitDate[1]==='03')
    {
      month = 'Mar'
    }
    if(splitDate[1]==='04')
    {
      month = 'Apr'
    }
    if(splitDate[1]==='05')
    {
      month = 'May'
    }
    if(splitDate[1]==='06')
    {
      month = 'Jun'
    }
    if(splitDate[1]==='07')
    {
      month = 'Jul'
    }
    if(splitDate[1]==='08')
    {
      month = 'Aug'
    }
    if(splitDate[1]==='09')
    {
      month = 'Sep'
    }
    if(splitDate[1]==='10')
    {
      month = 'Oct'
    }
    if(splitDate[1]==='11')
    {
      month = 'Nov'
    }
    if(splitDate[1]==='12')
    {
      month = 'Dec'
    }
    return month
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

  saveReservation()
  {
    console.log(this.entryDate, this.exitDate)
    if(this.entryDate == null || undefined)
    {
      this.setDateEntry = ''
    }
    else
    {
      let dateOne = new Date(this.entryDate)
      this.setDateEntry = dateOne.toISOString();
    }
    if(this.exitDate == null || undefined)
    {
      this.setDateExit = ''
    }
    else
    {
      let dateTwo = new Date(this.exitDate)
      this.setDateExit = dateTwo.toISOString();
    }
    let params =
    {
      entryDate: this.setDateEntry,
      exitDate: this.setDateExit,
      totalPersons: this.totalPersons,
      room: this.room._id,
      hotel: this.room.hotel._id,
    }
    this.reservationRest.saveReservation(params).subscribe({
      next: (res: any) =>
      {
        let params = { services: this.pushServices}


        this.reservationRest.addServicesReservation(res.addReservation._id, params).subscribe({
          next: (res: any) =>{console.log(res)},
          error: (err) =>{console.log(err)}
        })

        Swal.fire
        ({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });

      },
      error: (err) =>
      {
        Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        confirmButtonColor: '#E74C3C'
      });}
    })
  }


}
