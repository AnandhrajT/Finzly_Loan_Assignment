import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmiModel } from 'src/app/models/EmiModel';
import { LoanServiceService } from 'src/app/Services/loan-service.service';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {

  payments: EmiModel[] = [];
  loanId:string|any;
  spin : boolean |any;
  constructor(private loanServiceService: LoanServiceService,private router: Router,private activatedRoute: ActivatedRoute) 
  {}

  ngOnInit(): void {
    this.spin=true;
    this.activatedRoute
    .queryParams
    .subscribe((params: { [x: string]: any; }) => {
      this.loanId=params['loanId'];
      this.loanServiceService.getPaymentSchedule(this.loanId).subscribe((data:any)=>
      {
        this.spin=false;
        this.payments=data;
      })
    });
  }
  getStatus(paymentStatus:string){
    var status='';
    if(paymentStatus=='Extimated'){
      status = 'badge badge-primary'; 
    }else if (paymentStatus=='Waiting'){
      status = 'badge badge-warning'; 
    }else if(paymentStatus=='Paid Success'){
      status = 'badge badge-success';
    }
    return status;
  }

  changePaymentStatus(event : any,paymentId:any){
    this.loanServiceService.updatePaymentStatus(paymentId).subscribe(()=>{
      this.ngOnInit();
    });
  }
 

}