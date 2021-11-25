import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanModel } from 'src/app/models/LoanModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { LoanServiceService } from 'src/app/Services/loan-service.service';

@Component({
  selector: 'app-total-loans',
  templateUrl: './total-loans.component.html',
  styleUrls: ['./total-loans.component.css']
})
export class TotalLoansComponent implements OnInit {

  loans: LoanModel[] = [];
  customerId: string|any;
  spin : boolean|any;

  constructor(private router: Router ,
    private loanServiceService:LoanServiceService,
    private authService:AuthServiceService) {
   }

  ngOnInit(): void {
    this.customerId=this.authService.getCustomerId();
    this.spin=true;
    this.loanServiceService.getLoanList(this.customerId).subscribe((data:any) =>{
      this.spin=false;
      this.loans =data;
    });
  }
  navigatePaymentSchedule(loanId: string){
    this.router.navigate([`./payment-schedule`],{ queryParams: { loanId: loanId } });
    console.log(loanId);
  }

  
}