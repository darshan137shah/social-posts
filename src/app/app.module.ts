import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './gateway/login/login.component';
import { RegisterComponent } from './gateway/register/register.component';
import { NavComponent } from './gateway/nav/nav.component';
import { HomeComponent } from './user/home/home.component';
import { AuthService } from './gateway/auth.service';
import { InterceptReqService } from './intercept-req.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: RegisterComponent},
      {path: ':user/home', component: HomeComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [ AuthService, CookieService, {
    useClass: InterceptReqService,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
