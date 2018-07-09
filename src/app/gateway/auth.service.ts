import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $userAlert: Subject<any> = new Subject<any>();

  constructor(private _http : HttpClient, private _router: Router) { }

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
        this.$userAlert.next(true);
        this._router.navigate(['/' + resp.username + '/home']);
      } else {
        this.$userAlert.next(false);
      }
    });
  }

}
