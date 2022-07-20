import { Pipe, PipeTransform } from '@angular/core';
import {EventRestService} from '../../services/eventRest/event-rest.service'
import {EventsAdminComponent} from '../../components/admin/event-admin/event-admin.component'

@Pipe({
  name: 'searchEventPipe'
})
export class SearchEventPipe implements PipeTransform
{
  events: any;

  constructor
  (
    private eventRest: EventRestService,
    private eventAdminComponent: EventsAdminComponent,
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
              this.eventAdminComponent.notFound = true;
            }
            else if(this.events.length !== 0)
            {
              this.eventAdminComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return event.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
