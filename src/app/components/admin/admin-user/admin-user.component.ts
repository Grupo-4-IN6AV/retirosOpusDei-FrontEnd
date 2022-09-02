import { Component, OnInit} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { ExportExcelService } from 'src/app/services/exportData/exportExcel/export-excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})

export class AdminUserComponent implements OnInit
{

  constructor
  (
    private userRest: UserRestService,
    private excelService: ExportExcelService
  )
  {
    this.user = new UserModel('', '', 1, '', '', '', '', '', '', '', true);
  }

  ngOnInit(): void
  {
    this.getUsers();
  }

  //Variables de TypeScript - Usuarios//
  users : any;
  user : UserModel;
  userView : any;
  userUpdate : any;
  userDelete : any;
  searchUser : any;

  //Variables - Mostrar | Ocultar DOM//
  showTableUsers : boolean = false
  notFound : boolean = false

  //Variable de Reseteo//
  reset : any;

  //Variables - Control de Páginas//
  pageCard = 1;
  pageSizeCard = 6;
  page = 1;
  pageSize = 5;
  collectionSize: any

  //Variables - Control de Tablas//
  controloClickName : number = 0
  controloClickSurname : number = 0
  controloClickUsername : number = 0
  controloClickAge : number = 0

  //Control de Datos//
  nameUp : any;
  nameDown : any;
  surnameUp: any;
  surnameDown : any;
  usernameUp : any;
  usernameDown : any;
  ageUp : any;
  ageDown : any;

  //Botones de Acciones//
  buttonActions: boolean = false;
  controloClick : number = 0


  //Exportar Datos a Excel//
  exportExcel()
  {
    this.excelService.downloadExcel(this.users)
  }


  //METÓDOS DEL CRUD DE USERS//

