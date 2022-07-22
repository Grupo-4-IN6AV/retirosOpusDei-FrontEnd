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
        }
        this.newPrices = arrayPrices;
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
        console.log(this.typesRoomsHotel)
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

}
