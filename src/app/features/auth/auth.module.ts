import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule } from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import {AccountDetailsModalComponent} from "../client/modals/account-details-modal/account-details-modal.component";

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivateAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
