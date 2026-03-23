import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { PaymentRecipientsComponent } from './components/payment-recipients/payment-recipients.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'accounts',
    component: AccountListComponent
  },
  // Primaoci plaćanja
  {
    path: 'payments/recipients',
    component: PaymentRecipientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
