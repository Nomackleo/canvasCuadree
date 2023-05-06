import { Injectable } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';
import { Wall } from 'src/app/models/wall';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  public walls: Wall[] = [
    {
      name: 'Pared_1',
      id: 'wall_1',
      img: './assets/img/wall/pared_1.jpg',
    },
    {
      name: 'Pared_2',
      id: 'wall_2',
      img: './assets/img/wall/pared_2.jpg',
    },
    {
      name: 'Pared_3',
      id: 'wall_3',
      img: './assets/img/wall/pared_3.jpg',
    },
    {
      name: 'Pared_4',
      id: 'wall_4',
      img: './assets/img/wall/pared_4.jpg',
    },
    {
      name: 'Pared_5',
      id: 'wall_5',
      img: './assets/img/wall/pared_5.jpg',
    },
    {
      name: 'Pared_6',
      id: 'wall_6',
      img: './assets/img/wall/pared_6.jpg',
    },
    {
      name: 'Pared_7',
      id: 'wall_7',
      img: './assets/img/wall/pared_7.jpg',
    },
    {
      name: 'Pared_8',
      id: 'wall_8',
      img: './assets/img/wall/pared_8.jpg',
    },
    {
      name: 'Pared_9',
      id: 'wall_9',
      img: './assets/img/wall/pared_9.jpg',
    },
    {
      name: 'Pared_10',
      id: 'wall_10',
      img: './assets/img/wall/pared_10.jpg',
    },
    {
      name: 'Pared_11',
      id: 'wall_11',
      img: './assets/img/wall/pared_11.jpg',
    },
    {
      name: 'Pared_12',
      id: 'wall_12',
      img: './assets/img/wall/pared_12.jpg',
    },
  ];

  constructor() {}
  changeWallTexture(event: Event) {
    const $frame = document.querySelector('.container-frame') as HTMLElement;
    const target = event.target as HTMLElement;
    this.walls.map((wall) => {
      if (target.id !== wall.id) return;
      else $frame.style.backgroundImage = `url(${wall.img})`;
    });
  }

  wallTextures() {
    const $wall = document.querySelector('.wall') as HTMLUListElement;

    const wall$: Observable<any> = fromEvent<MouseEvent>($wall, 'click');
    const wallButton$ = wall$.pipe(map(this.changeWallTexture));
    wallButton$.subscribe();
  }
}
