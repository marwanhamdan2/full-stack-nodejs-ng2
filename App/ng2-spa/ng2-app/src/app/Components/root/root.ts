import { Component } from '@angular/core';
import {AuthService} from '../../Services/Auth/auth.service';
import { RouterModule, Routes, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  providers: [AuthService]
})


export class RootComponent {
  
  /**
   * instead of isLogged() calling the service function
   * use observable | async to detect change in isLogged()
   * 
   * or use eventEmmier where anychange in is cahnge will emit, so we cahnge local var 
   * that is used in ngif
   */


  constructor(
    private AuthService: AuthService,
    private Router: Router
  ){

  }

  isLoggedIn(){
    return this.AuthService.isLoggedIn();
  }

  logout(){
    console.log(`Logging out`);
    this.AuthService.logout();
    this.Router.navigate(['/login']);
  }
}
