import { Component } from '@angular/core';
import {CoinsService} from '../services/coins.service';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    chipsCount: number;
    cokeCount: number;
    lunchbarCount: number;

    fiftyCentCount: number;
    oneRandCount: number;
    twoRandCount: number;
    fiveRandCount: number;

    constructor(private coinService: CoinsService, private prodService: ProductsService) {}

    addItems() {
        this.prodService.loadItems(this.chipsCount, this.cokeCount, this.lunchbarCount);
    }

    loadCoins() {
        this.coinService.loadCoins(this.fiftyCentCount, this.oneRandCount, this.twoRandCount, this.fiveRandCount);
    }

}
