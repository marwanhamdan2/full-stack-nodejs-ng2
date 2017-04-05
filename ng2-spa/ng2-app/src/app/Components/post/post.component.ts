import { Component, OnInit } from '@angular/core';
import {PostService}  from '../../Services/Post/post.service';
import {Response} from  '@angular/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  /**
   * Define interface type
   */
  posts;


  /**
   * constructor: init of vars
   * Dependency injection of services (providers`)
   */
  constructor(private postService: PostService) { 
    this.posts = [];
  }

  ngOnInit() {
  }

  getPosts(){
    this.postService.getPosts().subscribe((res: Response)=>{
      this.posts = res.json(); 
    });
  }

}
