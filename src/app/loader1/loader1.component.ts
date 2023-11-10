import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader1',
  templateUrl: './loader1.component.html',
  styleUrls: ['./loader1.component.css']
})
export class Loader1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/payments'])

    }, 2000)
  }

}
