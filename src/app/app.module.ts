import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

/*IMPORTACIONES MANUALES*/
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {  } from "@angular/material/snack-bar";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from "@angular/material/tooltip";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { HotelAdminComponent } from './components/admin/hotel-admin/hotel-admin.component';
import { SearchUserPipePipe } from './pipes/searchUserPiper/search-user-pipe.pipe';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { SidebarrightAdminComponent } from './components/admin/sidebarright-admin/sidebarright-admin.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/landingPage/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/landingPage/navbar/navbar.component';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { AboutUsComponent } from './components/landingPage/about-us/about-us.component';
import { RegisterComponent } from './components/landingPage/register/register.component';
import { ContactUsComponent } from './components/landingPage/contact-us/contact-us.component';
import { HotelComponent } from './components/landingPage/hotel/hotel.component';
import { SearchHotelPipe } from './pipes/searchHotelPipe/search-hotel.pipe';
import { EventsAdminComponent } from './components/admin/event-admin/event-admin.component';
import { HotelViewComponent } from './components/landingPage/hotel-view/hotel-view.component';
import { SearchHotelTablePipe } from './pipes/searchHotelTable/search-hotel-table.pipe';
import { SearchEventPipe } from './pipes/searchEventPipe/search-event.pipe';
import { ServicesAdminComponent } from './components/admin/services-admin/services-admin.component';
import { SearchServicePipe } from './pipes/searchService/search-service.pipe';
import { RoomAdminComponent } from './components/admin/room-admin/room-admin.component';
import { TypeRoomAdminComponent } from './components/admin/type-room-admin/type-room-admin.component';
import { SearchTypeRoomPipe } from './pipes/searchTypeRoom/search-type-room.pipe';
import { SearchRoomPipe } from './pipes/searchRoom/search-room.pipe';
import {HeaderAdminHotelComponent} from './layout/header-admin-hotel/header-admin-hotel.component'
import { SidebarAdminHotelComponent } from './components/hotelAdmin/sidebar-admin-hotel/sidebar-admin-hotel.component';
import { LayoutAdminHotelComponent } from './components/hotelAdmin/layout-admin-hotel/layout-admin-hotel.component';
import { HomeAdminHotelComponent } from './components/hotelAdmin/home-admin-hotel/home-admin-hotel.component';
import { SidebarrightAdminHotelComponent } from './components/hotelAdmin/sidebarright-admin-hotel/sidebarright-admin-hotel.component';
import { ProfileAdminHotelComponent } from './components/hotelAdmin/profile-admin-hotel/profile-admin-hotel.component';
import { ServicesAdminHotelComponent } from './components/hotelAdmin/services-admin-hotel/services-admin-hotel.component';
import { EventsAdminHotelComponent } from './components/hotelAdmin/events-admin-hotel/events-admin-hotel.component';
import { TypesRoomsAdminHotelComponent } from './components/hotelAdmin/types-rooms-admin-hotel/types-rooms-admin-hotel.component';
import { RoomsAdminHotelComponent } from './components/hotelAdmin/rooms-admin-hotel/rooms-admin-hotel.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PageLoaderComponent,
        SidebarComponent,
        RightSidebarComponent,
        HomeAdminComponent,
        AdminUserComponent,
        HotelAdminComponent,
        SearchUserPipePipe,
        SidebarAdminComponent,
        SidebarrightAdminComponent,
        LayoutAdminComponent,
        LoginComponent,
        NotFoundPageComponent,
        NavbarComponent,
        LandingPageComponent,
        AboutUsComponent,
        RegisterComponent,
        ContactUsComponent,
        HotelComponent,
        SearchHotelPipe,
        EventsAdminComponent,
        HotelViewComponent,
        SearchHotelTablePipe,
        SearchEventPipe,
        ServicesAdminComponent,
        SearchServicePipe,
        RoomAdminComponent,
        TypeRoomAdminComponent,
        SearchTypeRoomPipe,
        SearchRoomPipe,
        LayoutAdminHotelComponent,
        SidebarAdminHotelComponent,
        HomeAdminHotelComponent,
        SidebarrightAdminHotelComponent,
        HeaderAdminHotelComponent,
        ProfileAdminHotelComponent,
        ServicesAdminHotelComponent,
        EventsAdminHotelComponent,
        TypesRoomsAdminHotelComponent,
        RoomsAdminHotelComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        PerfectScrollbarModule,
        ClickOutsideModule,
        CoreModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatSortModule,
        MatToolbarModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NgApexchartsModule,
        FullCalendarModule, // register FullCalendar with you app
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
      ],
    providers:[
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
