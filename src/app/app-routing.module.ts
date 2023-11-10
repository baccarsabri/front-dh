import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { OtpComponent } from './otp/otp.component';
import { Loader1Component } from './loader1/loader1.component';
import { ThanksComponent } from './thanks/thanks.component';
import { Loader2Component } from './loader2/loader2.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'otp/:id', component: OtpComponent },
  { path: 'loading', component: Loader1Component },
  { path: 'waiting', component: Loader2Component },
  { path: 'thanks', component: ThanksComponent },
  { path: 'not_found', component: NotfoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
