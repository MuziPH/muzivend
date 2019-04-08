import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../models/Item';
import {ProductsService} from '../services/products.service';
import {Coin} from '../models/Coin';
import {CoinsService} from '../services/coins.service';
import {IonRefresher, LoadingController} from '@ionic/angular';

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

  constructor(private prodService: ProductsService, private coinService: CoinsService, public loading: LoadingController) {
      this.presentLoading();
      this.prodService.getAll().subscribe(res => {
              this.rows = res;
          }
      );

      this.coinService.getAll().subscribe(res => {
              this.coins = res;
          }
      );
  }

  ngOnInit() {
      /*this.presentLoading();
    this.prodService.getAll().subscribe(res => {
      this.rows = res;
        }
    );

      this.coinService.getAll().subscribe(res => {
              this.coins = res;
          }
      );*/
  }

    refreshProducts() {
        this.prodService.getAll().subscribe(res => {
                this.rows = res;
            }
        );
    }

   refreshCoins(event) {
          this.coinService.getAll().subscribe(res => this.coins = res);
           event.target.complete();
   }

    async presentLoading() {
        const loading = await this.loading.create({
            message: 'Loading your data...',
            duration: 1000
        });
        await loading.present();
    }
}
