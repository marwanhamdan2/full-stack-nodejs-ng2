import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Employee} from '../../Interfaces/Employee';
import {} from '../../../environments'

import {environment} from '../../../environments/environment';


@Injectable()
export class EmployeeService {

  API_KEY: string;
  API_BASE_URL: string;

  constructor(private http: Http) {
    this.API_KEY = `QcG6kP3yDnUHD67hWAAQyqrDdFm4gBPW`;  
    this.API_BASE_URL = `${environment.remoteServer}:${environment.remotePort}`;
  }

  fetchDepartmentEmployees(deptId: number) : Observable<Employee[]>{
    var route = `http://${this.API_BASE_URL}/employee/${deptId}`;
    return this.http.get(route)
      .map((res: Response) =>{
        var body = res.json();
        return <Employee[]>(body.content || []);
      })
      .catch(this.handleError);
  }

  createEmployee(employee) : Observable<number>{
    var route = `http://${this.API_BASE_URL}/employee?_t=${this.API_KEY}`;
    return this.http.post(route, employee)
    .map((res: Response)=>{
      var body = res.json();
      return body && body.content && body.content.newId ? body.content.newId  : null;
    })
    .catch(this.handleError);
  }

  deleteEmployee(empId){
    var route = `http://${this.API_BASE_URL}/employee/${empId}`;
    return this.http.delete(route)
    .catch(this.handleError);
  }

  editEmployee(rowValue){
    var route = `http://${this.API_BASE_URL}/employee`;
    return this.http.put(route, rowValue)
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
