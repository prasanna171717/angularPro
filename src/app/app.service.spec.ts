
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { AppService } from './app.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ItemData } from './inventory/inventory.component';

describe('AppService', () => {
  let service: AppService;
  let httpMock:HttpTestingController;
  let dummyData: ItemData[];
  let baseUrl:string ='http://localhost:3000/inventory'

  let pro_id:number
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers:[AppService]
    });
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
    
   
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController)
    
   pro_id= dummyData[0].id
  });
  
  afterEach(() => {
    httpMock.verify();
});
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get the list of products', fakeAsync(() =>{

    service.getItems().subscribe( items =>{
      expect(items.length).toBe(2)
      expect(items).toEqual(dummyData)

    })
    tick();
    const request= httpMock.expectOne(baseUrl)
    expect(request.request.method).toBe('GET')
    request.flush(dummyData)
  }))


  it('get Item by product Id', ()=>{
    
    service.getItembyId(pro_id).subscribe(data =>{
    
      expect(data).toEqual(dummyData[0])
    })
    const request = httpMock.expectOne(baseUrl +'/'+ pro_id)
    expect(request.request.method).toBe('GET')
    request.flush(dummyData[0])
  })


  it('delete item from Array of Objects', () =>{
    service.deleteItem(pro_id).subscribe( result=> expect(result).toBeNull)
    
  const request = httpMock.expectOne(baseUrl+'/'+pro_id)
  expect(request.request.method).toBe('DELETE')
  request.flush({})
  })


  it('add Item to the list', ()=>{
    let item ={
      "id": 0,
      "product_name": "Cheese Cloth No 100",
      "description": "eu mi nulla ac",
      "price": 3.98,
      "color": "Green",
      "available_qty": 7.2
    }
    service.addItem(item).subscribe(result =>{
    
      expect(result).toEqual(dummyData[0])
    })
    const request= httpMock.expectOne(baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(dummyData[0])
  })

  it('edit Item in the list', ()=>{
    let item ={
      "id": 9,
      "product_name": "Cheese Cloth No 100",
      "description": "eu mi nulla ac",
      "price": 3.98,
      "color": "Green",
      "available_qty": 7.2
    }
    service.editItem(item).subscribe(result =>{
    
      expect(result).toEqual(dummyData[0])
    })
    const request= httpMock.expectOne(baseUrl +'/' + pro_id)
    expect(request.request.method).toBe('PUT')
    request.flush(dummyData[0])
  })

});

