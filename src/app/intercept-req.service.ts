import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import {AuthService} from './gateway/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptReqService implements HttpInterceptor{

  constructor( private _authService: AuthService ) { }

  intercept(req, next) {
    var addHead = req.clone({
      headers: new HttpHeaders().set('token', this._authService.checkSession())
    });
    return next.handle(addHead);
  }
}
