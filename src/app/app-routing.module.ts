import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/landingPage/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/landingPage/navbar/navbar.component';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { ContactUsComponent } from './components/landingPage/contact-us/contact-us.component';
import { DevelopsComponent } from './components/landingPage/develops/develops.component';

const routes: Routes =
[
  {
    path: '', component: NavbarComponent, children:
    [
      {path: '', component: LandingPageComponent},
      {path: 'desarrolladores', component: DevelopsComponent},
      {path: 'contactanos', component: ContactUsComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'admin', component:LayoutAdminComponent,children:
    [
      {path: 'home', component: HomeAdminComponent},
      {path: 'user', component: AdminUserComponent},
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
