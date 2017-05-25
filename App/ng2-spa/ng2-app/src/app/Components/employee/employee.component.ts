import { Component, OnInit, OnChanges } from '@angular/core';
import {EmployeeService} from '../../Services/Employee/employee.service'
import {Employee} from '../../Interfaces/Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
  inputs: ['deptId']
})
export class EmployeeComponent implements OnInit, OnChanges {

  deptId : number;
  employees: Employee[];
  columns: String[];
  editEmployeeRowIndex: number;
  editEmployeeRowValue: any;

  newEmployee: any;
  constructor(private EmployeeService: EmployeeService) {
    this.columns = [
      'Id', 'Name', 'Gender'
    ];

    this.newEmployee = {
      name: null,
      gender: null
    };

    this.resetEdit();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any){
    var deptId = changes.deptId.currentValue;
    this.EmployeeService.fetchDepartmentEmployees(deptId)
    .subscribe((employees)=>{
      this.employees = employees;
      console.log(this.employees);
    }, (err)=>{
      console.log(err);
    });
  }

  addNewEmployee(){
    if(this.newEmployee.name && this.newEmployee.gender){
      var newEmployee = {
        name: this.newEmployee.name,
        gender: this.newEmployee.gender,
        deptId: this.deptId
      };

      this.EmployeeService.createEmployee(newEmployee)
      .subscribe((empId)=>{
        if(empId){
          this.employees.push({
            id: empId,
            name: newEmployee.name,
            gender: newEmployee.gender,
            deptId: newEmployee.deptId
          });
        }
      }, (err)=>{
        console.log(err);
      })
    }
  }

  deleteEmployee(empId){
    this.EmployeeService.deleteEmployee(empId)
    .subscribe((succ)=>{
      this.employees = this.employees.filter((emp)=>{
        return emp.id !=empId;
      })
    }, (err)=>{
      console.log(err);
    });
  }

  setEmployeeEdit(index){
    this.editEmployeeRowIndex = index;
    this.editEmployeeRowValue = {
      id: index<this.employees.length ? this.employees[index].id : "",
      name: index<this.employees.length ? this.employees[index].name : "",
      gender: index<this.employees.length ? this.employees[index].gender : ""
    }
  }

  editEmployee(){
    if(this.editEmployeeRowIndex!=null && this.editEmployeeRowIndex < this.employees.length){
      var oldRowId = this.employees[this.editEmployeeRowIndex].id;
      var newRowValue = {
        rowId: oldRowId,
        id: this.editEmployeeRowValue.id,
        name: this.editEmployeeRowValue.name,
        gender: this.editEmployeeRowValue.gender
      }

      this.resetEdit();
      this.EmployeeService.editEmployee(newRowValue)
      .subscribe((succ)=>{
        this.employees.forEach(emp=>{
          if(emp.id == oldRowId){
            emp.id = newRowValue.id;
            emp.name = newRowValue.name;
            emp.gender = newRowValue.gender;
          }
        });

      }, (err)=>{
        console.log(err);
      })
    }
  }

  resetEdit(){
    this.editEmployeeRowIndex = -1;
    this.editEmployeeRowValue = {
      id: "",
      name: "",
      gender: ""
    }
  }


}
