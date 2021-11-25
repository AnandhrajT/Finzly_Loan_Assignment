import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanModel } from 'src/app/models/LoanModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { LoanServiceService } from 'src/app/Services/loan-service.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {

  @ViewChild('alert', { static: true })
  alert!: ElementRef;
  loanForm: FormGroup | any;
  customerId:string | undefined;
  loan: LoanModel=new LoanModel();
  submitted = false;
  today = new Date();
  range: number | any;
  date: Date | any;
  payments: number = 0;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService, 
    private loanService: LoanServiceService, 
    private router: Router,
    private authService: AuthServiceService) { }
  ngOnInit() {
    this.customerId = this.authService.getCustomerId();
    this.loanForm = this.formBuilder.group({
      customerId: [{ value: this.customerId, disabled: true }],
      loanAmount: ['', [Validators.required, Validators.max(10000000), Validators.min(10000)]],
      loanDate: ['', Validators.required],
      startDate: ['', Validators.required],
      loanDuration: ['', Validators.required],
      endDate: [{ value: new Date(), disabled: true }],
      rateOfInterest: [{ value: 10, disabled: true }],
      paymentInterval: ['', [Validators.required]],
      payments: [{ value: 0, disabled: true }],
      paymentTerm: ['', [Validators.required]],
      interestExtimate: [{ value: 0, disabled: true }],
    });
  }

  get function() { return this.loanForm.controls; }


  setEndDate(event: any) {
    var range = (event.target.value) * 12;
    var startDate = this.loanForm.get('startDate').value;
    var date = new Date(startDate);
    if (range != 0) {
      this.loanForm.patchValue({
        endDate: new Date(date.setMonth(date.getMonth() + range)).toISOString().substring(0, 10)
      });
    }

  }

  calculateEmiPayments(event: any) {
    console.log(event.target.value)

    var totalMonths = parseInt(this.loanForm.get('loanDuration').value) * 12;
    
    console.log(totalMonths)
      if (event.target.value == "Monthly") {
        this.payments = totalMonths;
      } else if (event.target.value == "Half Year") {
        this.payments = totalMonths / 6;
      } else if (event.target.value == "One Year") {
        this.payments = totalMonths / 12;
      }
      this.loanForm.patchValue({
        payments: this.payments
      });
      console.log(this.payments)
    
  }

  calculateInterestExtimate(event: any) {

    
    
    var principal = this.loanForm.get('loanAmount').value;
    var totalYears = this.loanForm.get('loanDuration').value;
    var rateOfInterest = this.loanForm.get('rateOfInterest').value;
    var payments = this.loanForm.get('payments').value;

   
      var interestAmount: number | any = 0;
      var perPaymentPrincipal = (principal / payments);
      for (var i = 1; i <= payments; i++) {
        interestAmount = interestAmount + (principal * (totalYears / payments) * rateOfInterest) / 100;
        principal = principal - perPaymentPrincipal;
      }
    
    console.log(interestAmount)

    this.loanForm.patchValue({
      interestExtimate: interestAmount
    });

  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
     // event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loan.customerId = this.loanForm.get('customerId').value;
    this.loan.loanAmount = this.loanForm.get('loanAmount').value;
    this.loan.loanDate = this.formatDate(this.loanForm.get('loanDate').value);
    this.loan.startDate = this.formatDate(this.loanForm.get('startDate').value);
    this.loan.endDate = this.formatDate(this.loanForm.get('endDate').value);
    this.loan.loanDuration = this.loanForm.get('loanDuration').value;
    this.loan.paymentInterval = this.loanForm.get('paymentInterval').value;
    this.loan.payments = this.loanForm.get('payments').value;
    this.loan.rateOfInterest = this.loanForm.get('rateOfInterest').value;
    this.loan.paymentTerm = this.loanForm.get('paymentTerm').value;
    this.loan.interestExtimate = this.loanForm.get('interestExtimate').value;
    this.loanService.saveLoan(this.loan).subscribe(data => {
      console.log('Save Loan:' + data);
      this.toastr.info('Applied successfully');
      this.router.navigate(['totalloans']);
    });
    console.log("hiii");
    this.alert.nativeElement.classList.add('show');   
    if (this.loanForm.invalid) {
      return;
    }
      this.loan.customerId = this.loanForm.get('customerId').value;
      this.loan.loanAmount = this.loanForm.get('loanAmount').value;
      this.loan.loanDate = this.formatDate(this.loanForm.get('tradeDate').value);
      this.loan.startDate = this.formatDate(this.loanForm.get('startDate').value);
      this.loan.loanDuration = this.loanForm.get('loanDuration').value;
      this.loan.endDate = this.formatDate(this.loanForm.get('endDate').value);
      this.loan.rateOfInterest = this.loanForm.get('rateOfInterest').value;
      this.loan.paymentInterval = this.loanForm.get('paymentInterval').value;
      this.loan.payments = this.loanForm.get('payments').value;
      this.loan.paymentTerm = this.loanForm.get('paymentTerm').value;
      this.loan.interestExtimate = this.loanForm.get('interestExtimate').value;
      this.alert.nativeElement.classList.add('show');
   
  }
  formatDate(input: string) {
    var datePart = input.match(/\d+/g),
      year = datePart![0],
      month = datePart![1],
      day = datePart![2];

    return day + '-' + month + '-' + year;
  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

}

