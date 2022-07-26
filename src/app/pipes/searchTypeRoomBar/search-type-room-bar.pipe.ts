import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTypeRoomBarPipe'
})
export class SearchTypeRoomBarPipe implements PipeTransform {

  transform(typesRooms:any, search:any){
    if(search == undefined){
      return typesRooms;
    }else{
      return typesRooms.filter( (typeRoom:any) =>
      {

        return typeRoom.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
