import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanModel } from '../models/LoanModel';
import { CustomerModel } from '../models/CustomerModel';
import { EmiModel } from '../models/EmiModel';

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  verifyCustomer(email: string, password: string): Observable<CustomerModel> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.get<CustomerModel>(`${this.baseUrl}` + '/verify-customer', { params: params });
  }

  saveCustomer(customermodel: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(`${this.baseUrl}` + '/add-customer', customermodel);
  }

  getCustomerDetails(customerId: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.baseUrl}` + '/customer/' + `${customerId}`);
  }

  saveLoan(loanmodel: LoanModel): Observable<LoanModel> {
    // let headers=new HttpHeaders;
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post<LoanModel>(`${this.baseUrl}` + '/loanModel', loanmodel);
  }

  getLoanList(customerId: string): Observable<LoanModel[]> {
    return this.http.get<LoanModel[]>(`${this.baseUrl}` + '/loans/' + `${customerId}`);
  }

  getPaymentSchedule(loanId: string): Observable<EmiModel[]> {
    return this.http.get<EmiModel[]>(`${this.baseUrl}` + '/loan/payment-schedule/' + `${loanId}`);
  }

  updatePaymentStatus(paymentId: any) {
    return this.http.put<EmiModel>(`${this.baseUrl}` + `update-payment/` + `${paymentId}`, null);
  }


}