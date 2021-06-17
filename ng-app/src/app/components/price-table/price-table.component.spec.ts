import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTableComponent } from './price-table.component';

describe('PriceTableComponent', () => {
  let component: PriceTableComponent;
  let fixture: ComponentFixture<PriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
