import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  posted: boolean = false;
  post: any = {};

  constructor(private _postService : PostService) { }

  ngOnInit() {
    this._postService.$newPostFlag.subscribe((data) => {
      this.posted = data;
    })
  }

  createNew() {
    this._postService.createnew(this.post);
  }

  loadmore() {
    this.post = {};
    this.posted = !this.posted;
  }

}
