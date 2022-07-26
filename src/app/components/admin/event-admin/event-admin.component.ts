import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../../models/event.modal';
import { HotelRestService } from '../../../services/hotelRest/hotel-rest.service';
import { EventRestService } from '../../../services/eventRest/event-rest.service';
import Swal from 'sweetalert2';
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { DOCUMENT } from '@angular/common';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.css']
})
export class EventsAdminComponent implements OnInit {

  //Variables de TypeScript//
  events: any;
  searchEvent: any;
  event: EventModel;
  addDate: any;
  setDate:any;
  hotels: any;
  showTableEvents: boolean = false;
  reset: any;
  eventView: any;
  eventUpdate: any;
  eventDeleted: any;
  notFound: boolean = false
  viewModal: boolean = false

  //MOSTRAR FECHAS//
  newDates: any;
  newDate : any;
  startHour: any;
  endHour: any;
  buttonActions: boolean = false;
  controloClick : number = 0

  actualDate:any;
  available:any;
  availableEvent:any;



  //show Calendar//
  showCalendarEvents : boolean = false;
  constructor
  (
    public hotelRest : HotelRestService,
    public eventRest : EventRestService,

  )
  {
    this.event = new EventModel('','','','','','');
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events:[],
  };



  ngOnInit(): void
  {

    this.getHotels();
    this.getEvents();
    this.actualDate = new Date();
  }

  dateFilter = (d: Date) =>
  {

    return [1, 5, 10, 21].indexOf(+d.getDate()) == -1;
  };
  saveEvent(eventAddForm : any)
  {
    if(this.addDate == null || undefined)
    {
      this.setDate = ''
    }
    else
    {
      this.setDate = this.addDate.toISOString();
    }
    let data =
    {
       name: this.event.name,
       description: this.event.description,
       date: this.setDate,
       startHour: this.event.startHour,
       endHour: this.event.endHour,
       hotel: this.event.hotel,
    }
    this.eventRest.saveEvent(data).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getEvents();
        eventAddForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        eventAddForm.reset();
      },
    })
    this.setDate = this.reset;
    this.addDate = this.reset;
    eventAddForm.reset();
  }

  getEvents()
  {
    this.eventRest.getEvents().subscribe({
      next: (res: any) =>
      {
        this.events = res.events
        var color;
        var arrayDates = [];
        var calendarArray = [];
        var availableEventsArray = [];
        for(var key=0; key<this.events.length; key++)
        {
            var eventID = this.events[key]._id;
            var nameEvent = this.events[key].name
            var actualDate = this.events[key].date;
            var splitActualDate = actualDate.split('T');
            var formDate = splitActualDate[0]+' '+this.events[key].endHour
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
            arrayDates.push(splitActualDate[0])
            calendarArray.push(
              {
                title: nameEvent,
                description:eventID,
                date: splitActualDate[0],
                className: color,
              }
              )

        }
        this.calendarOptions.events = calendarArray;
        this.newDates = arrayDates;
        this.available = availableEventsArray;
        console.log(this.calendarOptions)
      },
      error: (err) => console.log(err)
    })
  }

  getEvent(id : string)
  {
    this.eventRest.getEvent(id).subscribe({
      next: (res: any) =>
      {
        this.eventView = res.event;
        this.eventUpdate = res.event;
        this. eventDeleted = res.event;
        let date = res.event.date;
        let splitDate = date.split('T');
        this.newDate = splitDate[0];

        var formDate = splitDate[0]+' '+res.event.endHour
        var compareDate = new Date(formDate);
        if(compareDate<this.actualDate)
        {
          this.availableEvent = false
        }
        else
        {
          this.availableEvent = true
        }
        let splitStartHour = res.event.startHour.split(':');
        let compareStartHour = splitStartHour[0]+splitStartHour[1]
        if(compareStartHour > 1159)
        {
          this.startHour = res.event.startHour + ' p.m'
        }
        else
        {
          this.startHour = res.event.startHour + ' a.m'
        }

        let splitEndHour = res.event.endHour.split(':');
        let compareEndtHour = splitEndHour[0]+splitEndHour[1]
        if(compareEndtHour > 1159)
        {
          this.endHour = res.event.endHour + ' p.m'
        }
        else
        {
          this.endHour = res.event.endHour + ' a.m'
        }
      },
      error: (err) => {alert(err.error.message)}
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

  deleteEvent(id:string)
  {
    Swal.fire({
      title: 'Do you want to delete this Event?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eventRest.deleteEvent(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getEvents();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getEvents();
      } else if (result.isDenied)
      {
        Swal.fire('Event Not Deleted','', 'info')
      }
    })
  }

  showButtonActions(eventID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let event of this.events)
      {
        if(eventID != event._id)
        {
          event.checked =! controlCheck
        }
        else if(eventID == event._id)
        {
          event.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let event of this.events)
      {
        event.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
  }

  showTable()
  {
    this.showTableEvents =! this.showTableEvents;
    this.showCalendarEvents = false;
    for(let event of this.events)
    {
      event.checked = true
    }
  }

  showCalendar()
  {
    this.showTableEvents = false;
    this.showCalendarEvents = true;
  }
}
