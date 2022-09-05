import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import {ScriptLoginService} from '../../../services/cargarScripts/script-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;

  constructor(
    private router: Router,
    private userRest: CredentialsRestService,
    private _ScriptsRegister: ScriptLoginService
  ){
    _ScriptsRegister.Carga(["register"]);
    this.user = new UserModel('', '', 1, '', '', '', '', '', '', '', true);
  }

  ngOnInit(): void {
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
