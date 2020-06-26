
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Portal } from 'src/app/_models';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Issue } from 'src/app/_models/issue';
import { AlertService } from 'src/app/alert/alert.service';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { AlexService } from '../alex.service';

@Component({
  selector: 'app-usermgnt',
  templateUrl: './usermgnt.component.html',
  styleUrls: ['./usermgnt.component.css']
})
export class UsermgntComponent implements OnInit {

  //displayedColumns: string[] = ['username','userpassword'];
  displayedColumns: string[] = ['username','userpassword','usertype','userstatus','emailId','id'];

//  displayedColumns: string[] = ['issueId2','issueNotes','createdDate','clientName','issueStatus','priority','issueId'];
  //displayedColumns: string[] = ['issueId2','issueNotes','clientName','issueStatus','priority','issueId'];

  

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

 
  model: any = {};
  issue:Issue;
  public add=false
  public dataList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false

  constructor( 
    private router: Router,
    private service: AlexService,
    private dialog: MatDialog,
    private alertService: AlertService,
    ) { 

      this.service.loadUserInfo("all")
      .subscribe(
          data => {
          this.dataList = data;
          console.log(this.dataList[0].userName);
          this.dataSource = new MatTableDataSource(this.dataList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
 
         },
          error => {
              alert('Error !!!!');
          }
      );


  }

  ngOnInit() {
  }


/*
  openfilter(): void {
         const dialogRef = this.dialog.open(Filter, {
       width: '60%',
  //  data: {name: this.name, animal: this.animal}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('Result-->'+result);
   // this.animal = result;
  });

}    
*/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  refresh() {
    console.log("before calling...ngOnInit......"); 
    this.service.loadUserInfo("all")
      .subscribe(
          data => {
              this.dataList = data;
              this.dataSource = new MatTableDataSource(this.dataList);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              console.log("ngOnInit......4");
         },
          error => {
              alert('Error !!!!');
          }
      );
  }

  addNewUser() {
    
} 
 
public Filter(){
}

 
}
