import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _AuthService: AuthService, private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._AuthService.checkSession()) {
      this._AuthService.$userAlert.next(true);
      return true;
    } else {
      this._AuthService.$userAlert.next(false);
      this._router.navigate(['/login']);
      return false;
    }
  }
}
