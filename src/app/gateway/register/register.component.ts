import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  userexists: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.$userAlert.subscribe((data) => {
      this.userexists = data;
    })
  }

  register() {
    this._authService.register(this.user);
  }

}
