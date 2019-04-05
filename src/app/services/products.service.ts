import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Item} from '../models/Item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    productCollection: AngularFirestoreCollection<Item>;
    products: Observable<Item[]>;

    constructor(private fireStore: AngularFirestore) {
        // Returns a reference to the entire collection
        this.productCollection = this.fireStore.collection('items');

        this.products = this.productCollection.snapshotChanges().pipe(
            map(actions => actions.map( a => {
                const data = a.payload.doc.data() as Item;
                const id = a.payload.doc.id;
                return{id, ...data};
            }))
        );
    }

    getAll(): Observable<Item[]> {
        return this.products;
    }

}
