import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../gateway/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ AuthService ]
})
export class HomeComponent implements OnInit {

  cUser: any;
  userTitle: String = '';

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
      this._authService.userData().subscribe((data) => {
        this.cUser = data[0];
        this.userTitle = data[0].firstname;
      })

  }

}
