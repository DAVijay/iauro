import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:string;
  pass:string;

  onunameKeyUp(event: any) {
    this.uname = event.target.value;
  }
  onpassKeyUp(event: any) {
    this.pass = event.target.value;
  }

  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
  }
	
validate2(){}
}
