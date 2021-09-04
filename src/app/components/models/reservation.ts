import { Time } from '@angular/common';
import { Medic } from './medic';
import { Patient } from './patient';

export interface Reservation {
    _id: string;
    days: string;
    dateStart: string;
    dateEnd: string;
    date: string;
    hours: Time;
    enable: boolean;
    patient_id: Patient;
    medic_id: Medic;

}
