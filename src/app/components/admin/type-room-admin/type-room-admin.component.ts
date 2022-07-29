import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';
import { TypeRoomModel } from 'src/app/models/typeRoom.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-room-admin',
  templateUrl: './type-room-admin.component.html',
  styleUrls: ['./type-room-admin.component.css']
})
export class TypeRoomAdminComponent implements OnInit {


  hotels: any;
  typeRoom: TypeRoomModel;
  typesRooms : any;
  typeRoomView: any;
  typeRoomUpdate: any;
  typeRoomDeleted : any;

  showTableTypeRoom: boolean = false;
  buttonActions: boolean = false;
  controloClick : number = 0
  notFound: boolean = false;
  searchTypeRoom:any;

  constructor
  (
    private hotelRest: HotelRestService,
    private typeRoomRest: TypeRoomRestService
  )
  {
    this.typeRoom = new TypeRoomModel('','','',1,'');
  }

  ngOnInit(): void
  {
    this.getHotels();
    this.getTypeRooms();
  }

  getHotels()
  {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) =>
      {
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  getTypeRooms()
  {
    this.typeRoomRest.getTypeRooms().subscribe({
      next: (res: any) =>
      {
        this.typesRooms = res.typeRooms
      },
      error: (err) => console.log(err)
    })
  }

  saveTypeRoom(addTypeRoomForm : any)
  {
    this.typeRoomRest.saveTypeRoom(this.typeRoom).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getTypeRooms();
        addTypeRoomForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addTypeRoomForm.reset();
      },
    })
    addTypeRoomForm.reset();
  }

  updateTypeRoom()
  {
    this.typeRoomRest.updateTypeRoom(this.typeRoomUpdate._id, this.typeRoomUpdate).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTypeRooms();
        if(this.showTableTypeRoom)
        {
          this.showButtonActions(this.typeRoomUpdate._id,false)
        }
      },
      error: (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }


  getTypeRoom(id : string)
  {
    this.typeRoomRest.getTypeRoom(id).subscribe({
      next: (res: any) => {
        this.typeRoomView = res.typeRoom;
        this.typeRoomUpdate = res.typeRoom;
        this.typeRoomDeleted = res.typeRoom;
      },
      error: (err) => {alert(err.error.message)}
    })
  }


  showTable()
  {this.showTableTypeRoom =! this.showTableTypeRoom;
    for(let typeRoom of this.typesRooms)
    {
      typeRoom.checked = true
    }
  }


  showButtonActions(typeRoomID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let typeRoom of this.typesRooms)
      {
        if(typeRoomID != typeRoom._id)
        {
          typeRoom.checked =! controlCheck
        }
        else if(typeRoomID == typeRoom._id)
        {
          typeRoom.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let typeRoom of this.typesRooms)
      {
        typeRoom.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
  }

  deleteTypeRoom(id: string)
  {
    Swal.fire({
      title: 'Do you want to delete this Type Room?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeRoomRest.deleteTypeRoom(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypeRooms();
            if(this.showTableTypeRoom)
            {
              this.showButtonActions(id,false)
            }
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTypeRooms();
      } else if (result.isDenied)
      {
        Swal.fire('Type Room Not Deleted','', 'info')
      }
    })
  }

}
