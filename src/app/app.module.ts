import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryComponent } from './inventory/inventory.component';

import { MaterialModule } from './helpers/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UpdateItemComponent } from './update-item/update-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    UpdateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MaterialModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
