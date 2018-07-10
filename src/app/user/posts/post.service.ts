import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  $newPost: Subject<any> = new Subject<any>();
  $newPostFlag: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) { }

  createnew(post) {
    this._http.post('http://localhost:3000/newPost', post).subscribe((data) => {
      this.$newPost.next(data['data']);
      this.$newPostFlag.next(true);
    });;
  }

  getPosts() {
    return this._http.get('http://localhost:3000/getPosts');
  }

  deletePost(id) {
    return this._http.post('http://localhost:3000/deletePost', {_id: id});
  }

  toggleLikes(id) {
    return this._http.post('http://localhost:3000/toggleLikes', id);
  }

  addComment(data) {
    return this._http.post('http://localhost:3000/addComment', data);
  }
}
