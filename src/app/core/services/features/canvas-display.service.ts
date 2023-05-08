import { Injectable, inject } from '@angular/core';
import { SliderService } from './slider.service';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasDisplayService {
  private sliderService = inject(SliderService);
  private widthSubject = new Subject<number>();
  private heightSubject = new Subject<number>();

  get width$(): Observable<number> {
    return this.widthSubject.asObservable();
  }
  get height$(): Observable<number> {
    return this.heightSubject.asObservable();
  }
  constructor() {}

  changeSizeFrame() {
    const $sliderH = document.getElementById('heightRange') as HTMLInputElement;
    const $sliderW = document.getElementById('widthRange') as HTMLInputElement;
    const $frameHeight = document.querySelector(
      '.frameHeight'
    ) as HTMLSpanElement;
    const $frameWidth = document.querySelector(
      '.frameWidth'
    ) as HTMLSpanElement;
    const $altarpieceSize = document.querySelector(
      '.altarpiece'
    ) as HTMLElement;
    const $leftFrame = $altarpieceSize.querySelector(
      '.box-container .left-altarpiece'
    ) as HTMLElement;

    const sizeOfConvertion: number = 550;
    let sizePH: number = 100;
    let sizePW: number = 100;
    const frameHeight$: Observable<string> = this.sliderService.frameHeight$;
    const frameWidth$: Observable<string> = this.sliderService.frameWidth$;
    $sliderH.style.setProperty('--value', `${sizePH}`);
    $sliderW.style.setProperty('--value', `${sizePW}`);



    frameHeight$
      .pipe(
        map((value: string) => {
          $sliderH.style.setProperty('--value', value);
          let heightRange = value;
          let hFrame = (sizeOfConvertion * Number(heightRange)) / 100;
          $frameHeight.textContent = '100cm';
          $frameHeight.textContent = `${heightRange}cm`;
          $altarpieceSize.style.height = `${hFrame}px`;
          $leftFrame.style.height = `${hFrame + 46}px`;
          let height = Number(heightRange) / 100;
          this.heightSubject.next(height); //* Emit the new value of height to Subject

        })
      )
      .subscribe();

    frameWidth$
      .pipe(
        map((value: string) => {
          $sliderW.style.setProperty('--value', value);
          let widthRange = value;
          let wFrame = (sizeOfConvertion * Number(widthRange)) / 100;
          $frameWidth.textContent = '100cm';
          $frameWidth.textContent = `${widthRange}cm`;
          $altarpieceSize.style.width = `${wFrame}px`;
          let width = Number(widthRange) / 100;
          this.widthSubject.next(width); // Emit the new value of width to Subject

        })
      )
      .subscribe();
  }
}
