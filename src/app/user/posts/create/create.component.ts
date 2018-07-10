import { Component, OnInit , Input} from '@angular/core';
import { PostService } from '../post.service';

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
  }

  createNew() {
    this._postService.createnew(this.post).subscribe((data) => {
      this.posted = data['isPosted'];
    });
  }

  loadmore() {
    this.post = {};
    this.posted = !this.posted;
  }

}
