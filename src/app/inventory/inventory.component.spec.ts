import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from '../app.service';
import { UpdateItemComponent } from '../update-item/update-item.component';

import { InventoryComponent, ItemData } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let service: AppService;
  let dummyData :ItemData[];
  let id:number

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
      imports:[HttpClientTestingModule, ReactiveFormsModule,MatSnackBarModule, BrowserAnimationsModule],
      providers:[UpdateItemComponent]
    })
    .compileComponents();
  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dummyData=[
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
    
 id= dummyData[0].id
   
    service = TestBed.inject(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the update item component', inject([UpdateItemComponent], (component : UpdateItemComponent) => {
    expect(component).toBeTruthy();
  }));
  
  it('should call ngOnInit', () => {
    let spy_getList = spyOn(component,"getList")
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([]);
  })

  it('should call getList and get response as empty array', fakeAsync(() => {
    const service = fixture.debugElement.injector.get(AppService);
    let spy_getList = spyOn(service,"getItems").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.getList();
    tick(100);
    expect(component.dataSource.data).toEqual([]);
  }))

  it('should call getList and get response as array', fakeAsync(() => {
    let getList = spyOn(service,"getItems").and.callFake(() => {
      return of(dummyData).pipe(delay(100));
    });
    component.getList();
    tick(100);
    expect(component.dataSource.data.length).toEqual(dummyData.length)
  }))
  

  
  it('should call loadComponent method', fakeAsync(() => {
    let getItembyId = spyOn(service,"getItembyId").and.callFake(() => {
      return of(dummyData[0]).pipe(delay(100));
    });
    component.loadComponent(id);
    tick(100);
    expect(getItembyId).toHaveBeenCalled()
    
    const viewContainerFixture = TestBed.createComponent(UpdateItemComponent);

    viewContainerFixture.detectChanges();
    const testViewContainerRef = viewContainerFixture.componentInstance
    expect(testViewContainerRef).toBeInstanceOf(UpdateItemComponent)
    
    
    }))


    it('should call delete method', fakeAsync(() => {
      let getList = spyOn(service,"deleteItem").and.callFake(() => {
        return of([]).pipe(delay(100));
      });
      component.delete(id);
      tick(100);
      expect(dummyData.length-1).toEqual(1)
      
    expect(component.dataSource.data).toEqual([]);
      }))
});
