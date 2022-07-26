import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})


export class AdminUserComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private userRest: UserRestService,
  ) {
    this.user = new UserModel('', '', '', '', '', '', '', '', true);
  }

  public ngOnInit(): void
  {
    this.getUsers();
  }

  //Variables de TypeScript//
  users: any;
  user: UserModel;
  searchUser: any
  userView: any;
  userUpdate: any;
  userDelete: any;
  showTableUsers: boolean = false;
  userNameUp: any;
  userNameDown: any;
  userSurnameUp: any;
  userSurnameDown: any;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  userCheck : any;
  controloClick : number = 0

  //IMAGENES//
  userImage: any;
  uri:any;
  uriUser: any;

  //METÓDOS DEL CRUD DE USERS//
  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) =>
      {
        this.users = res.users;
        this.uriUser = environment.baseURI+'user/getImage/'
      },
      error: (err) => console.log(err)
    })
  }

  saveUser(addUserForm: any) {
    this.userRest.saveUser(this.user).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getUsers();
          addUserForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addUserForm.reset();
        },
      })
    addUserForm.reset();
  }

  getUser(id: string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.userView = res.user;
        this.userUpdate = res.user;
        this.userDelete = res.user
        this.userImage = this.userView.image;
        this.uri = environment.baseURI + 'user/getImage/' + this.userImage;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  updateUser() {
    this.userUpdate.password = undefined;
    this.userRest.updateUser(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res: any) => {

        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getUsers();
        this.showButtonActions(this.userUpdate._id,false)
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

  deleteUser(id: string) {
    Swal.fire({
      title: 'Do you want to delete this User?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userRest.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getUsers();
            this.showButtonActions(id,false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getUsers();
      } else if (result.isDenied) {
        Swal.fire('User Not Deleted', '', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableUsers =! this.showTableUsers;
    for(let user of this.users)
    {
      user.checked = true
    }
  }

  getUsersByUp() {
    this.userRest.getUsersByUp().subscribe({
      next: (res: any) => {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameUp = res.users
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersByDown() {
    this.userRest.getUsersByDown().subscribe({
      next: (res: any) => {
        this.userNameUp = this.reset;
        this.userSurnameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameDown = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameByUp() {
    this.userRest.getUsersSurnameByUp().subscribe({
      next: (res: any) => {
        this.userNameDown = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameUp = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameByDown() {
    this.userRest.getUsersSurnameByDown().subscribe({
      next: (res: any) => {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersClient() {
    this.userRest.getUsersClient().subscribe({
      next: (res: any) => {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersAdminHotel() {
    this.userRest.getUsersAdminHotel().subscribe({
      next: (res: any) => {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  cleanTable() {
    this.userNameUp = this.reset
    this.userNameDown = this.reset
    this.userSurnameUp = this.reset
    this.userSurnameDown = this.reset
    this.getUsers();
    this.searchUser = this.reset;
  }

  showButtonActions(userID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let user of this.users)
      {
        if(userID != user._id)
        {
          user.checked =! controlCheck
        }
        else if(userID == user._id)
        {
          user.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let user of this.users)
      {
        user.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
    console.log(this.controloClick)
  }

  closeDialog(): void
  {
    this.dialog.closeAll();
  }
}

