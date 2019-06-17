import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  uname:string;
  email:string;
  add:string;
  pass:string;
  cpass:string

  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  onunameKeyUp(event: any) {
    this.uname = event.target.value;
  }
  onemailKeyUp(event: any) {
    this.email = event.target.value;
  }
  onaddKeyUp(event: any) {
    this.add = event.target.value;
  }
  onpassKeyUp(event: any) {
    this.pass = event.target.value;
  }
  oncpassKeyUp(event: any) {
    this.cpass = event.target.value;
  }

  validate() {

    if (this.uname && this.email && this.pass && this.cpass && this.add){
        if (this.pass != this.cpass) {
            alert("password mismatch");
            return;
        }
        else {
          const body = JSON.stringify({uname:this.uname,
            email:this.email,
            add:this.add,
            pass:this.pass});

          console.log(body);

          this.httpClient.post(`http://localhost:3000/users`,body,{responseType:'text'})
          .subscribe(
            (data: any) => {
              alert("sign up successfully..");
              this.router.navigateByUrl("/login");
            })
            }
        }
    }        
}

