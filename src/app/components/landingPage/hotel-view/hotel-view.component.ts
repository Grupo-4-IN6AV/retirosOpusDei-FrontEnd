import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit {

  idHotel:any;
  roomsHotel:any;
  rooms: any;
  uriRoom: any;

  searchRoom: any;
  notFound: boolean = false;

  constructor
  (
    public activatedRoute: ActivatedRoute,
    private roomRest: RoomRestService,
    private router: Router,
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
      next: (res:any)=>
      {
        this.roomsHotel = res.rooms;
        this.uriRoom = environment.baseURI+'room/getImageRoom/'
      },
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

  pedirLogin()
  {
    Swal.fire({
      icon: 'info',
      title: 'Attention',
      text: 'You need to login to Reserve this Room.',
      footer: '<a>You do not have Account? <a href="register"><b>&nbsp;Register</b></a></a>'
    })
  }

  redirectRegister()
  {
    this.router.navigateByUrl[('')];
  }

}
