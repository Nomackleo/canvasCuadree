import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoiceComponent } from 'src/app/shared/components/invoice/invoice.component';
import { SidemenuComponent } from 'src/app/shared/components/sidemenu/sidemenu.component';
import { UserPanelComponent } from './user-panel.component';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    AdminComponent,
    EditAccountComponent,
    InvoiceComponent,
    OrdersComponent,
    SidemenuComponent,
    UserPanelComponent,
  ],
  imports: [CommonModule, UserPanelRoutingModule, ComponentsSharedModule],
})
export class UserPanelModule {}
