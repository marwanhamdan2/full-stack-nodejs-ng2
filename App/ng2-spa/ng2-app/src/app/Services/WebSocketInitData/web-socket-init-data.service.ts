import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../../environments/environment';

@Injectable()
export class WebSocketInitDataService {

  API_KEY: string;
  constructor(private http: Http) {
    this.API_KEY = `QcG6kP3yDnUHD67hWAAQyqrDdFm4gBPW`;  
  }


  getWatchFileData(){
    var route = `http://${environment.remoteServer}:${environment.remotePort}/web-socket-init/watch-file-data`;
    return this.http.get(route)
      .map((res: Response) =>{
        var fileData = res.text();
        return fileData;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg); 
  }
}
