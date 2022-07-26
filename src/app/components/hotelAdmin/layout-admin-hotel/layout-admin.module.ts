import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import {HomeAdminComponent} from '../../admin/home-admin/home-admin.component'
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule],
  declarations: [ HomeAdminComponent],
})
export class LayoutAdminModule {}
