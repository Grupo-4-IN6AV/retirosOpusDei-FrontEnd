import { Component, OnInit } from '@angular/core';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-admin-hotel',
  templateUrl: './hotel-admin-hotel.component.html',
  styleUrls: ['./hotel-admin-hotel.component.css']
})
export class HotelAdminHotelComponent implements OnInit {

  constructor
  (
    private userRest: UserRestService,
    private credentialRest: CredentialsRestService,
    private hotelRest: HotelRestService
  )
  {
  }

  //Hotel//
  hotel:any;
  updateHotel:any;

  //Usuario Logueado//
  user:any;
  updateUser:any;
  filesToUpload: any;
  //Mostrar Fotografía//
  userImage: any
  uri: any
  reloadImage: any
  //Password
  password:any;
  newPassword:any;
  reset:any;

  ngOnInit(): void
  {
    this.userLogin()
    this.getHotel();
  }

  cleanForm()
  {
    this.password = this.reset;
    this.newPassword = this.reset;
  }

  userLogin()
  {
    this.userRest.getUser(this.credentialRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.updateUser = res.user
        this.userImage = this.user.image;
        this.uri = environment.baseURI + 'user/getImage/' + this.userImage;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  //UPLOAD IMAGE//
  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
  }

  uploadImage()
  {
    this.hotelRest.requestFiles(this.hotel._id, this.filesToUpload, 'image')
      .then((res: any) => {
        if (!res.error)
        {
          this.getHotel();
          Swal.fire
            ({
              icon: 'success',
              title: 'Image added Successfully.',
              confirmButtonColor: '#28B463'
            });
        }
        else
        {
          console.log(res)
        }
      })
      .catch(error =>
        {
          Swal.fire({
            icon: 'error',
            title: error,
            confirmButtonColor: '#E74C3C'
          });
        })
    }

    hotelUpdate()
    {
      let params =
      {
        name: this.updateHotel.name,
        description: this.updateHotel.description,
        address: this.updateHotel.address,
        email: this.updateHotel.email,
        phone: this.updateHotel.phone,
        admin: this.user._id
      }
      this.hotelRest.updateHotelManager(this.updateHotel._id, params).subscribe({
        next: (res:any)=>
        {
          Swal.fire({
            icon:'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.getHotel();
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

    getHotel()
    {
      this.hotelRest.getHotelManager().subscribe({
        next: (res: any) => {
          this.hotel = res.hotel;
          this.updateHotel = res.hotel;
        },
        error: (err) => {alert(err.error.message)}
      })
    }

}
