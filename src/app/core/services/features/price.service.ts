import { Injectable, inject } from '@angular/core';
import { SliderService } from './slider.service';
import { CurrencyPipe } from '@angular/common';
import { Observable, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private sliderService = inject(SliderService);
  private currencyPipe = inject(CurrencyPipe);
  
  public height: number = 1;
  public width: number = 1;
  public print: number = 460000;
  public formattedPrice!: string | null;

  constructor() {}

  price() {
    const $price = document.querySelector('.total-price') as HTMLSpanElement;

    const frameHeight$: Observable<string> = this.sliderService.frameHeight$;
    const frameWidth$: Observable<string> = this.sliderService.frameWidth$;

    frameHeight$
      .pipe(map((height) => (this.height = Number(height) / 100)))
      .subscribe();
    frameWidth$
      .pipe(map((width) => (this.width = Number(width) / 100)))
      .subscribe();
    const $priceButton = document.querySelector(
      '.button-price'
    ) as HTMLButtonElement;

    const priceButton$ = fromEvent<MouseEvent>($priceButton, 'click');
    priceButton$
      .pipe(
        map(() => {
          const price = this.height * this.width * this.print;
          const formattedPrice = this.currencyPipe.transform(price, 'COP');
          $price.textContent = formattedPrice;
        })
      )
      .subscribe();
  }
}
