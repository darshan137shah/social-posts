import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeUser: boolean = false;
  currentUser: string;
  timeInt = interval(1000);
  date: string;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.$userAlert.subscribe((data) => {
      this.activeUser = data;
      this.currentUser = sessionStorage.getItem('currentUser');
    });

    this.timeInt.subscribe((n) => {
      let cdate = new Date();
      this.date = cdate.getHours() + ' : ' + cdate.getMinutes() + ' : ' + cdate.getSeconds();
    });
  }

  logOut() {
    console.log('nav call')
    this._authService.logout();
  }

  newpost() {
    this._router.navigate([this.currentUser + '/home/create'])
  }
  allpost() {
    this._router.navigate([this.currentUser + '/home'])
  }

}
