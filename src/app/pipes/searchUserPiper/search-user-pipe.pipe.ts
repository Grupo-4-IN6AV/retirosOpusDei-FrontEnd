import { Pipe, PipeTransform } from '@angular/core';
import { AdminUserComponent } from 'src/app/components/admin/admin-user/admin-user.component';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Pipe({
  name: 'searchUserPipe'
})
export class SearchUserPipePipe implements PipeTransform {

  users: any;

  constructor
  (
    private UserRest: UserRestService,
    private UserComponent: AdminUserComponent
  ){ }

  transform(users:any, search:any){
    if(search == undefined){
      return users;
    }else{
      return users.filter( (user:any) =>
      {
        let params = {name:search}
        this.UserRest.searchUser(params).subscribe({
          next: (res: any) =>
          {
            this.users = res.users;
            if(this.users.length === 0)
            {
              this.UserComponent.notFound = true;
            }
            else if(this.users.length !== 0)
            {
              this.UserComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return user.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
