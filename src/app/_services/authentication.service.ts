import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Common } from '../_models/index';
import { HttpRequest, HttpEvent} from '@angular/common/http';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { ServerURL } from './url';
//import { Router } from '@angular/router';
import { environment } from "src/environments/environment";


@Injectable()
export class AuthenticationService  implements OnInit{

  constructor(
    private http: HttpClient,
     private router: Router,
     //private globalsURL: ServerURL

  ) {

 }

 //@Injectable()
 //url:ServerURL;

 

//private baseUrl = this.globalsURL.serverURL;

  testResponse: User;
  suburl:string;
  baseurl:string;
  url:string;
  
  ngOnInit(): void {
    }

    
    resetPassword(pwd: string , uname: string) 
    {
    //  console.log("URL ------------>"+this.url.ServerURL)
    //  return this.http.get<User>(this.baseUrl+"resetPassword?newPassword="+pwd+"&userName="+uname);
    }

    checkUserName(uname: string)
    {
     // return this.http.get<User>(this.baseUrl+"Checkuser?username="+uname);
    }

    OTPCheck(otp: string)
    {
     // return this.http.get<User>(this.baseUrl+"OTPCheck?otp="+otp);
    }

     login(username: string, pwd: string) {
           this.suburl= '?username='+username+'&password='+pwd;
          // this.baseurl=this.userUrl+"user";
        //   this.baseurl=this.baseUrl+"user";           
           this.url=this.baseurl+this.suburl;           
           return this.http.get<User>(this.url);
    }

    // get only one data
  isAuthentication(username: string, pwd: string){
  return this.http.get(`${environment.apiUrl}${"usermgnt/isAuthentication"+'?username='+username+'&password='+pwd}`);

}

    logout() {
        localStorage.removeItem('currentusername');
        this.router.navigate(['/login']);
    }

   



  
  }
  