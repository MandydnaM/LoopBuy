import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  // productList: any[] = [];
  categoryList: any[] = [];

  constructor(private proSrv: ProductService, private router: Router) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this.getAllCategory();
  }

  navigateToProducts(id: number) {
    this.router.navigate(['/products', id])
  }

  // getAllProducts() {
  //   this.proSrv.getProducts().subscribe((res: any) => { this.productList = res.data; })
  // }

  getAllCategory() {
    this.proSrv.getCategory().subscribe((res: any) => {
      console.log(res.data);
      this.categoryList = res.data;
    })
  }
}
