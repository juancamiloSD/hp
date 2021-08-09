import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { APP_ROUTING } from './app.routing';

import { DataTablesModule } from "angular-datatables";
import { HouseComponent } from './house/house.component';
import { StaffComponent } from './staff/staff.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HouseComponent,
    StaffComponent,
    StudentsComponent
  ],
  imports: [
    HttpClientModule,
    APP_ROUTING,
    BrowserModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
