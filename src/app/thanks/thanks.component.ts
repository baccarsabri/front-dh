import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  constructor(private router: Router) {
    if (!sessionStorage.getItem('homeinfo')) {
      this.router.navigate(['/home'], { queryParams: { pwd: 'safe' } })
    } else {
      if (!sessionStorage.getItem('payment')) {
        this.router.navigate(['/payments'])
      } else {
        if (!sessionStorage.getItem('otp')) {
          this.router.navigate(['/otp', 'false'])
        }
      }
    }
  }

  ngOnInit(): void {
  }

}
