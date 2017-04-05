import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PhotoService {
  private url: string;

  constructor(private http: Http) {
    this.url = `https://jsonplaceholder.typicode.com/photos`;
  }

  fetchImages(): Observable<any>{
    return this.http.get(this.url);
  }

}
