import {Component, OnInit} from '@angular/core';
import {Item} from '../models/Item';
import {ProductsService} from '../services/products.service';
import {MatTableDataSource} from '@angular/material';
import {Coin} from '../models/Coin';
import {CoinsService} from '../services/coins.service';

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

  constructor(private prodService: ProductsService, private coinService: CoinsService) {}

  ngOnInit() {
    this.prodService.getAll().subscribe(res => {
      this.rows = res;
      console.log(this.rows);
        }
    );

      this.coinService.getAll().subscribe(res => {
              this.coins = res;
              console.log(this.coins);
          }
      );
  }
}
