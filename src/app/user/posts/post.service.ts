import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  createnew(post) {
    return this._http.post('http://localhost:3000/newPost', post);
  }

  getPosts() {
    return this._http.get('http://localhost:3000/getPosts');
  }

  findPost(id) {
    this._http.post('http://localhost:3000/findPost', id).subscribe(value => {
      console.log(value);
    });
  }

  addComment(data) {
    return this._http.post('http://localhost:3000/addComment', data);
  }
}
