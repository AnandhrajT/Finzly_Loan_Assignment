import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/models/CustomerModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { LoanServiceService } from 'src/app/Services/loan-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: CustomerModel = new CustomerModel;
  customerForm: FormGroup |any;
  customerId:string;
  spin: boolean|any;
  constructor(private loanServiceService: LoanServiceService, private formBuilder: FormBuilder,private authServiceService:AuthServiceService) {
    this.customerId=this.authServiceService.getCustomerId();
    this.spin=true;
    this.loanServiceService.getCustomerDetails(this.customerId).subscribe((data: any) => {
      this.spin=false;
      this.model = data;
      this.customerForm = this.formBuilder.group({
        customerId: [this.model.customerId,],
        name: [this.model.name],
        accountNumber: [this.model.accountNumber],
        phone: [this.model.phone],
        email: [this.model.email]
      });
    });
  }
  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      customerId: [], name: [], accountNumber: [], phone: [], email: []
    });
    this.customerForm.enable();
  }


}