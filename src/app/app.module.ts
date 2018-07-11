import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './gateway/login/login.component';
import { RegisterComponent } from './gateway/register/register.component';
import { NavComponent } from './gateway/nav/nav.component';
import { HomeComponent } from './user/home/home.component';
import { AuthService } from './gateway/auth.service';
import { InterceptReqService } from './intercept-req.service';
import { CreateComponent } from './user/posts/create/create.component'
import { PostService } from './user/posts/post.service';
import { CommentsComponent } from './user/home/comments/comments.component';
import { AuthGuard } from './gateway/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    CreateComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: RegisterComponent},
      {path: ':user/home', component: HomeComponent, canActivate: [ AuthGuard ], children: [
          {path: 'create', component: CreateComponent, canActivate: [ AuthGuard]}
        ]},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: '**', redirectTo: 'login'}
    ])
  ],
  providers: [ AuthService, CookieService, {
    useClass: InterceptReqService,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }, PostService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
