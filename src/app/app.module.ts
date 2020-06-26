import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from'@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule, Routes } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";

import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { AlertComponent } from './_directives/index';
import { AuthenticationService } from './_services/index';
import { AlexModule } from './alex/alex.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard Component' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Component' }},
  { path: 'landingpage', component: LandingpageComponent, data: { title: 'Landing Component' },
    children: [
       // dev
       //   { path: '', loadChildren: () => AlexModule },
       //{ path: '', loadChildren: () => UserModule }
      
       // prod
      { path: '', loadChildren: './alex/alex.module#AlexModule' },
      { path: '', loadChildren: './user/user.module#UserModule' }

    ],
  },

  { path: '**', redirectTo: 'login' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    LandingpageComponent,   
    DashboardComponent,
   // AlertComponent
  ],

  imports: [
    FormsModule,
    AlertModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true , onSameUrlNavigation: 'reload'} // <-- debugging purposes only
    ),
    CustomMaterialModule,
    AlexModule,
    UserModule,
  ],
  exports: [
    AlexModule,
    //UserModule,
  ],
  providers: [AuthenticationService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
