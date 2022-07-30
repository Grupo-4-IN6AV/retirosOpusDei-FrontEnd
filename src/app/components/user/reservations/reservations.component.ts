import { Component, OnInit } from '@angular/core';
import { ReservationModel } from '../../../models/reservation.model'
import { HotelRestService } from '../../../services/hotelRest/hotel-rest.service';
import { ReservationRestService } from 'src/app/services/reservationRest/reserevation-rest.service';
import { EventRestService } from '../../../services/eventRest/event-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  //Variables de TypeScript//
  reservation: ReservationModel;

  reservations: any;
  reservationView: any;
  reservationUpdate: any;
  reservationServices:any;
  reservationDeleted: any;
  notFound: boolean = false

  OnlyOneDate: any;
  actualUserId: any;
  newDateEntry: any;
  newDateExit: any;

  actualDate: any;

  onlyOneDateEntry: any;
  onlyOneDateExit: any;

  constructor
    (
      public hotelRest: HotelRestService,
      public eventRest: EventRestService,
      public reservationRest: ReservationRestService
    ) {
    this.reservation = new ReservationModel('', '', '', '', 0);
  }

  ngOnInit(): void {
    this.actualDate = new Date();
    this.getReservations();
  }

  getReservations() {
    this.reservationRest.getReservationsUser().subscribe({
      next: (res: any) => {
        this.reservations = res.reservations
        var arrayDateEntry = [];
        var arrayDateExit = [];
        for (let date of res.reservations) {
          const newDateEntry = date.entryDate.split('T');
          const newDateExit = date.exitDate.split('T');
          arrayDateEntry.push(newDateEntry[0]);
          arrayDateExit.push(newDateExit[0]);
        }
        this.newDateEntry = arrayDateEntry;
        this.newDateExit = arrayDateExit;
      },
      error: (err) => console.log(err)
    })
  }

  getReservation(id: string) {
    this.reservationRest.getReservation(id).subscribe({
      next: (res: any) => {
        this.reservationView = res.reservation;
        this.reservationUpdate = res.reservation;
        this.reservationDeleted = res.reservation;
        this.reservationServices = res.services;
        let splitEntry = res.reservation.entryDate.split('T');
        let splitExit = res.reservation.exitDate.split('T');
        this.onlyOneDateEntry = splitEntry[0];
        this.onlyOneDateExit = splitEntry[0];
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  deleteReservation(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Reservation?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.reservationRest.deleteReservation(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message  ,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getReservations();
          },
          error: (err) => Swal.fire({
            title: err.error.message || err.error,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
      } else if (result.isDenied) {
        Swal.fire('Reservation Not Deleted', '', 'info')
      }
    })
  }


  updateReservations() {
    let params =
    {
      name: this.reservationUpdate.name,
      description: this.reservationUpdate.description,
      date: this.reservationUpdate.name,
      startHour: this.reservationUpdate.startHour,
      endHour: this.reservationUpdate.endHour,
      hotel: this.reservationUpdate.hotel,
    }
    this.eventRest.updateEvent(this.reservationUpdate._id, params).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }
}