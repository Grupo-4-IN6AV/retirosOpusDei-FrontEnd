import { Pipe, PipeTransform } from '@angular/core';
import {EventRestService} from '../../services/eventRest/event-rest.service'
import {EventsAdminHotelComponent} from '../../components/hotelAdmin/events-admin-hotel/events-admin-hotel.component'


@Pipe({
  name: 'searchEventHotelPipe'
})
export class SearchEventHotelPipe implements PipeTransform {

  events: any;

  constructor
  (
    private eventRest: EventRestService,
    private eventComponent: EventsAdminHotelComponent,
  ){ }

  transform(events:any, search:any){
    if(search == undefined){
      return events;
    }else{
      return events.filter( (event:any) =>
      {
        let params = {name:search}
        this.eventRest.searchEvent(params).subscribe({
          next: (res: any) =>
          {
            this.events = res.events;
            if(this.events.length === 0)
            {
              this.eventComponent.notFound = true;
            }
            else if(this.events.length !== 0)
            {
              this.eventComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return event.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
