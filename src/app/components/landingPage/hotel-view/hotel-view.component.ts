import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit {

  idHotel:any;
  roomsHotel:any;
  constructor
  (
    public activatedRoute: ActivatedRoute,
    private roomRest: RoomRestService,
  )
  {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( ruta => {
      this.idHotel = ruta.get('id');
    });
    this.getRooms();
  }

  getRooms()
  {
    this.roomRest.getRoomsHotel(this.idHotel).subscribe({
      next: (res:any)=> this.roomsHotel = res.rooms,
      error: (err)=> console.log(err)
    })
  }

  viewBlock : boolean = true;
  viewList : boolean = false;

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

}
