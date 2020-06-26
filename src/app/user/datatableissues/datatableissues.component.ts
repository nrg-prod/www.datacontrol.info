
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Portal } from 'src/app/_models';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { UserService } from '../user.service';
import { AddissuesComponent } from '../addissues/addissues.component';
import { ViewissuesComponent } from '../viewissues/viewissues.component';
import { Issue } from 'src/app/_models/issue';
import { AlertService } from 'src/app/alert/alert.service';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'filter',
  styleUrls: ['./filter.css'],
  templateUrl: './filter.html', 
})
export class Filter {
  countryList:any;
  priorityList:any;
  statusList:any;
  model: any = {};
  issue:Issue; 
  constructor(
    public dialogRef: MatDialogRef<Filter>,
    private userService: UserService,

    ) {
      const country = require("../../../assets/country.json");
      const priority = require("../../../assets/priority.json");
      const statusjson = require("../../../assets/issuestatus.json");

      this.countryList=country;
      this.priorityList=priority;
      this.statusList=statusjson;

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(){
    console.log(this.model.status);
    this.userService.load(this.model.status)
    .subscribe(
        data => {
        //data;
        this.dialogRef.close(data);       },
        error => {
            alert('Error !!!!');
        }
    );
  }
}
@Component({
  selector: 'app-datatableissues',
  templateUrl: './datatableissues.component.html',
  styleUrls: ['./datatableissues.component.css']
})
export class DatatableissuesComponent implements OnInit {
  displayedColumns: string[] = ['issueId2','issueNotes','createdDate','issueStatus','priority','issueId'];
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
    private userService: UserService,
    private dialog: MatDialog,
    private alertService: AlertService,
    ) { 

      this.userService.load("all")
      .subscribe(
          data => {
          this.dataList = data;
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

  openfilter(): void{
  let dialogRef = this.dialog.open(Filter).afterClosed()
  .subscribe(response => {
    this.dataList = response;
    this.dataSource = new MatTableDataSource(this.dataList);
    console.log(response.lenght);
    console.log(response);
  });
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
    this.userService.load("all")
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

  openDialogForAdd() {
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(AddissuesComponent,{
    height: '80%', 
  })
  .afterClosed().subscribe(result => {
    this.refresh();
  });
    
} 
 
public viewData(issueId:number){
console.log("JobportalComponent Id--->"+issueId);
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(ViewissuesComponent,{
  //  data: {dialogTitle: "hello", dialogText: "text"},
    data: issueId,
    height: '80%'
  }).afterClosed().subscribe(result => {
   this.refresh();
   });;
}

  public downloadAsPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });
    //doc.open('tableToPdf.pdf');
    doc.text(20, 20, 'Employee Information');
    
    let left = 15;
    let top = 8;
    const imgWidth = 100;
    const imgHeight = 100;
    var img = new Image();
    var imgData = './assets/images/nrg_logo.png'
    doc.save('tableToPdf.pdf');
  }
  bodyText: string;
 
}
