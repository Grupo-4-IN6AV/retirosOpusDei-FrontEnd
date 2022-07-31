import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../../models/event.modal';
import { HotelRestService } from '../../../services/hotelRest/hotel-rest.service';
import { EventRestService } from '../../../services/eventRest/event-rest.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
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
  selector: 'app-events-admin-hotel',
  templateUrl: './events-admin-hotel.component.html',
  styleUrls: ['./events-admin-hotel.component.css']
})
export class EventsAdminHotelComponent implements OnInit
{

  //Variables de TypeScript//
  hotel:any
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

  arrayStartHours:any;
  arrayEndHours:any;

  buttonActions: boolean = false;
  controloClick : number = 0

  actualDate:any;
  available:any;
  availableEvent:any;
  setDateUpdate:any;

  //carga de imagen//
  filesToUpload: any;
  uriEvent: any;
  uri: any;


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
    this.getHotel()
    this.getEventsHotel();
    this.actualDate = new Date();
  }

  saveEventHotel(eventAddForm : any)
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
       hotel: this.hotel._id,
    }
    this.eventRest.saveEventHotel(data).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getEventsHotel();
        eventAddForm.reset();
        this.hotel = this.hotel
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
    this.hotel = this.hotel
  }

  getEventsHotel()
  {
    this.eventRest.getEventsHotel().subscribe({
      next: (res: any) =>
      {
        this.events = res.events
        this.uriEvent = environment.baseURI+'event/getImageEvent/'
        var color;
        var arrayDates = [];
        var calendarArray = [];
        var availableEventsArray = [];
        var start = [];
        var end = [];
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

              let date = res.events[key].date;
              let splitDate = date.split('T');
              this.newDate = splitDate[0];

              var formDate = splitDate[0]+' '+res.events[key].endHour
              let splitStartHour = res.events[key].startHour.split(':');
              let compareStartHour = splitStartHour[0]+splitStartHour[1]
              if(compareStartHour > 1159)
              {
                let pushStartHour = res.events[key].startHour + ' p.m'
                start.push(pushStartHour)
              }
              else
              {
                let pushStartHour = res.events[key].startHour + ' a.m'
                start.push(pushStartHour)
              }

              let splitEndHour = res.events[key].endHour.split(':');
              let compareEndtHour = splitEndHour[0]+splitEndHour[1]
              if(compareEndtHour > 1159)
              {
                let pushEndHour = res.events[key].endHour + ' p.m'
                end.push(pushEndHour)
              }
              else
              {
                let pushEndHour = res.events[key].endHour + ' a.m'
                end.push(pushEndHour)
              }

        }
        this.calendarOptions.events = calendarArray;
        this.newDates = arrayDates;
        this.available = availableEventsArray;
        this.arrayEndHours = end;
        this.arrayStartHours = start;
      },
      error: (err) => console.log(err)
    })
  }


  updateEvent()
  {
    if(this.eventUpdate.date == null || undefined)
    {
      this.setDateUpdate = ''
    }
    else
    {
      this.setDateUpdate = this.eventUpdate.date;
    }
    let params =
    {
       name: this.eventUpdate.name,
       description: this.eventUpdate.description,
       date: this.setDateUpdate,
       startHour: this.eventUpdate.startHour,
       endHour: this.eventUpdate.endHour,
       hotel: this.eventUpdate.hotel,
    }
    this.eventRest.updateEventHotel(this.eventUpdate._id, params).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getEventsHotel();
        if(this.showTableEvents)
        {
          this.showButtonActions(this.eventUpdate._id,false)
        }
      },
      error: (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
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
        this.uri = environment.baseURI + 'event/getImageEvent/' + res.event.image;
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
        this.eventRest.deleteEventHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getEventsHotel();
            if(this.showTableEvents)
            {
              this.showButtonActions(id,false)
            }
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getEventsHotel();
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

  getHotel()
  {
    this.hotelRest.getHotelManager().subscribe({
      next: (res: any) =>
      {
        this.hotel = res.hotel
      },
      error: (err) => console.log(err)
    })
  }

  //UPLOAD IMAGE//
  filesChange(inputFile: any)
  {
    this.filesToUpload = <Array<File>>inputFile.target.files;
  }

  uploadImage()
  {
    this.eventRest.requestFiles(this.eventView._id, this.filesToUpload, 'image')
      .then((res: any) => {
        if (!res.error)
        {
          this.getEventsHotel();
          Swal.fire
            ({
              icon: 'success',
              title: 'Image added Successfully.',
              confirmButtonColor: '#28B463'
            });
        }
        else
        {
          console.log(res)
        }
      })
      .catch(error =>
        {
          Swal.fire({
            icon: 'error',
            title: error,
            confirmButtonColor: '#E74C3C'
          });
        })
    }

}
