import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], pattern: string, prop: string): any[] {
    if (!pattern) {
      return array;
    }
    const filtered = [];
    for (const item of array) {
      if (new RegExp(pattern, 'i').test(prop ? item[prop] : item)) {
        filtered.push(item);
      }
    }
    return filtered;
  }

}
