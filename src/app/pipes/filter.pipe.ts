import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) { return value; }
    const resultado = [];
    for (const name of value) {
      if (name.firstName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado.push(name);
      }
    }
    return resultado;
  }

}
