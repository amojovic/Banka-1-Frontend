import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import {AccountDetailsModalComponent} from "./modals/account-details-modal/account-details-modal.component";

@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailsModalComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule {}
