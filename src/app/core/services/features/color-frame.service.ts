import { Injectable } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';
import { ColorFrame } from 'src/app/models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorFrameService {
  public colorFrames: ColorFrame[] = [
    {
      name: 'amarillo_brillante',
      id: 'rab',
      img: './assets/img/retablos/amarillo_brillante.png',
      color: 'yellow',
    },
    {
      name: 'amarillo_calido',
      id: 'rac',
      img: './assets/img/retablos/amarillo_calido.png',
      color: 'goldenrod',
    },
    {
      name: 'azul_oscuro',
      id: 'rao',
      img: './assets/img/retablos/azul_oscuro.png',
      color: 'darkblue',
    },
    {
      name: 'azul',
      id: 'ra',
      img: './assets/img/retablos/azul.png',
      color: 'blue',
    },
    {
      name: 'bermellon',
      id: 'rb',
      img: './assets/img/retablos/bermellon.png',
      color: 'orangered',
    },
    {
      name: 'blanco',
      id: 'rw',
      img: './assets/img/retablos/blanco.png',
      color: 'white',
    },
    {
      name: 'cafe',
      id: 'rc',
      img: './assets/img/retablos/cafe.png',
      color: 'saddlebrown',
    },
    {
      name: 'gris',
      id: 'rg',
      img: './assets/img/retablos/gris.png',
      color: 'silver',
    },
    {
      name: 'morado',
      id: 'rm',
      img: './assets/img/retablos/morado.png',
      color: 'darkviolet',
    },
    {
      name: 'negro',
      id: 'rn',
      img: './assets/img/retablos/negro.png',
      color: 'balck',
    },
    {
      name: 'ocre',
      id: 'ro',
      img: './assets/img/retablos/ocre.png',
      color: 'gold',
    },
    {
      name: 'rojo',
      id: 'rr',
      img: './assets/img/retablos/rojo.png',
      color: 'red',
    },
    {
      name: 'verde_aguamarina',
      id: 'rva',
      img: './assets/img/retablos/verde_aguamarina.png',
      color: 'mediumturquoise',
    },
    {
      name: 'verde_menta',
      id: 'rvm',
      img: './assets/img/retablos/verde_menta.png',
      color: 'aquamarine',
    },
    {
      name: 'violeta',
      id: 'rv',
      img: './assets/img/retablos/violeta.png',
      color: 'fuchsia',
    },
  ];

  constructor() {}

  colors(event: Event) {
    const $altarpieceSize = document.querySelector(
      '.altarpiece'
    ) as HTMLElement;
    const $leftFrame = $altarpieceSize.querySelector(
      '.box-container .left-altarpiece'
    ) as HTMLElement;
    const target = event.target as HTMLElement;
    const targetId = target.getAttribute('data-colorFrame');
    this.colorFrames.map((color) => {
      if (targetId !== color.id) return;
      else $leftFrame.style.backgroundImage = `url(${color.img})`;
    });
  }

  changeColorFrame() {
    const $colorFrame = document.querySelector('.bastidor') as HTMLUListElement;

    const colorFrame$: Observable<MouseEvent> = fromEvent<MouseEvent>(
      $colorFrame,
      'click'
    );
    const colorButton = colorFrame$
      .pipe(map((event:MouseEvent) => this.colors(event)))
      .subscribe();
  }
}
