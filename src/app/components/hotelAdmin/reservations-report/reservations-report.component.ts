import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service';

@Component({
  selector: 'app-reservations-report',
  templateUrl: './reservations-report.component.html',
  styleUrls: ['./reservations-report.component.css']
})
export class ReservationsReportComponentHotel implements OnInit {

  constructor
  (
    private reservationRest : ReservationRestService,
    private hotelRest: HotelRestService
  ) { }

  ngOnInit(): void
  {
    this.getReservations();
    this.getHotel();
  }

  reservations:any;
  hotelName:any
  entryDates:any
  exitDates:any
  hotels:any;
  reset:any

  getReservations()
  {
    this.reservationRest.getReservationExtra().subscribe({
      next: (res: any) =>
      {
        this.reservations = res.reservations
        var arrayStartDates = [];
        var arrayEndDates = [];
        for (let dates of this.reservations)
        {
          this.hotelName = dates.hotel.name
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


  getHotel()
  {
    this.hotelRest.getHotelManager().subscribe({
      next: (res: any) => {
        this.hotelName = res.hotel.name;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

}
