import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpace'
})
export class AddSpacePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return (<string[]>value).join(', ');
  }

}
