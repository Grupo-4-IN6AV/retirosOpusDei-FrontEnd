import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ScriptSwiperService} from 'src/app/services/cargarScripts/script-swiper.service'
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { HotelModel } from 'src/app/models/hotel.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.css']
})
export class HotelAdminComponent implements OnInit {

  cargar: any;
  cargarDos:any;

  hotels: any;
  hotel: HotelModel;
  searchHotelTable:any
  hotelView: any;
  hotelUpdate: any;
  hotelDelete: any;
  nameUp: any;
  nameDown: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  hotelCheck : any;
  controloClick : number = 0
  showTableHotels: boolean = false;
  reset: any;
  checked: boolean = true;

  users: any;
  hotelDeleted:any;

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private userRest: UserRestService,
    private hotelRest: HotelRestService
  )
  {
    this.hotel = new HotelModel('', '','','','','','',true);
  }

  ngOnInit(): void
  {
    this.getHotels();
    this.getUsersAdminHotel();
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

  saveHotel(addHotelForm : any)
  {
    this.hotelRest.saveHotel(this.hotel).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getHotels();
        addHotelForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addHotelForm.reset();
      },
    })
    addHotelForm.reset();
  }

  getHotel(id : string)
  {
    this.hotelRest.getHotel(id).subscribe({
      next: (res: any) => {
        this.hotelView = res.hotel;
        this.hotelUpdate = res.hotel;
        this.hotelDeleted = res.hotel
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  updateHotel()
  {
    this.hotelRest.updateHotel(this.hotelUpdate._id, this.hotelUpdate).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getHotels();
        if(this.showTableHotels)
        {
          this.showButtonActions(this.hotelUpdate._id,false)
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

  deleteHotel(id: string)
  {
    Swal.fire({
      title: 'Do you want to delete this Hotel?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.hotelRest.deleteHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getHotels();
            if(this.showTableHotels)
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
        this.getHotels();
      } else if (result.isDenied)
      {
        Swal.fire('Hotel Not Deleted','', 'info')
      }
    })
  }

  getUsersAdminHotel()
  {
    this.userRest.getUsersAdminHotel().subscribe({
      next: (res: any) =>
      {
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  showTable()
  {
    this.showTableHotels =! this.showTableHotels;
    for(let hotel of this.hotels)
    {
      hotel.checked = true
    }
  }

  getHotelsNameUp() {
    this.hotelRest.getHotelsNameUp().subscribe({
      next: (res: any) => {
        this.nameDown = this.reset;
        this.nameUp = res.hotels
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  getHotelsNameDown() {
    this.hotelRest.getHotelsNameDown().subscribe({
      next: (res: any) => {
        this.nameDown = this.reset;
        this.nameUp = res.hotels
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  getHotelName(params:any) {
    this.hotelRest.getHotelName(params).subscribe({
      next: (res: any) => {
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  cleanTable() {
    this.nameUp = this.reset
    this.nameDown = this.reset
    this.getHotels();
    this.searchHotelTable = this.reset;
  }

  showButtonActions(hotelID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let hotel of this.hotels)
      {
        if(hotelID != hotel._id)
        {
          hotel.checked =! controlCheck
        }
        else if(hotelID == hotel._id)
        {
          hotel.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let hotel of this.hotels)
      {
        hotel.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
  }

  closeDialog(): void
  {
    this.dialog.closeAll();
  }

}
