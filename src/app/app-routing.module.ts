import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/landingPage/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/landingPage/navbar/navbar.component';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { AboutUsComponent } from './components/landingPage/about-us/about-us.component';
import { RegisterComponent } from './components/landingPage/register/register.component';
import { ContactUsComponent } from './components/landingPage/contact-us/contact-us.component';
import { HotelComponent } from './components/landingPage/hotel/hotel.component';
import { HotelAdminComponent } from './components/admin/hotel-admin/hotel-admin.component';

const routes: Routes =
[
  {
    path: '', component:NavbarComponent,children:
    [
      {path: '', component: LandingPageComponent},
      {path: 'aboutUs', component: AboutUsComponent},
      {path: 'contactUs', component: ContactUsComponent},
      {path: 'hotels', component: HotelComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: 'admin', component:LayoutAdminComponent,children:
    [
      {path: 'home', component: HomeAdminComponent},
      {path: 'user', component: AdminUserComponent},
      {path: 'hotel', component: HotelAdminComponent},
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
