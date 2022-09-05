import { UbicacionesComponent } from './components/landingPage/ubicaciones/ubicaciones.component';
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
import { RegisterComponent } from './components/landingPage/register/register.component';
import { NavDosComponent } from './components/landingPage/nav-dos/nav-dos.component';

const routes: Routes =
[
  {
    path: '', component: NavbarComponent, children:
    [
      {path: '', component: LandingPageComponent},
      {path: 'desarrolladores', component: DevelopsComponent},
      {path: 'contactanos', component: ContactUsComponent},
      {path: 'iniciaSesion', component: LoginComponent},
      {path: 'registrate', component: RegisterComponent},
      {path: 'ubicaciones', component:UbicacionesComponent},
    ]
  },{path: 'navP', component:NavDosComponent},
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
