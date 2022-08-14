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

    }
  }


