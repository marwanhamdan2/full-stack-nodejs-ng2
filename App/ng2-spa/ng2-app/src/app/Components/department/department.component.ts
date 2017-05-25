import { Component, OnInit } from '@angular/core';
import {Department} from '../../Interfaces/Department';
import {DepartmentService} from '../../Services/Department/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {

  routerPathDepartmentId : number;

  columns: string[];
  rows: Department[];
  private activeRowIndex: number;
  newDeptName: string;
  private editRowIndex: number;
  private editRowValue : any;

  constructor(private DepartmentService: DepartmentService, private route: ActivatedRoute) {
    this.columns = [
      'Id', 'Name'
    ];

    this.rows = [];

    route.params.subscribe(params => {
      this.routerPathDepartmentId = params['id'];
    });
  }

  ngOnInit() {
    this.fetchDepartments();    
  }

  private fetchDepartments(){
    this.DepartmentService.fetchDepartments()
    .subscribe((data: Department[]) =>{
      this.rows = data;
    }, error=>{
      console.log(error);
    });
  }

  private deleteRow(index){
    var id = this.rows[index].id;
    this.DepartmentService.deleteDepartment(id)
    .subscribe(data=>{
        this.rows = this.rows.filter((item: Department)=>{
          return item.id != id;
        });
    }, error=>{
      console.log(error);
    });
  }

  setActiveRowIndex(index){
    this.activeRowIndex = index;
  }

  getActiveRowIndex(){
    return this.activeRowIndex;
  }

  getActiveRowId(){
    return this.activeRowIndex < this.rows.length  ? this.rows[this.activeRowIndex].id : null;
  }


  addNewDepartment(){
    var newDeptName = this.newDeptName;
    this.newDeptName = "";
    if(newDeptName != ""){
      this.DepartmentService.createDepartment(newDeptName)
      .subscribe(newId=>{
        if(newId){
          this.rows.push({
            id: newId,
            name: newDeptName
          })
        }
      }, error=>{
        console.log(error)
      })
    }
  }

  setEditRow(index){
    this.editRowIndex = index;
    this.editRowValue = {
      id: this.rows[index].id,
      name: this.rows[index].name
    }; 
  }

  saveRowEdit(){
    //new row values
    var rowValue = this.editRowValue;
    //old row id
    var rowId = this.rows[this.editRowIndex].id;
    //row index
    var editRowIndex = this.editRowIndex;

    //set the old id into the new row values to determine which row to edit in backend-sql
    rowValue.rowId = rowId;
    this.resetEditRow();
    if(rowValue.id){
      this.DepartmentService.updateDepartment(rowValue)
      .subscribe(success=>{
        this.rows[editRowIndex] = {
          id: rowValue.id,
          name: rowValue.name
        };
      }, error=>{
        console.log(`error in updating`);
      })
    }
  }

  private resetEditRow(){
    this.editRowIndex = null;
    this.editRowValue = {
      id: null,
      name: null
    }
  }

}
