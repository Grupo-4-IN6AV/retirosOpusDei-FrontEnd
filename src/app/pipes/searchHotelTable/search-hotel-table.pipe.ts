import { Pipe, PipeTransform } from '@angular/core';
import { HotelAdminComponent } from 'src/app/components/admin/hotel-admin/hotel-admin.component';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';


@Pipe({
  name: 'searchHotelTable'
})
export class SearchHotelTablePipe implements PipeTransform {

  hotels: any;

  constructor
  (
    private hotelRest: HotelRestService,
    private hotelAdminComponent: HotelAdminComponent,
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
              this.hotelAdminComponent.notFound = true;
            }
            else if(this.hotels.length !== 0)
            {
              this.hotelAdminComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return hotel.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
