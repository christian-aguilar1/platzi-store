import { CartService } from './../../../core/services/cart.service';
import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  SimpleChange
} from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;
  image!: Observable<any>;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(private cartService: CartService, private storage: AngularFireStorage) {
    // console.log('1. constructor')
  }

  ngOnInit(): void {
    // console.log('3. ngOnInit');
  }

  uploadFile() {
    const pathReference = this.storage.ref('image/' + this.product.image);
    const fileRef = this.storage.ref('image/' + this.product.image);
    this.image = fileRef.getDownloadURL();
    this.image.subscribe(url => {
      console.log(url);
    })
  }

  addCart() {
    console.log('anadido al carrito');
    this.cartService.addCart(this.product);
  }

}
