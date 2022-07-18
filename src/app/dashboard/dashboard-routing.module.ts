import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from '../components/admin/admin-user/admin-user.component';
import { HomeAdminComponent } from '../components/admin/home-admin/home-admin.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: AdminUserComponent
  },
  {
    path: 'home',
    component: HomeAdminComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
