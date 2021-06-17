import { Component, OnInit } from '@angular/core';
import { EtherPriceService } from 'src/app/services/ether-price.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ethPairs: any[] = [];
  loading: boolean = false;

  constructor(private etherPriceService: EtherPriceService) {}

  async findPairPrice(event) {
    let { symbol, action } = event;

    this.ethPairs = [];
    this.loading = true;
    if (action === "BUY") {
      this.ethPairs = await this.etherPriceService.getBuyEthPairPrices(symbol);
    } else if (action === "SELL") {
      this.ethPairs = await this.etherPriceService.getSellEthPairPrices(symbol);
    }
    this.loading = false;
    console.log(this.ethPairs);
  }

  ngOnInit(): void {
  }


}
