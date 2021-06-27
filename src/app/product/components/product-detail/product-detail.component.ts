import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FirestoreService } from 'src/app/core/services/firestore/products/firestore.service';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public products = [] as  any;
  image!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private firestoreService: FirestoreService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getProduct(id);
    });
  }

  getProduct(id: string) {
    // this.productsService.getProduct(id).subscribe(product => {
    //   this.product = product;
    // });
    this.firestoreService.getProduct(id)
      .subscribe((product) => {
        this.products = product.data();
        const fileRef = this.storage.ref(this.products.image);
        const imageRef = fileRef.getDownloadURL();
        imageRef.subscribe(url => {
          this.image = url;
        })
      });
  }

  createProduct() {
    const newProduct: Product = {
      id: '222',
      name: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto'
    }
    this.productsService.createProduct(newProduct).subscribe(product => console.log(product));
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 5555,
      description: 'edicion titulo'
    }
    this.productsService.updateProduct('2', updateProduct).subscribe(product => console.log(product));
  }

  deleteProduct() {
    this.productsService.deleteProduct('222').subscribe(rta => console.log(rta));
  }

}
