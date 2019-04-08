import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Item} from '../models/Item';
import {Observable} from 'rxjs';
import {count, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    productCollection: AngularFirestoreCollection<Item>;
    products: Observable<Item[]>;
    chipsDoc: any;
    cokeDoc: any;
    lunchbarDoc: any;

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

    loadItems(chipsCount: number, cokeCount: number, lunchbarCount: number) {

        this.chipsDoc = this.fireStore.doc<any>('/items/JNj1gWlfhP8wysmQwUbX');

        this.chipsDoc.update({
            count: chipsCount,
            // Other info you want to add here
        });

        this.cokeDoc = this.fireStore.doc<any>('/items/wKYssTW2iheGbPXX5Dbf');

        this.cokeDoc.update({
            count: cokeCount,
            // Other info you want to add here
        });

        this.lunchbarDoc = this.fireStore.doc<any>('/items/kTYPju7LOHzuanFQZIcI');

        this.lunchbarDoc.update({
            count: lunchbarCount,
            // Other info you want to add here
        });
    }

    updateChips(chipsCount: number) {
        this.chipsDoc = this.fireStore.doc<any>('/items/JNj1gWlfhP8wysmQwUbX');

        this.chipsDoc.update({
            count: chipsCount,
            // Other info you want to add here
        });
    }

    updateCoke(cokeCount: number) {
        this.cokeDoc = this.fireStore.doc<any>('/items/wKYssTW2iheGbPXX5Dbf');

        this.cokeDoc.update({
            count: cokeCount,
            // Other info you want to add here
        });
    }

    updateLunchBar(lunchbarCount: number) {
        this.lunchbarDoc = this.fireStore.doc<any>('/items/kTYPju7LOHzuanFQZIcI');

        this.lunchbarDoc.update({
            count: lunchbarCount,
            // Other info you want to add here
        });
    }
}
