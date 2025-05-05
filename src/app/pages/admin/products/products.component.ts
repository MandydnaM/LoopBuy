import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  }

  categoryList: any[] = [];
  productsList: any[] = [];

  constructor(private productSrv: ProductService) {

  }
  ngOnInit(): void {
    this.getAllCategory();
    this.getProducts();
  }
  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.productsList = res.data;
    })
  }

  getProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      this.categoryList = res.data;
    })
  }

  onUpdate() {
    this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert("product created")
        this.getProducts();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();
  }
  onSave() {
    this.productSrv.updateProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert("product updated")
        this.getProducts();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(item: any) {
    const isDelete = confirm('Are you sure want to delete?');
    if (isDelete) {
      this.productSrv.deleteProduct(item.productId).subscribe((res: any) => {
        debugger;
        if (res.result) {
          alert("product deleted")
          this.getProducts();
        } else {
          alert(res.message)
        }
      })
    }
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
}
