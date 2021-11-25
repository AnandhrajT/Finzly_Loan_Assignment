import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLoanComponent } from './component/apply-loan/apply-loan.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { TotalLoansComponent } from './component/total-loans/total-loans.component';
import { LogoutComponent } from './component/logout/logout.component';
import { RouteGuardService } from './Services/route-guard.service';
import { PaymentScheduleComponent } from './component/payment-schedule/payment-schedule.component';
import { AdminComponent } from './component/admin/admin.component';

// canActivate:[RouteGuardService]
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'Home', component: HomeComponent,canActivate:[RouteGuardService]},
  {path: 'Applyloan', component: ApplyLoanComponent,canActivate:[RouteGuardService]},
  {path: 'totalloans', component: TotalLoansComponent,canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent,canActivate:[RouteGuardService]},
  {path:'paymentSchedule', component: PaymentScheduleComponent,canActivate:[RouteGuardService]},
  {path:'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
