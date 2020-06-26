
import * as jsPDF from 'jspdf';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import * as jQuery from 'jquery';
import { Subject } from 'rxjs';
//import { AlertService, UserService } from '../../_services';
import { Router } from '@angular/router';
import { Portal } from 'src/app/_models';
import { HttpClientModule } from '@angular/common/http'; 
import { AlexService } from '../alex.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddjobportalComponent } from '../addjobportal/addjobportal.component';
import { ViewjobportalComponent } from '../viewjobportal/viewjobportal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-jobportal',
  templateUrl: './jobportal.component.html',
  styleUrls: ['./jobportal.component.css']
})
export class JobportalComponent implements OnInit {
  displayedColumns: string[] = ['id','portalName','country', 'username', 'password','phoneNumber1','emailId1','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


  model: any = {};
  portal:Portal;
  public add=false
  portalview="none";
  public dataList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false

  constructor( 
    private router: Router,
    private alexService: AlexService,
    private dialog: MatDialog,
    ) { 

      this.alexService.myPortaltable()
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    console.log("before calling...ngOnInit......"); 
    this.alexService.myPortaltable()
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

  addNew() {
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(AddjobportalComponent,{
   // data: {dialogTitle: "hello", dialogText: "text"},
    height: '80%', 
  })
  .afterClosed().subscribe(result => {
    this.refresh();
  });
    
}

public viewData(portalId:number){
console.log("JobportalComponent Id--->"+portalId);
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(ViewjobportalComponent,{
  //  data: {dialogTitle: "hello", dialogText: "text"},
    data: portalId,
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
