import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;
  passwordtype="password";

  constructor(  private router: Router,
    private alertService: AlertService,
    private authService:AuthenticationService,
    ) { }

  ngOnInit() {
    console.log("login and logout...");
   //document.getElementById('id01').style.display='block'";
   //document.getElementById('id01').style.display='block';
   this.alertService.clear();

    this.model.currentusername='';
    this.model.currentpassword='';
    localStorage.setItem('currentusername',null);
    localStorage.setItem('currentpassword',null);
    localStorage.setItem('usertype',null);

  }

  onClickSubmit(){
    this.alertService.clear();
    let message="Invalid User Name or Password";
   // console.log("user name : password"+this.model.currentusername+this.model.currentpassword);
    localStorage.setItem('currentusername',this.model.currentusername);
    localStorage.setItem('currentpassword',this.model.currentpassword);


    this.authService.isAuthentication(this.model.currentusername,this.model.currentpassword)
              .subscribe(
                  data => {
                      console.log('return value -->'+data);
                      this.model = data;
                      console.log("Status-->"+this.model.userstatus);
                      console.log("UserType-->"+this.model.usertype);
                      let temp = this.model.usertype;
                      if(this.model.usertype != null) {
                        localStorage.setItem('usertype',temp);
                        console.log('User found'); 
                       // if(this.model.usertye == "maker/authorizer") {
                       //   this.router.navigate(['/landingpage']);
                       // } else {
                          this.router.navigate(['/landingpage']);
                      //  }

                      }else {
                        console.log('User not found'); 
                        this.alertService.error("Invalid User name or Invalid Password.");

                      }
                         
                    
                  },
                  error => {
                    this.alertService.error("Server Error.");

                  });



  }

  forgetPassword(){

  }

  showPassword(){
    if (this.passwordtype=="text"){
      this.passwordtype="password";

    }
    if (this.passwordtype=="password"){
      this.passwordtype="text";

    }
   // var x = document.getElementById("myInput");
  //if (x.type === "password") {
  //  x.type = "text";
  //} else {
  //  x.type = "password";
  //}
  }
}
