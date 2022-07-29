import { Component, OnInit , ViewEncapsulation, ViewChild } from "@angular/core";
import{RoomViewService} from 'src/app/services/cargarScripts/room-view.service'
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { RoomRestService } from "src/app/services/roomRest/room-rest.service";
import { ServicesRestService } from "src/app/services/servicesRest/services-rest.service";

@Component({
  selector: 'app-view-room-details',
  templateUrl: './view-room-details.component.html',
  styleUrls: ['./view-room-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewRoomDetailsComponent implements OnInit
{
  thumbsSwiper: any;
  idRoom:any;
  room: any;
  uri: any;
  services: any;
  searchRoom: any;

  notFound: any;

  constructor
  (
    public activatedRoute: ActivatedRoute,
    private ScriptViewRoom: RoomViewService,
    public roomRest : RoomRestService,
    public serviceRest: ServicesRestService
  )
  {
    ScriptViewRoom.Carga(["room-details"]);
  }

  ngOnInit(): void
  {
    this.activatedRoute.paramMap.subscribe( ruta => {
      this.idRoom = ruta.get('id');
    });
    this.getRoom(this.idRoom);
  }

  getRoom(id:string)
  {
    this.roomRest.getRoom(id).subscribe({
      next: (res: any) => {
        this.room = res.room;
        this.uri = environment.baseURI + 'room/getImageRoom/' + res.room.image;
        this.getServices(this.room.hotel._id)
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  getServices(id:string)
  {
    this.serviceRest.getServicesHotelID(id).subscribe({
      next: (res: any) => {
        this.services = res.services;
      },
      error: (err) => {alert(err.error.message)}
    })
  }


}
