import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  user:UserModel;
  confirmPassword : string = '';
  timer : any;
  constructor
  (
    private userRest : CredentialsRestService,
    private router : Router
  )
  {
    this.user = new UserModel('', '', 1, '', '', '', '', '', '', '', true);
  }

  ngOnInit(): void
  {

  }

  async checkPassword()
  {
    clearTimeout(this.timer);
    this.timer = await setTimeout(()=>
    {
      if(this.user.password != '')
      {
        if (this.confirmPassword != this.user.password)
        {
          Swal.fire({
            icon:'error',
            title: 'Password do not Match',
            html:'Try Again',
            confirmButtonColor: '#E74C3C'
          })
        }
        else
        {
          Swal.fire({
            icon:'success',
            title: 'Passwords Match',
            confirmButtonColor: '#28B463'
          })
        }
      }
      else
      {
        Swal.fire({
          icon:'info',
          title: 'Set value in input Password',
          confirmButtonColor: '#0D6EFD'
        })
      }
    }, 800);
  }

  register()
  {
    this.userRest.register(this.user).subscribe
    ({

      next : (res : any) =>
      {
        Swal.fire({
          title: res.message,
          html:'Already can Login now.',
          confirmButtonColor: '#28B463'
        })
        this.router.navigateByUrl('/')
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    });
  }

}
