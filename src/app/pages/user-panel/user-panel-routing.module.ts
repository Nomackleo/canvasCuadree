import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RecoverPassComponent } from '../auth/recover-pass/recover-pass.component';
import { EmailVerificationComponent } from '../auth/email-verification/email-verification.component';
import { UserPanelComponent } from './user-panel.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';

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
      { path: 'admin', component: AdminComponent },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
