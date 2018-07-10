import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../gateway/auth.service';
import {Router, RouterModule} from '@angular/router';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ AuthService ]
})
export class HomeComponent implements OnInit {

  cUser: any;
  userTitle: String = '';
  posts: any = [];

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _router: Router, private _postService : PostService ) { }

  ngOnInit() {
      this._authService.userData().subscribe((data) => {
        this.cUser = data[0];
        this.userTitle = data[0].firstname;
      });

      this._postService.getPosts().subscribe((posts) => {
        console.log('Its giving me the posts');
        console.log(posts)
        this.posts = posts;
      });

  }

  find(id) {
    this._postService.findPost({_id: id});
  }

  goBack() {
    this._router.navigate([this.cUser.username + '/home']);
  }
}
