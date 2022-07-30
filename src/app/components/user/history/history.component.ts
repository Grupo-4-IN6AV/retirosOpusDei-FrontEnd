import { Component, OnInit } from '@angular/core';
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  reservations: any;
  entryDates: any;
  exitDates: any;
  months: any;
  days: any;
  uriHotel : any;
  viewReservation: any;
  uriReservation: any;
  entryDate:any;
  exitDate:any;

  constructor
    (
      private reservationRest: ReservationRestService
    ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationRest.getHistory().subscribe({
      next: (res: any) => {
        this.reservations = res.reservations;
        var arrayStartDates = [];
        var arrayEndDates = [];
        var arrayDays = [];
        var arrayMonths = [];
        for (let dates of this.reservations)
        {
          this.uriHotel = environment.baseURI+'hotel/getImageHotel/'
          let configDateEntry = dates.entryDate.split('T');
          let configDateEnd = dates.exitDate.split('T');
          let setDay = configDateEnd[0].split('-')
          var setMonth = setDay[1];
          var month
          if (setMonth === '01') {
            month = 'Jan'
            arrayMonths.push(month)
          }
          if (setMonth === '02') {
            month = 'Feb'
            arrayMonths.push(month)
          }
          if (setMonth === '03') {
            month = 'Mar'
            arrayMonths.push(month)
          }
          if (setMonth === '04') {
            month = 'Apr'
            arrayMonths.push(month)
          }
          if (setMonth === '05') {
            month = 'May'
            arrayMonths.push(month)
          }
          if (setMonth === '06') {
            month = 'Jun'
            arrayMonths.push(month)
          }
          if (setMonth === '07') {
            month = 'Jul'
            arrayMonths.push(month)
          }
          if (setMonth === '08') {
            month = 'Aug'
            arrayMonths.push(month)
          }
          if (setMonth === '09') {
            month = 'Sep'
            arrayMonths.push(month)
          }
          if (setMonth === '10') {
            month = 'Oct'
            arrayMonths.push(month)
          }
          if (setMonth === '11') {
            month = 'Nov'
            arrayMonths.push(month)
          }
          if (setMonth === '12') {
            month = 'Dec'
            arrayMonths.push(month)
          }
          arrayStartDates.push(configDateEntry[0]);
          arrayEndDates.push(configDateEnd[0]);
          arrayDays.push(setDay[2])
        }
        this.exitDates = arrayEndDates;
        this.entryDates = arrayStartDates;
        this.days = arrayDays;
        this.months = arrayMonths
      },
      error: (err) => console.log(err)
    })
  }

  getReservation(id:string)
  {
    this.reservationRest.getReservation(id).subscribe({
      next: (res: any) =>
      {
        this.viewReservation = res.reservation;
        let splitEntry = this.viewReservation.entryDate.split('T')
        this.entryDate = splitEntry[0]
        let splitExit = this.viewReservation.exitDate.split('T')
        this.exitDate = splitExit[0]
      },
      error: (err) => {alert(err.error.message)}
    })
  }
}
