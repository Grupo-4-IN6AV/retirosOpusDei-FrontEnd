import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service';

@Component({
  selector: 'app-reservations-report',
  templateUrl: './reservations-report.component.html',
  styleUrls: ['./reservations-report.component.css']
})
export class ReservationsReportComponent implements OnInit {

  constructor
  (
    private reservationRest : ReservationRestService,
    private hotelRest: HotelRestService
  ) { }

  ngOnInit(): void
  {
    this.getReservations();
    this.getHotels();
  }

  reservations:any;
  hotelName:any
  entryDates:any
  exitDates:any
  hotels:any;
  reset:any

  getReservations()
  {
    this.reservationRest.getReservations().subscribe({
      next: (res: any) =>
      {
        this.hotelName = this.reset
        this.reservations = res.reservations
        var arrayStartDates = [];
        var arrayEndDates = [];
        for (let dates of this.reservations)
        {
          let configDateEntry = dates.entryDate.split('T');
          let configDateEnd = dates.exitDate.split('T');
          arrayStartDates.push(configDateEntry[0]);
          arrayEndDates.push(configDateEnd[0]);
        }
        this.exitDates = arrayEndDates;
        this.entryDates = arrayStartDates;
      },
      error: (err) => console.log(err)
    })
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

  getReservationHotel(id:string, name:string)
  {
    this.reservationRest.getReservationHotel(id).subscribe({
      next: (res: any) =>
      {
        this.hotelName = name
        this.reservations = res.reservations
        var arrayStartDates = [];
        var arrayEndDates = [];
        for (let dates of this.reservations)
        {
          let configDateEntry = dates.entryDate.split('T');
          let configDateEnd = dates.exitDate.split('T');
          arrayStartDates.push(configDateEntry[0]);
          arrayEndDates.push(configDateEnd[0]);
        }
        this.exitDates = arrayEndDates;
        this.entryDates = arrayStartDates;
      },
      error: (err) => console.log(err)
    })
  }

}
