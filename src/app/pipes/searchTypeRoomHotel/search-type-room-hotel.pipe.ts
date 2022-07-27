import { Pipe, PipeTransform } from '@angular/core';
import { TypesRoomsAdminHotelComponent } from 'src/app/components/hotelAdmin/types-rooms-admin-hotel/types-rooms-admin-hotel.component';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';

@Pipe({
  name: 'searchTypeRoomHotelPipe'
})
export class SearchTypeRoomHotelPipe implements PipeTransform {
  typesRooms: any;

  constructor
  (
    private typeRoomRest: TypeRoomRestService ,
    private typeRoomComponent: TypesRoomsAdminHotelComponent,
  ){ }

  transform(typesRooms:any, search:any){
    if(search == undefined){
      return typesRooms;
    }else{
      return typesRooms.filter( (typeRoom:any) =>
      {
        let params = {name:search}
        this.typeRoomRest.searchTypeRoom(params).subscribe({
          next: (res: any) =>
          {
            this.typesRooms = res.typesRooms;
            if(this.typesRooms.length === 0)
            {
              this.typeRoomComponent.notFound = true;
            }
            else if(this.typesRooms.length !== 0)
            {
              this.typeRoomComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return typeRoom.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
