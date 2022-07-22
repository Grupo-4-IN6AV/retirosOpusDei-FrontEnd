import { Pipe, PipeTransform } from '@angular/core';
import { HotelAdminComponent } from 'src/app/components/admin/hotel-admin/hotel-admin.component';
import { ServicesAdminComponent } from 'src/app/components/admin/services-admin/services-admin.component';
import { ServicesRestService } from 'src/app/services/servicesRest/services-rest.service';


@Pipe({
  name: 'searchServicePipe'
})
export class SearchServicePipe implements PipeTransform {

  services: any;

  constructor
  (
    private serviceRest: ServicesRestService,
    private serviceComponent: ServicesAdminComponent
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
