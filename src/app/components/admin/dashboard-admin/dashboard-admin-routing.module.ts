import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from '../admin-user/admin-user.component';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
const routes: Routes =
[
  {
    path: 'home',
    component: HomeAdminComponent
  },
  {
    path: 'user',
    component: AdminUserComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
