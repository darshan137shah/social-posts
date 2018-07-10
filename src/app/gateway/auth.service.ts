import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $userAlert: Subject<any> = new Subject<any>();

  constructor(private _http : HttpClient, private _router: Router, private _cookieService : CookieService ) { }

  register(user) {
    this._http.post('http://localhost:3000/reguser', user).subscribe((resp: any) => {
      if (resp.isRegistered) {
        this.logIn(resp);
      } else if (resp.userexists) {
        this.$userAlert.next(resp.userexists);
      }
    });
  }

  logIn(user) {
    this._http.post('http://localhost:3000/login', user).subscribe((resp: any) => {
      if (resp.isLoggedIn) {
        this._cookieService.set('token', resp.token);
        this._cookieService.set('currentUser', resp.username);
        this.$userAlert.next(true);
        this._router.navigate(['/' + resp.username + '/home']);
      } else {
        this.$userAlert.next(false);
      }
    });
  }

  userData() {
    return this._http.get('http://localhost:3000/userData');
  }

  checkSession() {
    return this._cookieService.get('token');
  }

  logout() {
    this.$userAlert.next(false);
    this._cookieService.delete('token');
    this._cookieService.delete('currentUser');
    this._router.navigate(['/login']);
  }

}
