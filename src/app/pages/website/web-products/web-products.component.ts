import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-web-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.css'
})
export class WebProductsComponent {
  productList: any[] = [];
  categoryList: any[] = [];

  constructor(private proSrv: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
  }

  navigateToProducts(id: number) {
    this.router.navigate(['/products', id])
  }

  getAllProducts() {
    this.proSrv.getProducts().subscribe((res: any) => { this.productList = res.data; })
  }

  getAllCategory() {
    this.proSrv.getCategory().subscribe((res: any) => { this.categoryList = res.data; })
  }
}
