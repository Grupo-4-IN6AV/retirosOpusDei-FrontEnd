import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { RoomModel } from 'src/app/models/room.model'
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-admin',
  templateUrl: './room-admin.component.html',
  styleUrls: ['./room-admin.component.css']
})
export class RoomAdminComponent implements OnInit
{

  hotels:any;
  room: RoomModel;
  rooms:any;
  hotelSelected: any;
  typesRoomsHotel: any;
  showTableRooms:boolean = false;

  //Precio en Quetzales//
  newPrices:any

  roomView:any;
  roomUpdate:any;
  roomDeleted:any;
  newDateRoom:any;
  searchRoom:any;
  buttonActions: boolean = false;
  controloClick : number = 0
  notFound: boolean = false;
  newDates:any;

  constructor
  (
    private hotelRest: HotelRestService,
    private typeRoomRest: TypeRoomRestService,
    private roomRest: RoomRestService
  )
  {
    this.room = new RoomModel('','','','',1,'');
  }

  ngOnInit(): void
  {
    this.getHotels();
    this.getRooms();
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

  getRooms()
  {
    this.roomRest.getRooms().subscribe({
      next: (res: any) =>
      {
        this.rooms = res.rooms;
        var arrayPrices = [];
        var arrayDates = [];
        for(var key=0; key<this.rooms.length; key++)
        {
            var actualPrice = this.rooms[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }
            let split = this.rooms[key].dateAvailable.split('T');
            arrayDates.push(split[0])
        }
        this.newPrices = arrayPrices;
        this.newDates = arrayDates;
      },
      error: (err) => console.log(err)
    })
  }

  getHotel(id : string)
  {
    this.hotelRest.getHotel(id).subscribe({
      next: (res: any) => {
        this.hotelSelected = res.hotel;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  getTypeRoomHotel(id:string)
  {
    this.typeRoomRest.getTypesRoomsHotel(id).subscribe({
      next: (res: any) => {
        this.typesRoomsHotel = res.typeRooms;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveRoom(addRoomForm:any)
  {
    let params =
    {
      name: this.room.name,
      description: this.room.description,
      price: this.room.price,
      typeRoom: this.room.typeRoom,
      hotel: this.hotelSelected._id
    }
    this.roomRest.saveRoom(params).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getRooms();
        addRoomForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addRoomForm.reset();
      },
    })
    addRoomForm.reset();
  }

  getRoom(id : string)
  {
    this.roomRest.getRoom(id).subscribe({
      next: (res: any) => {
        this.roomView = res.room;
        this.roomUpdate = res.room;
        this.roomDeleted = res.room;
        let split = this.roomView.dateAvailable.split('T');
        this.newDateRoom = split[0]
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  showTable()
  {this.showTableRooms =! this.showTableRooms;
    for(let room of this.rooms)
    {
      room.checked = true
    }
  }

  showButtonActions(roomID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let room of this.rooms)
      {
        if(roomID != room._id)
        {
          room.checked =! controlCheck
        }
        else if(roomID == room._id)
        {
          room.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let room of this.rooms)
      {
        room.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
  }


  deleteRoom(id: string)
  {
    Swal.fire({
      title: 'Do you want to delete this Room?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.roomRest.deleteRoom(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getRooms();
            if(this.showTableRooms)
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
        this.getRooms();
      } else if (result.isDenied)
      {
        Swal.fire('Room Not Deleted','', 'info')
      }
    })
  }


  updateRoom()
  {
    this.roomRest.updateRoom(this.roomUpdate._id, this.roomUpdate).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getRooms();
        if(this.showTableRooms)
        {
          this.showButtonActions(this.roomUpdate._id,false)
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

}
