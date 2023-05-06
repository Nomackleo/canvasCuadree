import { Injectable, inject } from '@angular/core';
import { SliderService } from './slider.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasDisplayService {
  private sliderService = inject(SliderService)
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
        map((value:string) => {
          $sliderH.style.setProperty('--value', value);
          let heightRange = value;
          let hFrame = (sizeOfConvertion * Number(heightRange)) / 100;
          $frameHeight.textContent = '100cm';
          $frameHeight.textContent = `${heightRange}cm`;
          $altarpieceSize.style.height = `${hFrame}px`;
          $leftFrame.style.height = `${hFrame + 46}px`;
        })
      )
      .subscribe();

    frameWidth$
      .pipe(
        map((value:string) => {
          $sliderW.style.setProperty('--value', value);
          let widthRange = value;
          let wFrame = (sizeOfConvertion * Number(widthRange)) / 100;
          $frameWidth.textContent = '100cm';
          $frameWidth.textContent = `${widthRange}cm`;
          $altarpieceSize.style.width = `${wFrame}px`;
        })
      )
      .subscribe();
  }
}
