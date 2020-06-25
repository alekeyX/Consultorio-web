import { Time } from '@angular/common';

export interface Reservation {
    _id: string;
    days: string;
    dateStart: string;
    dateEnd: string;
    date: string;
    hours: Time;
    patient_id: string;
    enable: boolean;
    medic_id: string;
}
