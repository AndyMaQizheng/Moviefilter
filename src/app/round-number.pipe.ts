import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (Number.isNaN(value)) {
      return null;
    }

    return Math.round(value * 1000) / 1000;
  }

}
