import { Component, OnInit } from '@angular/core';
import { ScriptRoomsService} from '../../../services/cargarScripts/script-rooms.service'
import Swiper from 'swiper';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit {

  constructor
  (
    public roomRest: RoomRestService
  )
  {
  }
  ngOnInit(): void
  {
    this.getRoomsHotel();
  }

  rooms : any;

  viewBlock : boolean = true;
  viewList : boolean = false

  viewBlockRoom()
  {
    this.viewBlock = true;
    this.viewList = false
  }

  viewListRoom()
  {
    this.viewList = true
    this.viewBlock = false;
  }

  getRoomsHotel()
  {
    this.roomRest.getRooms().subscribe({
      next: (res: any) =>
      {
        this.rooms = res.rooms
      },
      error: (err) => console.log(err)
    })
  }
}
