import { Injectable } from '@angular/core';
import {Item} from '../models/Item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
    coinCollection: AngularFirestoreCollection<Item>;
    coins: Observable<Item[]>;

    constructor(private fireStore: AngularFirestore) {
        // Returns a reference to the entire collection
        this.coinCollection = this.fireStore.collection('coins');

        this.coins = this.coinCollection.snapshotChanges().pipe(
            map(actions => actions.map( a => {
                const data = a.payload.doc.data() as Item;
                const id = a.payload.doc.id;
                return{id, ...data};
            }))
        );
    }

    getAll(): Observable<Item[]> {
        return this.coins;
    }
}
