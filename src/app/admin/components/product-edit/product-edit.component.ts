import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FirestoreService } from 'src/app/core/services/firestore/products/firestore.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  public product = [] as  any;
  id!: string;
  name$!: string;
  image$!: Observable<any>;
  isValid!: boolean;

  productsForm = new FormControl();
  productsList = [
    {value: 'name', viewValue: 'Nombre'},
    {value: 'description', viewValue: 'Descripción'},
    {value: 'image', viewValue: 'Imagen'},
    {value: 'price', viewValue: 'Precio'}
  ];
  productsEdit = {} as  any;

  constructor(
    private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private firestoreService: FirestoreService,
              private storage: AngularFireStorage,
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => this.id = params.id);
    this.firestoreService.getProduct(this.id)
      .subscribe(product => {
        this.product = product.data()
        this.productsEdit = product.data()
      })
  }

  saveProduct(event: Event) {

    event.preventDefault()
    if(this.productsForm.value !== null) {
      if(this.form.valid) {
        const product = this.form.value;
        console.log("product", product)
        if (product.name !== '' || product.price !== '' || product.description !== '' || this.name$ !== undefined) {
          console.log('this.productsEdit', this.productsEdit)
          if (product.name !== '') {
            this.productsEdit["name"] = product.name;
          }
          if (product.description !== '') {
            this.productsEdit["description"] = product.description;
          }
          if (product.price !== '') {
            this.productsEdit["price"] = product.price;
          }
          if (this.name$ !== undefined) {
            this.productsEdit["image"] = this.name$;
          }
          this.firestoreService.updateProduct(this.id, this.productsEdit)
            .then(() => {
              console.log("Product successfully updated!");
              this.router.navigate(['./admin/products']);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }

        else {
          alert("Debe Seleccionar al menos un campo y llenarlo");
        }
      }
    }

    else {
      alert("Debe Seleccionar al menos un campo y llenarlo");
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    task.snapshotChanges()
      .pipe(finalize(() => this.image$ = fileRef.getDownloadURL()))
      .subscribe();
  }

  checkOption(option: string) {
    if (this.productsForm.value !== null){
      if (this.productsForm.value.includes(option)) {
        return true
      }
    }
    return false;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    });
  }

  get priceField() {
    return this.form.get('price')!;
  }

}
