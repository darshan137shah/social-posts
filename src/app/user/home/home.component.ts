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
        this.posts = posts;
        console.log(this.posts)
      });

      this._postService.$newPost.subscribe((data) => {
        this.posts.push(data);
      })
  }

  toggleLikes(likes, id, index) {
    if(!likes.length) {
      this._postService.toggleLikes({_id: id, likes: [this.cUser.username]}).subscribe((value) => {
        if(value['dataUpdated']) {
          this.posts[index]['likes'] = [this.cUser.username];
        }
      });
    } else {
      this._postService.toggleLikes({_id: id, likes: []}).subscribe((value )=> {
        if(value['dataUpdated']) {
          this.posts[index]['likes'] = [];
        }
      });
    }

  }

  toggleComments(i) {
    this.posts[i]['commentToggle'] = !this.posts[i]['commentToggle'];
  }

  goBack() {
    this._router.navigate([this.cUser.username + '/home']);
  }

  deletePost(index, postid) {
    this._postService.deletePost(postid).subscribe(() => {
      this.posts.splice(index, 1);
    })
  }

}
