import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  loginSuccess: boolean = true;

  constructor(private _authService: AuthService ) { }

  ngOnInit() {
    this._authService.logout();
    this._authService.$userAlert.subscribe((data) => {
      this.loginSuccess = data;
    })
  }

  signIn() {
    this._authService.logIn(this.user);
  }
}
