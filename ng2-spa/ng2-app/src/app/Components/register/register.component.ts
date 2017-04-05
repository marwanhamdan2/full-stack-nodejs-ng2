import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;

  constructor(private AuthService: AuthService) {
      this.username = "";
      this.password = "";
  }

  ngOnInit() {
  }

  register(){
    this.AuthService.register(this.username, this.password)
    .subscribe(res=>{
      console.log(res);
    }, err=>{
      console.log(err);
    })
  }

}
