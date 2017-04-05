import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
  title: string;
  names: string[];
  newName: string;
  editNameVal: string;
  editNameIndex: number;

  constructor() {
    this.title = "goo";
    this.names= [
      "max", "john", "sam"
    ];  
    this.editNameIndex = -1;
   }

  ngOnInit() {
  }


  delName(index){
    this.names.splice(index, 1);
  }

  addName(name){
    this.names.push(this.newName);
    this.newName= "";
  }

  editName(){
    this.names[this.editNameIndex] = this.editNameVal;
    this.editNameIndex = -1;
  }

  setEditNameIndex(index){
    this.editNameIndex = index;
  }

  resetEdit(){
    this.editNameIndex = -1;
    this.editNameVal= "";
  }

}
