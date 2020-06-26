
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Bank } from 'src/app/_models';
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
  selector: 'add',
  styleUrls: ['./bank.css'],
  templateUrl: './add.html', 
})
export class AddBank {
  countryList:any;
  priorityList:any;
  model: any = {};
  bank:Bank; 
  constructor(
    private alexService: AlexService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddBank>,
    ) {
      this.countryList = require("../../../assets/country.json");
    }

    close() {
    this.dialogRef.close();
  }

  saveBank(){
    console.log("save bank");
    this.model.createdPerson=localStorage.getItem("currentusername");
    this.model.currentUser=localStorage.getItem('currentusername');
    console.log('............controller save bank....');
    this.alexService.saveBank(this.model)
              .subscribe(
                  res => {
                    console.log('............1 ....');
                    console.log('return value -->'+res.status);
                      if(res.status ="success"){
                        console.log('successfully updated...');
                        this.dialogRef.close();
                        this.alertService.success("Bank info successfully saved ");
                        setTimeout(() => {
                         this.alertService.clear();
                       }, 2000);
         
                      }
                 
                                   
                  },
                  error => {
                    alert("Server error...");
  
                  });
    this.dialogRef.close();
    
  }
}



@Component({
  selector: 'view',
  styleUrls: ['./bank.css'],
  templateUrl: './view.html', 
})
export class ViewBank {
  countryList:any;
  priorityList:any;
  model: any = {};
  bank:Bank; 

  constructor(
    private alexService: AlexService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ViewBank>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      const country = require("../../../assets/country.json");
      this.countryList=country;
      this.alexService.getBank(this.data)
     .subscribe(
         data => {
             this.model = data;
            // console.log("bank Id-->"+this.model.portalId);

              
         },
         error => {
             alert('Error !!!!');
         }
     );
    }

  close(): void {    
    this.dialogRef.close();
  }

  editRemove(value:string) {
    if(value=="PUT"){
    // alert(" PUT ID --->"+value);
     console.log("Update  ID --->"+this.model.bankId);
     this.alexService.updateBank(this.model)
     .subscribe(
         data => {
           console.log('update output-->'+data.status);

             if(data.status=="success"){
               console.log('successfully updated...');
               this.dialogRef.close();
               this.alertService.success("Bank info successfully updated ");
               setTimeout(() => {
                this.alertService.clear();
              }, 2000);

             }
        
             
         },
         error => {
           this.dialogRef.close();
             alert('Udate Error !!!!');
         }
     );
 
    }
    if(value=="DELETE"){
     console.log("Portal ID --->"+this.model.bankId);
     this.alexService.removeBank(this.model.bankId)
     .subscribe(
         data => {
          // this.dialogRef.close();
          this.dialogRef.close();
          console.log('successfully deleted...');
          this.alertService.success("Bank info successfully Removed..");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);

         },
         error => {
             alert('Error !!!!');
         }
     );


    }
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  displayedColumns: string[] = ['bankName','bankCountry','accountNumber','bankId'];
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

 
  model: any = {};
  bank:Bank; 

  public add=false
  public dataList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false

  constructor( 
    private router: Router,
    private alexService: AlexService,
    private dialog: MatDialog,
    private alertService: AlertService,
    ) { 

      this.alexService.loadBank()
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
    this.refresh();

  }

  filter(): void {
   
      const dialogRef = this.dialog.open(AddBank, {
        
         width: '60%',
  //  data: {name: this.name, animal: this.animal}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   // this.animal = result;
  });

}    

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  refresh() {
    console.log("before calling...ngOnInit......"); 
    this.alexService.loadBank()
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
  this.dialog.open(AddBank,{
    height: '80%', 
  })
  .afterClosed().subscribe(result => {
    this.refresh();
  });
    
} 
 
public viewData(bankid:number){
console.log("Bank Id Component Id--->"+bankid);
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(ViewBank,{
  //  data: {dialogTitle: "hello", dialogText: "text"},
    data: bankid,
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
