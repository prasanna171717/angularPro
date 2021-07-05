import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ItemData } from '../inventory/inventory.component';

import { UpdateItemComponent } from './update-item.component';

describe('UpdateItemComponent', () => {
  let component: UpdateItemComponent;
  let fixture: ComponentFixture<UpdateItemComponent>;

  let service: AppService;
  let dummyData: ItemData[];
  let id: number;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateItemComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule,BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture.detectChanges();
    dummyData = [
      {
        "id": 9,
        "product_name": "Cheese Cloth No 100",
        "description": "eu mi nulla ac",
        "price": 3.98,
        "color": "Green",
        "available_qty": 7.2
      },
      {
        "id": 10,
        "product_name": "Sherry - Dry",
        "description": "consequat metus",
        "price": 0.8,
        "color": "Maroon",
        "available_qty": 2.1
      }]

    id = dummyData[0].id

    service = TestBed.inject(AppService);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('price field validity', () => {
    let price = component.productForm.controls['price'];
    expect(price.valid).toBeFalsy();
  });

  // it('color field validity', () => {

  //   let color = component.productForm.controls['color'];
  //   errors = color.errors ;
  //   expect(errors['required']).toBeTruthy(); (1)
  // });

  it('submitting a form to edit the form', () => {
    expect(component.productForm.valid).toBeFalsy();
    component.itemId= dummyData[0].id

    let editData = spyOn(service, "editItem").and.callFake(() => {
      return of(dummyData[0]).pipe(delay(100));
    });
    component.onFormSubmit();
    expect(component.itemId).toEqual(dummyData[0].id)
    
    expect(component._snackBar.open).toBeTruthy()

    
  });
  
  it('submitting a form to add the form', () => {
    expect(component.productForm.valid).toBeFalsy();
    

    let editData = spyOn(service, "addItem").and.callFake(() => {
      return of(dummyData[0]).pipe(delay(100));
    });
    component.onFormSubmit();
    expect(component.itemId).toEqual(0)

    
    expect(component._snackBar.open).toBeTruthy()
  });



  it('should call savedSuccessful method for edit ', fakeAsync(() => {

    component.SavedSuccessful(0);
    tick(10);
    expect(component._snackBar.open).toBeTruthy()
    
  expect(component.verticalPosition).toEqual('bottom')
    flush()
  }))
  it('should call savedSuccessful method for add ', fakeAsync(() => {

    component.SavedSuccessful(1);
    tick(10);
    expect(component._snackBar.open).toBeTruthy()
  expect(component.horizontalPosition).toEqual('center')
    flush()
  }))


});


