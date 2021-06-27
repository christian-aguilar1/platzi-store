import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore/products/firestore.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // products: Product[] = [];
  public products = [] as  any;
  public idDocs = [] as  any;

  constructor(private productsService: ProductsService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((doc) => {
        this.products.push(doc.data());
        this.idDocs.push(doc.id);
        // console.log(this.products);
        // console.log(this.idDocs)
      });
    });
    // this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  // fetchProducts() {
  //   this.productsService.getAllProducts().subscribe(products => {
  //     this.products = products;
  //   });
  // }

}
