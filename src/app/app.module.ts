import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { TodoformComponent } from './todoform/todoform.component';
import { MaterialModule } from "./material/material.module";
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TodoformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
