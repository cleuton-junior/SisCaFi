import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import { InMemoryDataBase } from '../in-memory-database';

@NgModule({
  declarations: [],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase),
  ]
})
export class CoreModule { }
