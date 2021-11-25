import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmiModel } from '../models/EmiModel';
import { LoanServiceService } from '../Services/loan-service.service';

@Component({
  selector: 'app-emi-payments',
  templateUrl: './emi-payments.component.html',
  styleUrls: ['./emi-payments.component.css']
})
export class EmiPaymentsComponent implements OnInit {
  payments:EmiModel[]|any;
  loanId:string|any;
  spin : boolean|any;
  constructor(private activatedRoute: ActivatedRoute,private loanServiceService: LoanServiceService ) { }

  ngOnInit(): void {
    this.spin=true;
    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.loanId=params['loanId'];
      this.loanServiceService.getPaymentSchedule(this.loanId).subscribe((data:any)=>
      {
        this.spin=false;
        this.payments=data;
      })
    });
  }

  getClass(paymentStatus:string){
    var classList='';
    if(paymentStatus=='Extimating'){
       classList = 'badge badge-primary'; 
    }else if (paymentStatus=='PaymentWaiting'){
        classList = 'badge badge-warning';
    }else if(paymentStatus=='Paid'){
        classList = 'badge badge-success';
    }
    return classList;
  }

  changePaymentStatus(event : any,paymentId:any){
    this.loanServiceService.updatePaymentStatus(paymentId).subscribe(()=>{
      this.ngOnInit();
    });
  }


}
