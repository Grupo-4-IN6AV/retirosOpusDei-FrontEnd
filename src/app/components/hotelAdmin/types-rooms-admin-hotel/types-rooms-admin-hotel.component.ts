import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';
import { TypeRoomModel } from 'src/app/models/typeRoom.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types-rooms-admin-hotel',
  templateUrl: './types-rooms-admin-hotel.component.html',
  styleUrls: ['./types-rooms-admin-hotel.component.css']
})
export class TypesRoomsAdminHotelComponent implements OnInit {

  hotel: any;
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
    this.getHotel();
    this.getTypeRooms();
  }

  getHotel()
  {
    this.hotelRest.getHotelManager().subscribe({
      next: (res: any) =>
      {
        this.hotel = res.hotel
      },
      error: (err) => console.log(err)
    })
  }

  getTypeRooms()
  {
    this.typeRoomRest.getTypeRoomHotel().subscribe({
      next: (res: any) =>
      {
        this.typesRooms = res.typesRooms
      },
      error: (err) => console.log(err)
    })
  }

  saveTypeRoom(addTypeRoomForm : any)
  {
    let params =
    {
      name: this.typeRoom.name,
      description: this.typeRoom.description,
      numberPersons: this.typeRoom.numberPersons,
      hotel: this.hotel._id
    }
    this.typeRoomRest.saveTypeRoomHotel(params).subscribe
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
    let params =
    {
      name: this.typeRoomUpdate.name,
      description: this.typeRoomUpdate.description,
      numberPersons: this.typeRoomUpdate.numberPersons,
      hotel: this.hotel._id
    }
    this.typeRoomRest.updateTypeRoomHotel(this.typeRoomUpdate._id, params).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTypeRooms();
        if(this.showTableTypeRoom==true)
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
    this.typeRoomRest.getTypeRoomHotelOne(id).subscribe({
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
        this.typeRoomRest.deleteTypeRoomHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypeRooms();
            this.showButtonActions(id,false)
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
