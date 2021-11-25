import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username = "";
  password ="";
  invalidLogin: boolean|any;

  constructor(private toastr: ToastrService, private router: Router,
   private authService: AuthServiceService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 handleLogin(){
 if(this.authService.authenticateForAdmin(this.username, this.password)){
  this.toastr.success('Welcome Admin');
    this.router.navigate(['paymentSchedule'])
    this.invalidLogin=false;
  }
  else{
    this.toastr.info('Invalid Admin');
  }
}
}
