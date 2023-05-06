import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPriceComponent } from './modal-price.component';

describe('ModalPriceComponent', () => {
  let component: ModalPriceComponent;
  let fixture: ComponentFixture<ModalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
