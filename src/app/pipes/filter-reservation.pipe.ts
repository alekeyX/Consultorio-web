import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReservation'
})
export class FilterReservationPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') { return value; }
    const resultado = [];
    for (const data of value) {
      if (data.date.indexOf(arg) > -1 ) {
        resultado.push(data);
      }
    }
    return resultado;
  }

}
