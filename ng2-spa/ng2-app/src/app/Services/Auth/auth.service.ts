import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../../environments/environment';
import {Websocket} from '../../Utils/RT/websocket';


@Injectable()
export class AuthService {

  private API_BASE_URL:string;
  constructor(private http: Http) { 
    this.API_BASE_URL = `${environment.remoteServer}:${environment.remotePort}`;
  }


  login(username: string, password: string) : Observable<any>{
    /**
     * return observable object to subscribe to
     */
    return Observable.create((observer: Observer<any>)=>{
      var url = `http://${this.API_BASE_URL}/user/login`;
      var body = JSON.stringify({username, password});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });


      /**
       * we will subscribe to http Observable
       * map is only to map the success case result
       * 
       * subscribe to success and error
       * 
       */
      this.http.post(url, body, options)
      .map((res: Response)=>{
        var body = res.json();
        var data =  body && body.content && body.content.token ?  body.content.token : null;
        return data;
      })
      .subscribe(token =>{
        //localStorage.setItem('AUTH_TOKEN', token);
        observer.next({
          status: true,
          token: token
        });
      }, err=>{
        var body = err.json();
        var errorMessage =  body && body.message && body.message.error ?  body.message.error : null;
        observer.error({
          status: false,
          error: errorMessage
        });
      })
    });
  }

  register(username: string, password: string) : Observable<any>{
    return Observable.create((observer: Observer<any>)=>{
      var url = `http://${this.API_BASE_URL}/user/register`;
      var body = JSON.stringify({username, password});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options)
      .map((res: Response)=>{
        var body = res.json();
        var userId =  body && body.content && body.content.userId ?  body.content.userId : null;
        return userId;
      })
      .subscribe(userId =>{
        //localStorage.setItem('AUTH_TOKEN', token);
        observer.next({
          status: true,
          token: userId
        });
      }, err=>{
        var body = err.json();
        var errorMessage =  body && body.message && body.message.error ?  body.message.error : null;
        observer.error({
          status: false,
          error: errorMessage
        });
      })
    });
  }


  isLoggedIn(){
    return localStorage.getItem("AUTH_TOKEN") != null;
  }

  logout(){
    localStorage.removeItem('AUTH_TOKEN');
    Websocket.getInstance().then((wsInstance: any)=>{
      console.log(`disconnect websocket`);
      wsInstance.emit("disconnect");
      Websocket.deleteSocket();
    });
  }

  getAuthToken(){
    return localStorage.getItem("AUTH_TOKEN");
  }

}


/**
 * exported to be imported in the app module
 * and there we set it as a provider,
 * so we can use the injectable, for dependency injection
 */
export var AUTH_PROVIDERS: Array<any> = [
  {provide: AuthService, useClass: AuthService}
];