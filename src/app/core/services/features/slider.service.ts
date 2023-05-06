import { Injectable } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  public frameHeight$!: Observable<string>;
  public frameWidth$!: Observable<string>;

  constructor() {}

  controlSlider() {
    const $sliderH = document.getElementById('heightRange') as HTMLInputElement;
    const $sliderW = document.getElementById('widthRange') as HTMLInputElement;

    this.frameHeight$ = fromEvent<InputEvent>($sliderH, 'input').pipe(
      map((value) => $sliderH.value)
    );
    this.frameWidth$ = fromEvent<InputEvent>($sliderW, 'input').pipe(
      map((value) => $sliderW.value)
    );
  }
}
