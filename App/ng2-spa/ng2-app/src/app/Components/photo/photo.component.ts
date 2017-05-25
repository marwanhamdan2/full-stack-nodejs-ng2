import { Component, OnInit } from '@angular/core';
import {PhotoService} from '../../Services/Photo/photo.service';
import {Response} from  '@angular/http';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  providers: [PhotoService]
})
export class PhotoComponent implements OnInit {

  private photos = [];
  private currentPage: number;
  private pageSize: number;
  currentPhotos = [];

  constructor(private PhotoService: PhotoService) {
  }

  ngOnInit() {
    this.currentPage =1;
    this.pageSize = 10;

    this.PhotoService.fetchImages()
    .subscribe((data : Response)=>{
      this.photos = data.json();
      this.setCurrentPhotots();
    })
  }

  private setCurrentPhotots(){
    var startIndex = (this.currentPage-1) * this.pageSize;
    var endIndex = (this.currentPage) * this.pageSize;
    this.currentPhotos = this.photos.slice(startIndex, endIndex);
    console.log(this.currentPhotos);
  }


}