  getUsers()
  {
    this.userRest.getUsers().subscribe({
      next: (res: any) =>
      {
        this.users = res.users;
        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            for(let user of this.users)
            {
              user.checked = true
            }
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUser(id : string)
  {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.userView = res.user;
        this.userUpdate = res.user;
        this.userDelete = res.user;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  deleteUser(id: string)
  {
    Swal.fire({
      title: 'Deseas eliminar este Usuario?',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
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
            if(this.showTableUsers)
            {
              this.showButtonActions(this.userUpdate._id,false)
            }
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getUsers();
      } else if (result.isDenied)
      {
        Swal.fire('Usuario No Eliminado','', 'info')
      }
    })
  }

  updateUser()
  {
    this.userUpdate.password = undefined
    this.userRest.updateUser(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getUsers();
        if(this.showTableUsers)
        {
          this.showButtonActions(this.userUpdate._id,false)
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

  //Control de Tablas//

  controlClicksName()
  {
    this.controloClickSurname = 0;
    this.controloClickUsername = 0;
    this.controloClickAge = 0;
    this.controloClickName += 1
    if(this.controloClickName == 1)
    {
      this.getUsersNameUp();
    }
    else if(this.controloClickName == 2)
    {
      this.getUsersNameDown();
    }
    else if(this.controloClickName == 3)
    {
      this.cleanTable();
    }
  }

  controlClicksSurname()
  {
    this.controloClickName = 0;
    this.controloClickUsername = 0;
    this.controloClickAge = 0;
    this.controloClickSurname += 1
    if(this.controloClickSurname == 1)
    {
      this.getUsersSurnameUp();
    }
    else if(this.controloClickSurname == 2)
    {
      this.getUsersSurnameDown();
    }
    else if(this.controloClickSurname == 3)
    {
      this.cleanTable();
    }
  }

  controlClicksUsername()
  {
    this.controloClickName = 0;
    this.controloClickSurname = 0;
    this.controloClickAge = 0;
    this.controloClickUsername += 1
    if(this.controloClickUsername == 1)
    {
      this.getUsersUsernameUp();
    }
    else if(this.controloClickUsername == 2)
    {
      this.getUsersUsernameDown();
    }
    else if(this.controloClickUsername == 3)
    {
      this.cleanTable();
    }
  }

  controlClicksUserAge()
  {
    this.controloClickSurname = 0;
    this.controloClickUsername = 0;
    this.controloClickName = 0;
    this.controloClickAge += 1;

    if(this.controloClickAge == 1)
    {
      this.getUsersAgeUp();
    }
    else if(this.controloClickAge == 2)
    {
      this.getUsersAgeDown();
    }
    else if(this.controloClickAge == 3)
    {
      this.cleanTable();
    }
  }

  getUsersNameDown()
  {
    this.userRest.getUsersNameDown().subscribe({
      next: (res: any) =>
      {
        this.nameDown = res.users
        this.users = res.users;

        this.nameUp = this.reset;
        this.surnameUp = this.reset;
        this.surnameDown = this.reset;
        this.usernameUp = this.reset;
        this.usernameDown = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersNameUp()
  {
    this.userRest.getUsersNameUp().subscribe({
      next: (res: any) =>
      {
        this.nameUp = res.users
        this.users = res.users;

        this.nameDown = this.reset;
        this.surnameUp = this.reset;
        this.surnameDown = this.reset;
        this.usernameUp = this.reset;
        this.usernameDown = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameUp()
  {
    this.userRest.getUsersSurnameUp().subscribe({
      next: (res: any) =>
      {
        this.surnameUp = res.users
        this.users = res.users;

        this.surnameDown = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.usernameUp = this.reset;
        this.usernameDown = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameDown()
  {
    this.userRest.getUsersSurnameDown().subscribe({
      next: (res: any) =>
      {
        this.surnameDown = res.users
        this.users = res.users;

        this.surnameUp = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.usernameUp = this.reset;
        this.usernameDown = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersUsernameUp()
  {
    this.userRest.getUsersUsernameUp().subscribe({
      next: (res: any) =>
      {
        this.usernameUp = res.users
        this.users = res.users;

        this.usernameDown = this.reset;
        this.surnameUp = this.reset;
        this.surnameDown = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersUsernameDown()
  {
    this.userRest.getUsersUsernameDown().subscribe({
      next: (res: any) =>
      {
        this.usernameDown = res.users
        this.users = res.users;

        this.usernameUp = this.reset;
        this.surnameDown = this.reset
        this.surnameUp = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.ageUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersAgeUp()
  {
    this.userRest.getUsersAgeUp().subscribe({
      next: (res: any) =>
      {
        this.ageUp = res.users
        this.users = res.users;

        this.usernameDown = this.reset;
        this.usernameUp = this.reset;
        this.surnameDown = this.reset
        this.surnameUp = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.ageDown = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  getUsersAgeDown()
  {
    this.userRest.getUsersAgeDown().subscribe({
      next: (res: any) =>
      {
        this.ageDown = res.users
        this.users = res.users;

        this.usernameDown = this.reset;
        this.usernameUp = this.reset;
        this.surnameDown = this.reset
        this.surnameUp = this.reset;
        this.nameDown = this.reset;
        this.nameUp = this.reset;
        this.ageUp = this.reset;

        this.collectionSize = this.users.length;
        for(let user of this.users)
        {
          user.position = this.users.indexOf(user)+1
        }
        if(this.showTableUsers === true)
        {
            this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }
      },
      error: (err) => console.log(err)
    })
  }

  saveUser(addUserForm : any)
  {
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

  showTable()
  {
    this.showTableUsers =! this.showTableUsers;
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
  }

  cleanTable()
  {
    this.nameUp = this.reset
    this.nameDown = this.reset
    this.surnameUp = this.reset
    this.surnameDown = this.reset
    this.usernameUp = this.reset
    this.usernameDown = this.reset
    this.ageUp = this.reset
    this.ageDown = this.reset
    this.getUsers();
    this.controloClickName = 0
    this.controloClickSurname = 0
    this.controloClickUsername = 0
    this.controloClickAge = 0
    this.searchUser = this.reset;
  }

}
