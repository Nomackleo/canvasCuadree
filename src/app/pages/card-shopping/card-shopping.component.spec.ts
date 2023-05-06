import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShoppingComponent } from './card-shopping.component';

describe('CardShoppingComponent', () => {
  let component: CardShoppingComponent;
  let fixture: ComponentFixture<CardShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
