
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  displayedColumns = ['product_name', 'description', 'color', 'price', "available_qty", 'edit', 'delete'];

  dataSource: MatTableDataSource<ItemData>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }



  @ViewChild('updateItem', { read: ViewContainerRef })
  vcr !: ViewContainerRef

  constructor(private appService: AppService, private cfr: ComponentFactoryResolver) {
    this.dataSource = new MatTableDataSource<ItemData>();
  }

  ngOnInit() {

    this.getList()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getList() {
    this.appService.getItems().subscribe(result => this.dataSource.data = result)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadComponent(id: number): void {
    this.appService.setId(id)
    import('../update-item/update-item.component').then(({ UpdateItemComponent }) => {
      this.vcr.clear()

      const dcf = this.cfr.resolveComponentFactory(UpdateItemComponent)
      const compRef = this.vcr.createComponent(dcf)
      if (id !== 0) {
        this.appService.getItembyId(id).subscribe(item => {

          compRef.instance.productForm.controls['product_name'].setValue(item.product_name)
          compRef.instance.productForm.controls['description'].setValue(item.description)
          compRef.instance.productForm.controls['color'].setValue(item.color)
          compRef.instance.productForm.controls['price'].setValue(item.price)
          compRef.instance.productForm.controls['available_qty'].setValue(item.available_qty)
        })
      }
      compRef.instance.getList.subscribe(() => {

        this.getList()
      })


    })


  }
  delete(id: number) {
    this.appService.deleteItem(id).subscribe(() => {

      this.getList()
    })
  }


}


export interface ItemData {
  id: number,
  product_name: string;
  description: string;
  color: string;
  price: number;
  available_qty: number;
}


