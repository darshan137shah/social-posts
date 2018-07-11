import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  userexists: boolean = false;
  regForm: FormGroup;

  constructor(private _authService: AuthService, private _fb: FormBuilder) { }

  ngOnInit() {
    this._authService.$userAlert.subscribe((data) => {
      this.userexists = data;
    });

    this.regForm = this._fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  register() {
    this._authService.register(this.regForm.value);
  }

}
