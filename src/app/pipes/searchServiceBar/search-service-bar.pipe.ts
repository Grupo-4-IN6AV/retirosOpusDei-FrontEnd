import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchServiceBarPipe'
})
export class SearchServiceBarPipe implements PipeTransform
{

  transform(services:any, search:any){
    if(search == undefined){
      return services;
    }else{
      return services.filter( (service:any) =>
      {

        return service.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
