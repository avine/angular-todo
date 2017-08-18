import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], prop: string, order = 'asc'): any[] {
    const x = order === 'asc' ? 1 : -1;
    return array.sort((a, b) => (a[prop] - b[prop]) * x);
  }

}
