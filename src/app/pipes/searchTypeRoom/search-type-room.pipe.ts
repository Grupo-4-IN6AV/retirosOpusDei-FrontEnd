import { Pipe, PipeTransform } from '@angular/core';
import { TypeRoomAdminComponent } from 'src/app/components/admin/type-room-admin/type-room-admin.component';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';

@Pipe({
  name: 'searchTypeRoomPipe'
})
export class SearchTypeRoomPipe implements PipeTransform {

  typesRooms: any;

  constructor
  (
    private typeRoomRest: TypeRoomRestService ,
    private typeRoomComponent: TypeRoomAdminComponent,
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
