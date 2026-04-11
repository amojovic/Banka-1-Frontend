import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Installment,
  Loan,
  LoanPage,
  LoanRequest,
  LoanStatus,
  LoanType,
  InterestRateType
} from '../models/loan.model';

export interface LoanRequestFilters {
  loanType?: LoanType | string | '';
  accountNumber?: string;
}

export interface EmployeeLoanFilters {
  loanType?: LoanType | string | '';
  accountNumber?: string;
  status?: LoanStatus | string | '';
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly loansUrl = `${environment.apiUrl}/credit/api/loans`;
  private readonly myLoansUrl = `${environment.apiUrl}/credit/api/loans/my-loans`;
  private readonly requestsUrl = `${environment.apiUrl}/credit/api/loans/requests`;

  constructor(private readonly http: HttpClient) {}

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.myLoansUrl);
  }

  getLoanById(id: string | number): Observable<Loan> {
    return this.http.get<Loan>(`${this.myLoansUrl}/${id}`);
  }

  getLoanInstallments(loanId: string | number): Observable<Installment[]> {
    return this.http.get<Installment[]>(`${this.myLoansUrl}/${loanId}/installments`);
  }

  getLoanRequests(
    filters: LoanRequestFilters = {},
    page = 0,
    size = 10
  ): Observable<LoanPage<LoanRequest>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'submittedAt,desc');

    if (filters.loanType) {
      params = params.set('loanType', String(filters.loanType));
    }

    if (filters.accountNumber?.trim()) {
      params = params.set('accountNumber', filters.accountNumber.trim());
    }

    // TODO
    return this.http.get<LoanPage<LoanRequest>>(this.requestsUrl, { params });
  }

  approveLoanRequest(requestId: number): Observable<void> {
    // TODO
    return this.http.post<void>(`${this.requestsUrl}/${requestId}/approve`, {});
  }

  rejectLoanRequest(requestId: number): Observable<void> {
    // TODO
    return this.http.post<void>(`${this.requestsUrl}/${requestId}/reject`, {});
  }

  requestLoan(loanRequestDto: any): Observable<any> {
    return this.http.post<any>(`${this.requestsUrl}`, loanRequestDto);
  }

  getAllLoans(
    filters: EmployeeLoanFilters = {},
    page = 0,
    size = 10
  ): Observable<LoanPage<Loan>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'accountNumber,asc');

    if (filters.loanType) {
      params = params.set('loanType', String(filters.loanType));
    }

    if (filters.accountNumber?.trim()) {
      params = params.set('accountNumber', filters.accountNumber.trim());
    }

    if (filters.status) {
      params = params.set('status', String(filters.status));
    }

    // TODO
    return this.http.get<LoanPage<Loan>>(this.loansUrl + '/all', { params });
  }

  getEmployeeLoanById(id: string | number): Observable<Loan> {
    // TODO
    return this.http.get<Loan>(`${this.loansUrl}/${id}`);
  }

  getEmployeeLoanInstallments(loanId: string | number): Observable<Installment[]> {
    // TODO
    return this.http.get<Installment[]>(`${this.loansUrl}/${loanId}/installments`);
  }
}
