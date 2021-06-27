import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private db: AngularFirestore) {}

  public createProduct(documentId: string, data: {id: number, name: string, description: string, price: number, image: string}) {
    return this.db.collection('product').doc(documentId).set(data);
  }

  public getProduct(documentId: string) {
    return this.db.collection('product').doc(documentId).get();
  }

  public getProducts() {
    return this.db.collection('product').get();
  }

  public updateProduct(documentId: string, data: any) {
    return this.db.collection('product').doc(documentId).set(data);
  }

  public deleteProduct(documentId: string) {
    return this.db.collection('product').doc(documentId).delete();
  }
}
