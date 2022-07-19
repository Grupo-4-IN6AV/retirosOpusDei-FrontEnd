import { Pipe, PipeTransform } from '@angular/core';
import { HotelComponent } from 'src/app/components/landingPage/hotel/hotel.component';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Pipe({
  name: 'searchHotelPipe'
})
export class SearchHotelPipe implements PipeTransform
{

  hotels: any;

  constructor
  (
    private hotelRest: HotelRestService,
    private landingComponent: HotelComponent,
  ){ }

  transform(hotels:any, search:any){
    if(search == undefined){
      return hotels;
    }else{
      return hotels.filter( (hotel:any) =>
      {
        let params = {name:search}
        this.hotelRest.getHotelName(params).subscribe({
          next: (res: any) =>
          {
            this.hotels = res.hotels;
            if(this.hotels.length === 0)
            {
              this.landingComponent.notFound = true;
            }
            else if(this.hotels.length !== 0)
            {
              this.landingComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return hotel.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
