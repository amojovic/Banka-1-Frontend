import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: 1, firstName: 'Marko', lastName: 'Marković', email: 'marko.markovic@company.com',
      phoneNumber: '060123456', position: 'Frontend Developer', jmbg: '1234567890123',
      address: 'Adresa 1', birthDate: '1995-05-10', status: true,
      role: 'Admin', permissions: ['Create', 'Delete', 'Edit', 'View'] // Ima 4 dozvole
    },
    {
      id: 2, firstName: 'Jelena', lastName: 'Petrović', email: 'jelena.petrovic@company.com',
      phoneNumber: '064987654', position: 'HR Manager', jmbg: '9876543210321',
      address: 'Adresa 2', birthDate: '1988-12-15', status: true,
      role: 'Regular', permissions: ['View']
    },
    {
      id: 3, firstName: 'Nikola', lastName: 'Jovanović', email: 'nikola.jovanovic@company.com',
      phoneNumber: '063112233', position: 'Backend Developer', jmbg: '1122334455667',
      address: 'Adresa 3', birthDate: '1992-08-22', status: true,
      role: 'Regular', permissions: ['View']
    }
  ];

  constructor() {}
  // Metoda za brisanje (simulacija API poziva)
  deleteEmployee(id: number): Observable<boolean> {
    // Filtriramo niz tako da izbacimo onog sa prosleđenim ID-jem
    this.mockEmployees = this.mockEmployees.filter(emp => emp.id !== id);
    return of(true); // Vraćamo true kao potvrdu da je uspešno obrisano
  }
  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees);
  }
}