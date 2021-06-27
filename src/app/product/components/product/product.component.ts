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
  @Input() idDoc!: string;
  image!: string;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(private cartService: CartService, private storage: AngularFireStorage) {
    // console.log(this.idDoc);
  }

  ngOnInit(): void {
    // console.log('3. ngOnInit');
    const fileRef = this.storage.ref(this.product.image);
    const imageRef = fileRef.getDownloadURL();
    imageRef.subscribe(url => {
      this.image = url;
    })
    // console.log("this.idDoc", this.idDoc);
  }

  addCart() {
    console.log('anadido al carrito');
    this.cartService.addCart(this.product);
  }

}
