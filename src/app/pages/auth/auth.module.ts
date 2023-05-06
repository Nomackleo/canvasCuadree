import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    RecoverPassComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsSharedModule,
  ],
})
export class AuthModule {}
