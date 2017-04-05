import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Department} from '../../Interfaces/Department';


@Injectable()
export class DepartmentService {

  /**
   * Use enviroroment setup
   */
  private API_BASE_URL:string;
  constructor(private http: Http) { 
    this.API_BASE_URL = `127.0.0.1:8020`;
  }

  fetchDepartments(/* page:number = 1 */ /* allow pagination*/) : Observable<Department[]>{
    var route = `http://${this.API_BASE_URL}/department`;
    return this.http.get(route)
                    .map(this.extractFetchData)
                    .catch(this.handleError);
  }

  deleteDepartment(deptId){
    var route = `http://${this.API_BASE_URL}/department/${deptId}`;
    console.log(route);
    return this.http.delete(route)
                    .catch(this.handleError);    
  }

  createDepartment(deptName){
    var route = `http://${this.API_BASE_URL}/department`;
    return this.http.post(route, {
      name: deptName
    })
    .map((res: Response) =>{
      var body = res.json();
      if(res && body.content && body.content.newId){
        return body.content.newId;
      }
      return null;
    })
    .catch(this.handleError);
  }

  updateDepartment(rowValue){
    var route = `http://${this.API_BASE_URL}/department`;
    return this.http.put(route, rowValue)
    .catch(this.handleError);
  }

  /**
   * We can instead parse each object in the array using another map
   * we either use casting to interface type <...> or parse object to an instance of a class
   *  --> where we use the object data to pass them to the class constructor to create the instance 
   */
  private extractFetchData(res: Response){
    let body = res.json();
    return <Department[]>(body.content || []);
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
