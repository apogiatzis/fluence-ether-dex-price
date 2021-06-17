import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pair-selector',
  templateUrl: './pair-selector.component.html',
  styleUrls: ['./pair-selector.component.scss']
})
export class PairSelectorComponent implements OnInit {

  @Output() findClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFindClicked(event, symbol, action) {
    this.findClicked.emit({symbol: symbol, action: action});
  }
}
