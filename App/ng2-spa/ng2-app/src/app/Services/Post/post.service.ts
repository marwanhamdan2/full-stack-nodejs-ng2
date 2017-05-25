import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts');    
  }

}


