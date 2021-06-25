import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  public createProduct(data: {id: number, name: string, description: string, price: number, image: string}) {
    return this.firestore.collection('product').add(data);
  }

  public getProduct(documentId: string) {
    return this.firestore.collection('product').doc(documentId).snapshotChanges();
  }

  public getProducts() {
    return this.firestore.collection('product').get();
  }

  public updateProduct(documentId: string, data: any) {
    return this.firestore.collection('product').doc(documentId).set(data);
  }
}
