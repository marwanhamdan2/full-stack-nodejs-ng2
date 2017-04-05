import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/Auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMsg: string;

  constructor(private AuthService: AuthService) {
    this.username = null;
    this.password = null
  }

  ngOnInit() {
  }

  login(username: string, password: string){
    console.log(username, password)
    this.AuthService.login(username, password /* this.username, this.password */)
    .subscribe(res=>{
      if(res.status){
        localStorage.setItem('AUTH_TOKEN', res.token);
      }
    }, err=>{
      this.errorMsg = err;
    })
  }

}
