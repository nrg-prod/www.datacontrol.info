import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AlexService } from '../alex.service';
import { Router } from '@angular/router';
import { Portal } from 'src/app/_models';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-addjobportal',
  templateUrl: './addjobportal.component.html',
  styleUrls: ['./addjobportal.component.css']
})
export class AddjobportalComponent implements OnInit {
  countryList:any;
  model: any = {};
  portal:Portal; 
  constructor(
    private router: Router,
    private alertService: AlertService,
    private alexService: AlexService,
    private dialogRef: MatDialogRef<AddjobportalComponent>,
  ) { }

  ngOnInit() {
    const country = require("../../../assets/country.json");
    this.countryList=country;
     
  }
 
  close() {
    this.dialogRef.close();
  }

  myPortalReg() {
    this.model.createdPerson=localStorage.getItem("currentusername");
    this.model.currentUser=localStorage.getItem('currentusername');
    console.log('............controller myPortalReg....');
    this.alexService.myPortalReg(this.model)
              .subscribe(
                  data => {
                      console.log('return value -->'+data);
                      this.model.portalname=null;
                    //  if(this.portal.status=="success") {
                          console.log('If User Exits');

                   //   }
                   console.log('successfully deleted...');
                   this.alertService.success("Job Portal is successfully saved");
                   setTimeout(() => {
                    this.alertService.clear();
                  }, 2000);
                  },
                    
                 
                  error => {
                    alert("Server error...");
  
                     // this.otherErrordialog = 'block';
                     // this.loading = false;
                  });
    this.dialogRef.close();
}
}
