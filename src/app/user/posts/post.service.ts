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

  toggleLikes(id) {
    this._http.post('http://localhost:3000/toggleLikes', id).subscribe(value => {
      if(value) {
        return true;
      }
    });
  }

  addComment(data) {
    return this._http.post('http://localhost:3000/addComment', data);
  }
}
