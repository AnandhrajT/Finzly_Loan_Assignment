import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/CustomerModel';
import { LoanServiceService } from './loan-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  customermodel: CustomerModel = new CustomerModel;

  constructor(private loanService: LoanServiceService,private http: HttpClient) {

  }

    async authenticate(username: string, password: string) {
    this.customermodel = await this.loanService.verifyCustomer(username, password).toPromise();

    if (this.customermodel.customerId != null) {
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    }
    return false;
  }
  getCustomerId(): string {
    return this.customermodel.customerId;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }
  logout() {
    sessionStorage.removeItem('authenticaterUser')
  }

  authenticateForAdmin(username : any,password : any){
    if(username==="Anandharaj" && password ==="Anandharaj"){
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    }
    return false;
  }
}
