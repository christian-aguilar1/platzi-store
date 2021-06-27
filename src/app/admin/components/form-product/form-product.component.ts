import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FirestoreService } from 'src/app/core/services/firestore/products/firestore.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup;
  name$!: string;
  image$!: Observable<any>;
  public products = [] as  any;

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private storage: AngularFireStorage,
              private firestoreService: FirestoreService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((doc) => {
        this.products.push(doc.data());
        // this.idDocs.push(doc.id);
        // console.log(this.idDocs)
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      if (this.name$ !== undefined) {
        const product = this.form.value;
        let idMayor = -1;
        product["image"] = this.name$;
        for (const item in this.products) {
          if (idMayor < this.products[item]["id"]) {
            idMayor = this.products[item]["id"];
          }
        }
        product["id"] = idMayor + 1;
        const newId: string = "" + (idMayor + 1);
        this.firestoreService.createProduct(newId, product).
          then((newProduct) => {
            console.log("newProduct", newProduct);
            this.router.navigate(['./admin/products']);
          })
          .catch((error) => {
            console.error("Error adding product: ", error);
          });
      }

      else {
        alert("Es necesario agregar una imagen del producto")
      }
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    task.snapshotChanges()
      .pipe(finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.form.get('image')?.setValue(url);
        })
      }))
      .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      // id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    });
  }

  get priceField() {
    return this.form.get('price')!;
  }

}
