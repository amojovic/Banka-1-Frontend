import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/components/employee-list/employee-list.component';

const routes: Routes = [
  // Kada odemo na /employees, prikazuje se tvoja lista
  { path: 'employees', component: EmployeeListComponent },
  
  // Kada se otvori prazna adresa (localhost:4200), automatski preusmerava na /employees
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }