import {Component, OnInit} from '@angular/core';
import {Item} from '../models/Item';
import {ProductsService} from '../services/products.service';
import {Coin} from '../models/Coin';
import {CoinsService} from '../services/coins.service';
import {LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    itemColumns: string[] = ['Item', 'Price', 'Count'];
    rows: Item[];
    coinColumns: string[] = ['Denomination', 'Value', 'Count'];
    coins: Coin[];
    prods: any[];

    constructor(private prodService: ProductsService, private coinService: CoinsService,
                public loading: LoadingController, private storage: Storage) {
    }

    ngOnInit() {
        this.presentLoading();
        this.prodService.getAll().subscribe(res => {
                this.rows = res;
                this.storage.set('prods', res);
            }
        );

        this.coinService.getAll().subscribe(res => {
                this.coins = res;
                this.storage.set('coins', res);
            }
        );

    }

    refreshProducts() {
        this.presentLoading();
        this.prodService.getAll().subscribe(res => {
                this.rows = res;
                this.storage.set('prods', res);
            }
        );
    }

    refreshCoins() {
        this.presentLoading();
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
                this.storage.set('coins', res);
            }
        );
    }

    async presentLoading() {
        const loading = await this.loading.create({
            message: 'Loading your data...',
            duration: 1000
        });
        await loading.present();
    }
}
