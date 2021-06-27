import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products$!: Observable<Product[]>;
  public images = {} as  any;
  firstFormGroup: FormGroup;
  id!: number;

  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.products$ = this._cartService.cart$;
    this.products$.subscribe((productsSnapshot) => {
      console.log("productsSnapshot", productsSnapshot)
      productsSnapshot.forEach((doc) => {
        const fileRef = this.storage.ref(doc.image);
        const imagesRef = fileRef.getDownloadURL();
        imagesRef.subscribe(url => {
          // this.images.push({(doc.image): url});
          let temp = doc.image
          this.images[temp] = url;
          // console.log("doc", doc)
          // console.log("url", url)
        })
      });
    });
    console.log("this.images", this.images)
    this.firstFormGroup = {} as FormGroup;
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({});
  }

  addCart(product: Product): void {
    console.log('Agregar al carrito');
    this._cartService.addCart(product);
  }

  /**
   * Quita el conjunto de un producto del carrito.
   * @param productId Identificador del producto.
   */
  removeFromCart(productId: String) {
    this._cartService.removeFromCart(productId);
  }

  /**
   * Quita un producto especifico del carrito.
   * @param productId Identificador del producto.
   */
  remove(productId: String) {
    this._cartService.remove(productId);
  }

  /**
   * Precio total de todos los productos.
   */
  totalAmount(): number {
    let counter: number = 0;

    this.products$.subscribe((products) => {
      products.forEach((product) => {
        counter = counter + product.price;
      });
    });

    return counter;
  }
}
