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
 reservationDeleted: any;
 notFound: boolean = false

 OnlyOneDate: any;
 actualUserId: any;
 newDate: any;

 constructor
 (
   public hotelRest : HotelRestService,
   public eventRest : EventRestService,
   public reservationRest: ReservationRestService
 )
 {
   this.reservation = new ReservationModel('','','','',0);
 }

 ngOnInit(): void
 {

   this.getReservations();
 }

 getReservations()
 {
   this.reservationRest.getReservationsUser().subscribe({
     next: (res: any) =>
     {
       this.reservations = res.reservations
       var arrayDate = [];
        for(let date of res.reservations){
          const newDate = date.date.split('T');
          arrayDate.push(newDate[0])
        }
        this.newDate = arrayDate;
     },
     error: (err) => console.log(err)
   })
 }

 deleteEvent(id:string)
 {
   Swal.fire({
     title: 'Do you want to delete this Event?',
     showDenyButton: true,
     showCancelButton: true,
     confirmButtonText: 'Delete',
     denyButtonText: `Don't delete`,
   }).then((result) => {
     /* Read more about isConfirmed, isDenied below */
     if (result.isConfirmed) {
       this.eventRest.deleteEvent(id).subscribe({
         next: (res: any) => {
           Swal.fire({
             title: res.message,
             icon: 'success',
             position: 'center',
             showConfirmButton: false,
             timer: 2000
           });
         },
         error: (err) => Swal.fire({
           title: err.error.message,
           icon: 'error',
           position: 'center',
           timer: 3000
         })
       })
     } else if (result.isDenied)
     {
       Swal.fire('Event Not Deleted','', 'info')
     }
   })
 }


 updateEvent()
 {
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
     next: (res:any)=>
     {
       Swal.fire({
         icon:'success',
         title: res.message,
         confirmButtonColor: '#28B463'
       });
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
