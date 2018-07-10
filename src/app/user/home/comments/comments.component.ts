import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId : number;
  @Input() comments: any = [];
  newcomment: String;

  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

  addComment(event) {
    if(event.which === 13 && this.newcomment.length > 0) {
      this._postService.addComment({_id: this.postId, comment: this.newcomment}).subscribe(value => {
        if(value.commAdded) {
          this.comments.push(this.newcomment);
          this.newcomment = '';
        }
      });;
    }
  }

}
