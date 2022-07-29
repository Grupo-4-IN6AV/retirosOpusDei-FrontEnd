import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service';
import { end } from '@popperjs/core';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.sass']
})
export class UserCalendarComponent implements OnInit
{

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events:[],
  };

  reservations:any;
  actualDate:any;

  constructor
  (
    private reservationRest: ReservationRestService
  ) { }

  ngOnInit(): void
  {
    this.getReservations()
    this.actualDate = new Date();
  }


  getReservations()
  {
    this.reservationRest.getReservationsUser().subscribe({
      next: (res: any) =>
      {
        this.reservations = res.reservations
        var color;
        var arrayDates = [];
        var calendarArray = [];
        var availableEventsArray = [];
        for(var key=0; key<this.reservations.length; key++)
        {
            var eventID = this.reservations[key]._id;
            var nameEvent = this.reservations[key].hotel.name
            var endDate = this.reservations[key].exitDate
            var entryDate = this.reservations[key].entryDate;
            var splitExitDate = endDate.split('T');
            var splitEntryDate = entryDate.split('T')
            var setExit = new Date(new Date(endDate).getTime()+86400000).toISOString()
            var setExitDate = setExit.split('T')
            var formDate = splitExitDate[0]+' '+'00:00'
            var compareDate = new Date(formDate);
            if(compareDate<this.actualDate)
            {
              availableEventsArray.push(false)
              color = "fc-event-danger"
            }
            else
            {
              availableEventsArray.push(true)
              color = "fc-event-success"
            }
            calendarArray.push(
              {
                title: nameEvent,
                description:eventID,
                start: splitEntryDate[0],
                end: setExitDate[0],
                className: color,
              }
              )
        }
        this.calendarOptions.events = calendarArray;
      },
      error: (err) => console.log(err)
    })
  }

}
