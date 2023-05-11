import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'counter',
  standalone: true,
})
export class CounterPipe implements PipeTransform {
  transform(value: number) {
    if (value <= 9) {
      return `000${value}`;
    } else if (value <= 99) {
      return `00${value}`;
    } else if (value <= 999) {
      return `0${value}`;
    } else {
      return `${value}`;
    }
  }
}
