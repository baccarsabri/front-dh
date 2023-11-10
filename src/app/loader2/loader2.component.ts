import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader2',
  templateUrl: './loader2.component.html',
  styleUrls: ['./loader2.component.css']
})
export class Loader2Component implements OnInit {

  constructor(private router: Router) {
    if (!sessionStorage.getItem('homeinfo')) {
      this.router.navigate(['/home'], { queryParams: { pwd: 'safe' } })
    } else {
      if (!sessionStorage.getItem('payment')) {
        this.router.navigate(['/payments'])

      }
    }
  }

  ngOnInit(): void {
  }

}
