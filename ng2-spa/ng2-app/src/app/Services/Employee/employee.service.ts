import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Employee} from '../../Interfaces/Employee';

@Injectable()
export class EmployeeService {

  API_KEY: string;
  constructor(private http: Http) {
    this.API_KEY = `QcG6kP3yDnUHD67hWAAQyqrDdFm4gBPW`;  
  }

  fetchDepartmentEmployees(deptId: number) : Observable<Employee[]>{
    var route = `http://127.0.0.1:8020/employee/${deptId}`;
    return this.http.get(route)
      .map((res: Response) =>{
        var body = res.json();
        return <Employee[]>(body.content || []);
      })
      .catch(this.handleError);
  }

  createEmployee(employee) : Observable<number>{
    var route = `http://127.0.0.1:8020/employee?_t=${this.API_KEY}`;
    return this.http.post(route, employee)
    .map((res: Response)=>{
      var body = res.json();
      return body && body.content && body.content.newId ? body.content.newId  : null;
    })
    .catch(this.handleError);
  }

  deleteEmployee(empId){
    var route = `http://127.0.0.1:8020/employee/${empId}`;
    return this.http.delete(route)
    .catch(this.handleError);
  }

  editEmployee(rowValue){
    var route = `http://127.0.0.1:8020/employee`;
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
