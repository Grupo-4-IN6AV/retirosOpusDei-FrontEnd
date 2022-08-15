import { Pipe, PipeTransform } from '@angular/core';
import { AdminUserComponent } from 'src/app/components/admin/admin-user/admin-user.component';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform
{

  users : any;

  constructor
  (
    private userRest: UserRestService,
    private userComponent: AdminUserComponent,
  ){ }
  transform(users:any, search:any)
  {
    if(search == undefined)
    {
      return users;
    }
    else
    {
      return users.filter( (user:any) =>
      {
        let params = {name:search}
        this.userRest.searchUser(params).subscribe({
          next: (res: any) =>
          {
            this.users = res.users;
            if(this.users.length === 0)
            {
              this.userComponent.notFound = true;
            }
            else if(this.users.length !== 0)
            {
              this.userComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return user.name.toLowerCase().includes(search.toLowerCase())
          | user.surname.toLowerCase().includes(search.toLowerCase())
          | user.username.toLowerCase().includes(search.toLowerCase())
          | user.role.toLowerCase().includes(search.toLowerCase())
          ;
      })
    }
  }

}
