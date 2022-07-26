import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotelBarPipe'
})
export class SearchHotelBarPipe implements PipeTransform {

  transform(hotels:any, search:any){
    if(search == undefined){
      return hotels;
    }else{
      return hotels.filter( (hotel:any) =>
      {
        return hotel.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
