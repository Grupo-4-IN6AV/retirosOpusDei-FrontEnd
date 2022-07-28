import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthLayoutComponent } from './app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './app-layout/main-layout/main-layout.component';
import { HeaderAdminHotelComponent } from './header-admin-hotel/header-admin-hotel.component';
import { HeaderUserComponent } from './header-user/header-user.component';
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule],
  declarations: [AuthLayoutComponent, MainLayoutComponent, HeaderAdminHotelComponent, HeaderUserComponent],
})
export class LayoutModule {}
