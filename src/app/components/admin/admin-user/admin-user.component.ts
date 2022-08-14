import { Component, OnInit} from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

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
  )
  {
  }

  //Variables de TypeScript//
  users : any;

  ngOnInit(): void
  {
    this.getUsers();
  }


  page = 1;
  pageSize = 3;
  collectionSize: any



  //METÓDOS DEL CRUD DE USERS//
  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) =>
      {
        this.users = res.users;
        this.collectionSize = this.users.length;
        this.users = this.users.map((user, i) => ({id: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      },
      error: (err) => console.log(err)
    })
  }

}
