import { Diagnostic } from "./diagnostic";
import { Exam } from "./exam";
import { Patient } from "./patient";

export interface History {
    _id: string;
    medic: string;
    motivoConsulta: string;
    enfermedadActual: string;
    antecedentesPersonales: string;
    antecedentesFamiliares: string;
    age: number;
    habitosToxicos: string;
    // Examen fisico
    peso: string;
    altura: string;
    talla: string;
    FC: string;
    FR: string;
    temperatura: string;
    impresionGeneral: string;
    constitucion: string;
    facies: string;
    actitud: string;
    decubito: string;
    marcha: string;

    patient_id: Patient;
    exam_id: Exam;
    diagnostic_id: Diagnostic;
    createdAt: Date;
    updatedAt: Date;
}
