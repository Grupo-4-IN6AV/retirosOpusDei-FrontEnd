import { Pipe, PipeTransform } from '@angular/core';
import { ServicesAdminHotelComponent } from 'src/app/components/hotelAdmin/services-admin-hotel/services-admin-hotel.component';
import { ServicesRestService } from 'src/app/services/servicesRest/services-rest.service';


@Pipe({
  name: 'searchServiceHotelPipe'
})
export class SearchServiceHotelPipe implements PipeTransform {

  services: any;

  constructor
  (
    private serviceRest: ServicesRestService,
    private serviceComponent: ServicesAdminHotelComponent
  ){ }

  transform(services:any, search:any){
    if(search == undefined){
      return services;
    }else{
      return services.filter( (service:any) =>
      {
        let params = {name:search}
        this.serviceRest.searchService(params).subscribe({
          next: (res: any) =>
          {
            this.services = res.services;
            if(this.services.length === 0)
            {
              this.serviceComponent.notFound = true;
            }
            else if(this.services.length !== 0)
            {
              this.serviceComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return service.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
