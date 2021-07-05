import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { AppService } from '../app.service';
import { InventoryComponent, ItemData } from '../inventory/inventory.component';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {


  @Output() getList = new EventEmitter()

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  itemId:number=0
  productForm: FormGroup
    = new FormGroup({
      product_name: new FormControl(''),
      description: new FormControl(''),
      color: new FormControl(''),
      price: new FormControl(''),
      available_qty: new FormControl(''),
    })
  constructor(private appService: AppService,
     private formbuilder: FormBuilder, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      product_name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      color: ["", [Validators.required]],
      price: ['' , [Validators.required]],
      available_qty: ['' , [Validators.required]]
    })
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName) && this.productForm.controls[controlName].dirty;
  }
  SavedSuccessful(isUpdate: number) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

  }


  onFormSubmit() {
    if (this.productForm.valid) {
      this.itemId = this.appService.getId()
      const item = this.productForm.value
      if (this.itemId == 0) {

        this.appService.addItem(item).subscribe(response => {          
          this.getList.emit(response)
          this.productForm.reset()
          this.SavedSuccessful(1)

        })
      }
      else {


        this.appService.editItem(item).subscribe(response => {

          this.getList.emit(response)
          this.productForm.reset()
          this.SavedSuccessful(0)
          this.itemId = 0

        })


      }
    }
  }

}
