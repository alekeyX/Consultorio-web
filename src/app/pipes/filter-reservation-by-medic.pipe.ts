import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReservationByMedic'
})
export class FilterReservationByMedicPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') { return value; }
    const resultado = [];
    for (const data of value) {
      if (data.medic_id._id.indexOf(arg) > -1 ) {
        resultado.push(data);
      }
    }
    return resultado;
  }
}
