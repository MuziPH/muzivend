import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore';
import {Coin} from '../models/Coin';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
    coinCollection: AngularFirestoreCollection<Coin>;
    coins: Observable<Coin[]>;
    fiftyCentDoc: any;
    oneRandDoc: any;
    twoRandDoc: any;
    fiveRandDoc: any;

    constructor(private fireStore: AngularFirestore) {
        // Returns a reference to the entire collection
        this.coinCollection = this.fireStore.collection('coins');

        this.coins = this.coinCollection.snapshotChanges().pipe(
            map(actions => actions.map( a => {
                const data = a.payload.doc.data() as Coin;
                const id = a.payload.doc.id;
                return{id, ...data};
            }))
        );
    }

    getAll(): Observable<Coin[]> {
        return this.coins;
    }

    loadCoins(fiftyCount: number, oneRandCount: number, twoRandCount: number, fiveRandCount: number) {

        this.fiftyCentDoc = this.fireStore.doc<any>('/coins/N1aG05ZG0nQGY6Rkcq6z');

        this.fiftyCentDoc.update({
            count: fiftyCount,
            // Other info you want to add here
        });

        this.oneRandDoc = this.fireStore.doc<any>('/coins/mknuEbP4utpEj3mqQ2mX');

        this.oneRandDoc.update({
            count: oneRandCount,
            // Other info you want to add here
        });

        this.twoRandDoc = this.fireStore.doc<any>('/coins/zxdCakNmgZJGawS0XRjk');

        this.twoRandDoc.update({
            count: twoRandCount,
            // Other info you want to add here
        });

        this.fiveRandDoc = this.fireStore.doc<any>('/coins/enGWDifOqehesn9odIew');

        this.fiveRandDoc.update({
            count: fiveRandCount,
            // Other info you want to add here
        });

    }

    updateFifty(fiftyCount: number) {
        this.fiftyCentDoc = this.fireStore.doc<any>('/coins/N1aG05ZG0nQGY6Rkcq6z');

        this.fiftyCentDoc.update({
            count: fiftyCount,
            // Other info you want to add here
        });
    }

    updateOne(oneRandCount: number) {
        this.oneRandDoc = this.fireStore.doc<any>('/coins/mknuEbP4utpEj3mqQ2mX');

        this.oneRandDoc.update({
            count: oneRandCount,
            // Other info you want to add here
        });
    }

    updateTwo(twoRandCount: number) {
        this.twoRandDoc = this.fireStore.doc<any>('/coins/zxdCakNmgZJGawS0XRjk');

        this.twoRandDoc.update({
            count: twoRandCount,
            // Other info you want to add here
        });
    }

    updateFive(fiveRandCount: number) {
        this.fiveRandDoc = this.fireStore.doc<any>('/coins/enGWDifOqehesn9odIew');

        this.fiveRandDoc.update({
            count: fiveRandCount,
            // Other info you want to add here
        });
    }
}
