import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {  MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    
 MatToolbarModule,
MatPaginatorModule,MatTableModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSortModule,
  MatSelectModule,MatSnackBarModule
  ],
  exports:[
    CommonModule,   
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatSortModule,
    MatListModule,MatSidenavModule,
MatPaginatorModule,MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
     MatButtonModule, 
     MatCardModule,
     MatInputModule,
     MatDialogModule,
     MatTableModule,
     MatMenuModule, MatSnackBarModule
     
  ]
})
export class MaterialModule { }
