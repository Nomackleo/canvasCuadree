import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';

import { UserPanelComponent } from './user-panel.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const adminOnly = () =>
  map(
    (user: any) =>
      (!!user && user.uid === environment.adminUsers.admin1) ||
      user.uid === environment.adminUsers.admin2 ||
      user.uid === environment.adminUsers.admin3
  );

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
    children: [
      { path: 'account', component: AccountComponent },
      {
        path: 'edit-account',
        component: EditAccountComponent,
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'admin', component: AdminComponent, ...canActivate(adminOnly) },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
