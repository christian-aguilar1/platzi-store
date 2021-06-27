import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { FirestoreService } from 'src/app/core/services/firestore/products/firestore.service';

import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  // products!: Product[];
  public products = [] as  any;
  public idDocs = [] as  any;
  displayedColumns: string[] = ['id', 'name', 'description', 'image','price', 'actions'];

  constructor(private productsService: ProductsService,
              private firestoreService: FirestoreService,
              private router: Router)
              {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    // this.productsService.getAllProducts().subscribe(products => {
    //     this.products = products;
    //   });
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((doc) => {
        this.products.push(doc.data());
        this.idDocs.push(doc.id);
      });
    });
  }

  deleteProduct(id: number) {
    console.log(this.idDocs)
    console.log(this.products)
    console.log(id)
    let idDelete = "" + id
    this.firestoreService.deleteProduct(idDelete)
      .then(() => {
        console.log("Document successfully deleted!");
        this.router.navigateByUrl('/', {skipLocationChange: true}).
          then(() =>
            this.router.navigate(['./admin/products'])
          );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
    // this.productsService.deleteProduct(id)
    //   .subscribe(response => {
    //     console.log('Product deleted response:::', response);
    //     if (response) {
    //       const index = this.products.findIndex((product: { id: string; }) => product.id === id);
    //       this.products.splice(index, 1);
    //       this.products = [...this.products];
    //     }
    //   });
  }

}
