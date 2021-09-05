import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], args: string, arg: boolean): any {

    if (args && arg) {
      return value.sort((elementA: any, elementB: any) =>
        elementA[args].localeCompare(elementB[args]));
    } else {
      if (args && !arg) {
        return value.sort((elementA: any, elementB: any) =>
          elementB[args].localeCompare(elementA[args]));
      }
      return value;
    }
  }
}
