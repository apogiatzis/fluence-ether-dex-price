import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FluenceCurlService } from './fluence-curl.service';

@Injectable({
  providedIn: 'root'
})
export class EtherPriceService {
  private _timeout: number = 15000;

  constructor(private fluenceService: FluenceCurlService) {

  }

  _sellPriceCompare(pair1, pair2) {
    if (!pair2.totalPrice || (pair1.totalPrice > pair2.totalPrice))
      return pair1
    return pair2
  }

  _buyPriceCompare(pair1, pair2) {
    if (!(pair2.totalPrice) || (pair1.totalPrice < pair2.totalPrice))
      return pair1
    return pair2
  }

  getExchangeImage(name) {
    switch (name) {
      case "Switcheo":
        return "switcheo.png"
      case "Uniswap":
        return "uniswap.png"
      case "Bamboo Relay":
        return "bamboorelay.png"
      case "Kyber":
        return "kyber.png"
      case "Eth2Dai":
        return "eth2dai.png"
      case "Ethfinex":
        return "ethfinex.png"
      case "Bancor":
        return "bancor.png"
      case "IDEX":
        return "idex.png"
      case "DDEX":
        return "ddex.png"
      case "Radar Relay":
        return "radarrelay.png"
      case "Saturn Network":
        return "saturn.png"
      case "AirSwap":
        return "airswap.png"
      case "Forkdelta":
        return "forkdelta.png"
      default:
        break;
    }
  }

  addBaselinePrice(pairs, fnCompare, prefix = "", postfix = " %") {
      const bestPricePair = pairs.reduce((a, b) => fnCompare(a, b));
      return pairs.map((pair) => {
        if (pair.totalPrice) {
          const percentageIncrease = 100 / (bestPricePair.totalPrice / pair.totalPrice);
          if (percentageIncrease === 100) {
            pair.baseline = "Best";
          } else {
            pair.baseline =  prefix + percentageIncrease.toFixed(2) + postfix
          }
        } else {
          pair.baseline = "N/A";
        }
        return pair;
      })
  }

  async getSellEthPairPrices(symbol: string) {
    const pairs = JSON.parse(
      await this.fluenceService.getRequest(`https://ethereum-dex-prices-service.production.airswap.io/sell?amount=1&symbol=${symbol}&decimals=`, this._timeout)
    ).map((pair => {
      let unwrapedPair: any = Object.values(pair)[0];
      unwrapedPair.action = "SELL";
      unwrapedPair.image = this.getExchangeImage(unwrapedPair.exchangeName);
      return unwrapedPair;
    }));
    return this.addBaselinePrice(pairs, this._sellPriceCompare, "-");
  }

  async getBuyEthPairPrices(symbol: string) {
    const pairs = JSON.parse(
      await this.fluenceService.getRequest(`https://ethereum-dex-prices-service.production.airswap.io/buy?amount=1&symbol=${symbol}&decimals=`, this._timeout)
    ).map((pair => {
      let unwrapedPair: any = Object.values(pair)[0];
      unwrapedPair.action = "BUY";
      unwrapedPair.image = this.getExchangeImage(unwrapedPair.exchangeName);
      return unwrapedPair;
    }));
    return this.addBaselinePrice(pairs, this._buyPriceCompare, "+");
  }
}
