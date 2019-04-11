import {Component, OnInit} from '@angular/core';
import {Item} from '../models/Item';
import {Coin} from '../models/Coin';
import {ProductsService} from '../services/products.service';
import {CoinsService} from '../services/coins.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(private prodService: ProductsService, private coinService: CoinsService, public router: Router,
                private alert: AlertController, public loading: LoadingController, private storage: Storage) {
    }
    items: Item[];
    coins: Coin[];
    insertedCoins = new Map();
    selectedItemName: string;
    selectedItem: Item;
    fiftyCent = null;
    oneRand = null;
    twoRand = null;
    fiveRand = null;
    credit: number;
    returnCoin = true;

    ngOnInit() {
        this.storage.get('prods').then(prods => this.items = prods);

       this.storage.get('coins').then(coins => this.coins = coins);

    }

    // Logic to handle purchase
    buyItem() {
        this.credit = (this.fiftyCent * 0.5) + (this.oneRand * 1) + (this.twoRand * 2) + (this.fiveRand * 5);
        this.insertedCoins.set('50c Coin', this.fiftyCent);
        this.insertedCoins.set('R1 Coin', this.oneRand);
        this.insertedCoins.set('R2 Coin', this.twoRand);
        this.insertedCoins.set('R5 Coin', this.fiveRand),

            this.selectedItem = this.items.find(x => x.name === this.selectedItemName);
        console.log(this.selectedItem);
        alert('You have selected to buy ' + this.selectedItem.name + ' for R' + this.selectedItem.price);

        if (this.credit < (this.selectedItem.price)) {
            alert('Credit of R' + this.credit + ' less than price of R' + this.selectedItem.price);
            this.returnCoins();
        }

        if (this.selectedItem.count < 1) {
            alert('We dont have the requested item in stock');
            this.returnCoins();
        }
        const cnt = this.selectedItem.count - 1;

        switch (this.selectedItemName.trim()) {
            case 'Chips' :
                this.prodService.updateChips(cnt);
                break;
            case 'Coke' :
                this.prodService.updateCoke(cnt);
                break;
            case 'Lunch Bar' :
                this.prodService.updateLunchBar(cnt);
                break;
            default:
                console.log('Errors');
        }
        const change = this.credit - this.selectedItem.price;
        if (this.credit >= this.selectedItem.price && this.selectedItem.count >= 1) {
            this.giveChange(change, this.credit);
        }
        this.presentAlert();
    }

    giveChange(change: number, credit: number) {
        alert('You inserted R' + credit + ', your change is R' + change);
        this.resetCoins();
    }

    // front end form validation
    isFormValid(): boolean {
        return this.selectedItemName != null;
    }

    resetCoins() {
        this.fiftyCent = 0;
        this.oneRand = 0;
        this.twoRand = 0;
        this.fiveRand = 0;
        this.selectedItemName = null;
    }

    returnCoins() {
        if (this.returnCoin) {
            this.presentLoading();
        }
        this.returnCoin = !this.returnCoin;
    }

    async presentAlert() {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Buy',
            message: 'Success - Please collect your item',
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentLoading() {
        const loading = await this.loading.create({
            message: 'Returning your coins...',
            duration: 1000
        });
        await loading.present();
    }
}
