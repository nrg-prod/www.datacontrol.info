import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Router } from '@angular/router';
import { Issue } from 'src/app/_models';
import { UserService } from '../user.service';
import { AlertService } from 'src/app/alert/alert.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-addissues',
  templateUrl: './addissues.component.html',
  styleUrls: ['./addissues.component.css']
})
export class AddissuesComponent implements OnInit {
  countryList:any;
  priorityList:any;
  model: any = {};
  issue:Issue; 
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,

    private dialogRef: MatDialogRef<AddissuesComponent>,
  ) { }

  ngOnInit() {
    const country = require("../../../assets/country.json");
    const priority = require("../../../assets/priority.json");    
    this.countryList=country;
    this.priorityList=priority;
  }

  close() {
    this.dialogRef.close();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 1200;
        const max_width = 600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
               const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
               
                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
  save() {
    this.model.createdPerson=localStorage.getItem("currentusername");
    this.model.currentUser=localStorage.getItem('currentusername');
    this.model.issueStatus="Open";
    this.model.cardImageBase64=this.cardImageBase64;
    console.log('............controller save....');
    this.userService.save(this.model)
              .subscribe(
                  data => {
                      console.log('return value -->'+data);
                      this.model.portalname=null;
                          console.log('If User Exits'); 
                          this.alertService.success("Saved.");
                          setTimeout(() => {
                            this.alertService.clear();
                          }, 1000);
                    
                  },
                  error => {
                    alert("Server error...");
  
                  });
    this.dialogRef.close();
}
}
