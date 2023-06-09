import { Injectable, inject } from '@angular/core';
import { UploadImageService } from './upload-image.service';
import { SliderService } from './slider.service';
import { PriceService } from './price.service';
import { Subject, combineLatest, map } from 'rxjs';
import { Bill } from 'src/app/models/bill';
import { CanvasDisplayService } from './canvas-display.service';
import { ColorFrame } from 'src/app/models/color';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private uploadImageService = inject(UploadImageService);
  private sliderService = inject(SliderService);
  private priceService = inject(PriceService);
  private canvasDisplayService = inject(CanvasDisplayService)

  // private kindOfFrameSubject = new Subject<Frames | undefined>();
  // frameName$ = this.kindOfFrameSubject.asObservable(); //* Observable for cath the kind of frame

  private colorCanvasSubject = new Subject<ColorFrame>();
  colorCanvas$ = this.colorCanvasSubject.asObservable(); //* Observable for cath the color canvas

  private dataBillSubject = new Subject<Bill>();
  dataBill$ = this.dataBillSubject.asObservable();
  //*Observable for cath the color passepartout
  
  dataBill: Bill = {
    print: 'No',
  canvas: 'Morado|  |',
    size: '100 X 100',
    value: 0,
  };

  getPrint() {
    this.uploadImageService.print$
      .pipe(
        map((print) => {
          if (print === true) {
            return (this.dataBill.print = 'Si');
          } else {
            return (this.dataBill.print = 'No');
          }
        })
      )
      .subscribe();
  }

  getColorCanvas(colorCanvas: ColorFrame) {
    this.colorCanvasSubject.next(colorCanvas);
  }

  getColor() {
    return this.colorCanvas$.pipe(
      map((colorCanvas) => this.dataBill.canvas = colorCanvas!.color)
    ).subscribe()
  }
  

  getSize() {
    return combineLatest([
      this.canvasDisplayService.height$,
      this.canvasDisplayService.width$,
    ])
      .pipe(
        map(([height, width]) => {
          return (this.dataBill.size = `${Math.floor(
            height * 100
          )} x ${Math.floor(width * 100)}`);
        })
      )
      .subscribe();
  }

  
  getPrice() {
    this.priceService.price();
    return this.priceService.value$
      .pipe(map((price: number) => (this.dataBill.value = Math.ceil(price))))
      .subscribe();
  }

  bills() {
    this.getPrint();
    this.getColor();
    this.getSize();
    this.getPrice();
    return this.dataBillSubject.next(this.dataBill);
  }
}
