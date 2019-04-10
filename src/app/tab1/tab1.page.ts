import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
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
export class Tab1Page implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, AfterContentInit, AfterContentChecked, OnDestroy  {
  itemColumns: string[] = ['Item', 'Price', 'Count'];
    rows: Item[];
    coinColumns: string[] = ['Denomination', 'Value', 'Count'];
    coins: Coin[];

  constructor(private prodService: ProductsService, private coinService: CoinsService, public loading: LoadingController) {}

  ngOnInit() {
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
    ngDoCheck() {
        console.log('ngDoCheck');
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
            }
        );
    }
    ngAfterContentInit() {
        console.log('ngAfterContentInit');
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
            }
        );
    }
    ngAfterContentChecked() {
        console.log('ngAfterContentChecked');
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
            }
        );
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit');
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
            }
        );
    }
    ngAfterViewChecked() {
        console.log('ngAfterViewChecked');
        this.coinService.getAll().subscribe(res => {
                this.coins = res;
            }
        );
    }

    refreshProducts() {
        this.prodService.getAll().subscribe(res => {
                this.rows = res;
            }
        );
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }

   refreshCoins(event) {
         this.ngAfterViewChecked();
   }

    async presentLoading() {
        const loading = await this.loading.create({
            message: 'Loading your data...',
            duration: 1000
        });
        await loading.present();
    }
}
