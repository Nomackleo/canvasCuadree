import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToCanvas = () => redirectLoggedInTo(['canvas']);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectToCanvas),
      },
      {
        path: 'register',
        component: RegisterComponent,
        ...canActivate(redirectToCanvas),
      },
      {
        path: 'recover-password',
        component: RecoverPassComponent,
      },
      {
        path: 'verification-email',
        component: EmailVerificationComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
