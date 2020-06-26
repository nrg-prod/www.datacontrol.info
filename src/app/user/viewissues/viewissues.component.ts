import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from "@angular/material";
import { Inject } from '@angular/core';
import { Issue } from 'src/app/_models';
import { UserService } from '../user.service';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AlertService } from 'src/app/alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';


@Component({
  selector: 'app-viewissues',
  templateUrl: './viewissues.component.html',
  styleUrls: ['./viewissues.component.css']
})
export class ViewissuesComponent implements OnInit {
  //dialogRef: MdDialogRef<ViewjobportalComponent>;
  model: any = {};
  issue:Issue;
  priorityList:any;
  countryList:any;
  commentsList:any;
  statusList:any;
  dialogConfig = new MatDialogConfig();

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private sanitizer:DomSanitizer,

    public dialogRef: MatDialogRef<ViewissuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  

//    const priority = require("../../priority.json");
    const priority = require("../../../assets/priority.json");

    this.priorityList=priority;

       
     this.userService.get(this.data)
     .subscribe(
         data => {
             this.model = data;
             console.log("portal Id-->"+this.model.issueId);

             
         },
         error => {
             alert('Error !!!!');
         }
     );
  
     this.userService.getComments(this.data)
     .subscribe(
         res => {
             this.commentsList = res;
             console.log(this.commentsList[0].date);
             console.log(this.commentsList[0].issueComments);
             console.log("Comments Lenght-->"+this.commentsList.lenght);             
         },
         error => {
             alert('Error !!!!');
         }
     );

     }
  ngOnInit() {
    console.log(this.data);
    const country = require("../../../assets/country.json");
    this.countryList=country;
    const status = require("../../../assets/issuestatus.json");
    this.statusList=status;
  }

  close() {
     this.dialogRef.close();
   }

   transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.model.cardImageBase64);
   }
   utcDateTime: any;

   addComments(){ 
    let local_date = moment.utc(this.utcDateTime).local().format('YYYY-MM-DD HH:mm:ss a');
    console.log(local_date)
    console.log("Issue ID--->"+this.model.issueId);
    this.model.byissueId = this.model.issueId;
    this.model.date = local_date;
    this.model.addedPerson = localStorage.getItem("currentusername");

    // alert("addComments"+this.model.issueComments);
     this.userService.saveComments(this.model)
              .subscribe(
                  data => {
                      console.log('return value -->'+data);
                      this.model.portalname=null;
                          console.log('If User Exits'); 
                          this.alertService.success("Comments Added.");
                          setTimeout(() => {
                            this.alertService.clear();
                          }, 1000);
                    
                  },
                  error => {
                    alert("Server error...");
  
                  });
    this.dialogRef.close();

 
              
     this.model.addcomments == null;
  }
  
  editRemove(value:string) {
     if(value=="PUT"){
     // alert(" PUT ID --->"+value);
      console.log("Update Issue --->"+this.model.issueId);
      this.userService.update(this.model)
      .subscribe(
          data => {
            console.log("update status"+data.status);
              if(data.status=="success"){
                console.log('successfully updated...');
                this.alertService.success("successfully saved");
                setTimeout(() => {
                  this.alertService.clear();
                }, 1000);

              }
         else{
           alert("Error else;");
         }
              
          },
          error => {
            this.dialogRef.close();
              alert('Update Error !!!!');
          }
      );
 
     }
     if(value=="DELETE"){
      console.log("Portal ID --->"+this.model.issueId);
      this.userService.remove(this.model.issueId)
      .subscribe(
          data => {
           this.dialogRef.close();
           this.alertService.warn("Removed");
           setTimeout(() => {
             this.alertService.clear();
           }, 1000);
          },
          error => {
              alert('Error !!!!');
          }
      );
 

     }
     this.dialogRef.close();
   }
}
