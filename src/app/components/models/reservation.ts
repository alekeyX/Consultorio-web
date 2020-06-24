import { Time } from '@angular/common';

// export interface Reservation {
//     _id: string;
//     datesAvailable: {
//         day: [string];
//         available: string;
//     };
    // hoursAvailable: {
    //     hour: string;
    //     available: string;
    // };
    // reserv: {
    //     patient_id: string;
    //     day: Date;
    //     hour: Date;
    // };
    // enable: boolean;
    // medic_id: string;
// }

export interface Reservation {
    days: string;
    dateStart: string;
    dateEnd: string;
    hours: Time;
    patient_id: string;
    enable: boolean;
    medic_id: string;
}
// export interface Reservation {
//     day: [string];
//     horas: [{
//         hour: Time;
//         patient_id: string;
//     }];
//     enable: boolean;
//     medic_id: string;
//     patient_id: string;
// }
