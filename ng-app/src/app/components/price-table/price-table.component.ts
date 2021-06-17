import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss']
})
export class PriceTableComponent implements OnInit {

  @Input() ethPairs: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
