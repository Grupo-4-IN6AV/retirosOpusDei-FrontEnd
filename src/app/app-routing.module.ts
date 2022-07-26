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
import { EventsAdminComponent } from './components/admin/event-admin/event-admin.component';
import { HotelViewComponent } from './components/landingPage/hotel-view/hotel-view.component';
import { ServicesAdminComponent } from './components/admin/services-admin/services-admin.component';
import { RoomAdminComponent } from './components/admin/room-admin/room-admin.component';
import { TypeRoomAdminComponent } from './components/admin/type-room-admin/type-room-admin.component';


import { LayoutAdminHotelComponent } from './components/hotelAdmin/layout-admin-hotel/layout-admin-hotel.component';
import { HomeAdminHotelComponent } from './components/hotelAdmin/home-admin-hotel/home-admin-hotel.component';
import { ProfileAdminHotelComponent } from './components/hotelAdmin/profile-admin-hotel/profile-admin-hotel.component';
import { ServicesAdminHotelComponent } from './components/hotelAdmin/services-admin-hotel/services-admin-hotel.component';
import { EventsAdminHotelComponent } from './components/hotelAdmin/events-admin-hotel/events-admin-hotel.component';
import { TypesRoomsAdminHotelComponent } from './components/hotelAdmin/types-rooms-admin-hotel/types-rooms-admin-hotel.component';
import { RoomsAdminHotelComponent } from './components/hotelAdmin/rooms-admin-hotel/rooms-admin-hotel.component';


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
      {path: 'viewRoom/:id', component: HotelViewComponent},
    ]
  },
  {
    path: 'admin', component:LayoutAdminComponent,children:
    [
      {path: 'home', component: HomeAdminComponent},
      {path: 'user', component: AdminUserComponent},
      {path: 'hotel', component: HotelAdminComponent},
      {path: 'event', component: EventsAdminComponent},
      {path: 'service', component: ServicesAdminComponent},
      {path: 'room', component: RoomAdminComponent},
      {path: 'typeRoom', component: TypeRoomAdminComponent},
    ]
  },
  {
    path: 'admin-hotel', component:LayoutAdminHotelComponent, children:
    [
      {path: 'home', component: HomeAdminHotelComponent},
      {path: 'profile', component: ProfileAdminHotelComponent},
      {path: 'event', component: EventsAdminHotelComponent},
      {path: 'service', component: ServicesAdminHotelComponent},
      {path: 'room', component: RoomsAdminHotelComponent},
      {path: 'typeRoom', component: TypesRoomsAdminHotelComponent},
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
