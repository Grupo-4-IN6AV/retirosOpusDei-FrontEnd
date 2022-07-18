import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import {ScriptSwiperService} from 'src/app/services/cargarScripts/script-swiper.service'
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.css']
})
export class HotelAdminComponent implements OnInit {

  cargar: any;
  cargarDos:any;
  hotels: any;


  constructor(
  public _CargarScripts: ScriptSwiperService,
  private hotelRest: HotelRestService
  )
  {
  }

  ngOnInit(): void
  {
    this.cargar = new Swiper('.front-view-slider', {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.room-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        360: {
          slidesPerView: 50,
          spaceBetween: 20,
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 5,
          spaceBetween: 30,
        }
      }
    });
    this.getHotels();
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

}
