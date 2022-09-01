import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import {ScriptLoginService} from '../../../services/cargarScripts/script-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  user: UserModel;
  confirmPassword: string = '';
  timer: any;

  constructor
  (
    private router: Router,
    private userRest: CredentialsRestService,
    private _ScriptsLogin: ScriptLoginService
  )
  {
    _ScriptsLogin.Carga(["app"]);
    this.user = new UserModel('', '', 1, '', '', '', '', '', '', '', true);
  }

  ngOnInit(): void {

  }

  login()
  {
    this.userRest.login(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('identity', JSON.stringify(res.userExist));
        localStorage.setItem('token', res.token);
        localStorage.setItem('outService', 'false');

        Swal.fire({
          icon: 'success',
          title: res.message,
          html: 'Bienvenido <b>' + res.userExist.username + '</b>',
          confirmButtonColor: '#28B463'
        })

        const verificarAdmin = res.userExist.role;
        //VERIFICA A DONDE LLEVARME//
        if (verificarAdmin == 'ADMINISTRADOR') { this.router.navigate(['/admin/user']); }

        if (verificarAdmin == 'DOCTOR') { this.router.navigate(['/doctor/home']) }

        if (verificarAdmin == 'PACIENTE') { this.router.navigate(['/paciente/home']) }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }


  async checkPassword() {
    clearTimeout(this.timer);
    this.timer = await setTimeout(() => {
      if (this.user.password != '') {
        if (this.confirmPassword != this.user.password) {
          Swal.fire({
            icon: 'error',
            title: 'Password do not Match',
            html: 'Try Again',
            confirmButtonColor: '#E74C3C'
          })
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'Passwords Match',
            confirmButtonColor: '#28B463'
          })
        }
      }
      else {
        Swal.fire({
          icon: 'info',
          title: 'Set value in input Password',
          confirmButtonColor: '#0D6EFD'
        })
      }
    }, 800);
  }

  register() {
    this.userRest.register(this.user).subscribe
      ({

        next: (res: any) => {
          Swal.fire({
            title: res.message,
            html: 'Already can Login now.',
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
