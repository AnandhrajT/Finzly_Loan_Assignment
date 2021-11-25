import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { LoanServiceService } from 'src/app/Services/loan-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  retUrl: string | any = "home";
  loggedIn: boolean | any;
  loading: boolean | any;
  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private loanService: LoanServiceService, private authService: AuthServiceService) { }
  ngOnInit() {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl');
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
  }
  async loginUser(loginForm: any) {
    this.loggedIn = await this.authService.authenticate(loginForm.value.username, loginForm.value.password);
    if (this.loggedIn) {
      console.log('return to ' + this.retUrl);
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
      } else {
        this.toastr.success('Login Successfull');
        this.router.navigate(['Applyloan']);
      }
    }
    else {
      this.toastr.info('Invalid User');
      this.loading = false;
      

    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}