import { Injectable, inject } from '@angular/core';
import { Observable, Subject, fromEvent, map, take } from 'rxjs';
import { PriceCanvas } from 'src/app/models/price-canvas';
import { CanvasDisplayService } from './canvas-display.service';
import { SliderService } from './slider.service';
import { UploadImageService } from './upload-image.service';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private canvasDisplayService = inject(CanvasDisplayService);
  private sliderService = inject(SliderService);
  private uploadImageService = inject(UploadImageService);

  private valueSubject$ = new Subject<number>();

  get value$(): Observable<number> {
    return this.valueSubject$.asObservable();
  }

  public print: boolean = false;
  readonly canvasPrice: PriceCanvas = {
    height: 1,
    width: 1,
    canvas: 27000,
    print: 460000 | 0,
  };

  constructor() {
    this.height();
    this.width();
    this.printImage();
  }

  height() {
    this.canvasDisplayService.height$.subscribe((height: number) => {
      this.canvasPrice.height = height;
    });
  }
  width() {
    this.canvasDisplayService.width$.subscribe((width: number) => {
      this.canvasPrice.width = width;
    });
  }
  printImage() {
    this.uploadImageService.print$.subscribe((print: boolean) => {
      this.print = print;
    });
  }

  totalPrice(priceCanvas: PriceCanvas) {
    const total =
      (this.canvasPrice.height + this.canvasPrice.width) *
        2 *
        this.canvasPrice.canvas +
      this.canvasPrice.height * this.canvasPrice.width * this.canvasPrice.print;

    this.valueSubject$.next(total);
  }
  price() {
    const $price = document.querySelector('.total-price') as HTMLSpanElement;

    const $priceButton = document.querySelector(
      '.button-price'
    ) as HTMLButtonElement;

    const priceButton$ = fromEvent<MouseEvent>($priceButton, 'click');
    priceButton$
      .pipe(
        take(1),
        map(() => {
          this.print === true
            ? (this.canvasPrice.print = 460000)
            : (this.canvasPrice.print = 0);
          console.log(this.print);
          
          this.totalPrice(this.canvasPrice);
        })
      )
      .subscribe();
  }
}
