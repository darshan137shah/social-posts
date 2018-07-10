import { Component, OnInit} from '@angular/core';
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
  showComments: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _router: Router, private _postService : PostService) { }

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

  toggleLikes(likes, id, index) {
    // e.target.classList.toggle('like');

    if(!likes.length) {
      this.posts[index]['likes'] = [this.cUser.username];
      this._postService.toggleLikes({_id: id, likes: [this.cUser.username]});
    } else {
      this.posts[index]['likes'] = [];
      this._postService.toggleLikes({_id: id, likes: []});
    }

  }

  toggleComments(i) {
    this.posts[i]['commentToggle'] = !this.posts[i]['commentToggle'];
  }

  goBack() {
    this._router.navigate([this.cUser.username + '/home']);
  }
}
