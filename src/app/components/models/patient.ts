import { Medic } from './medic';
import { Role } from './role';

export interface Patient {
    _id: string;
    username: string; // nombre
    password: string; // apellido
    firstName: string;
    lastName: string;
    ci: number;
    age?: string;
    role: Role;
    email?: string;
    genero?: string;
    ethnicity?: string;
    maritalStatus?: string;
    ocupation?: string;
    placeBirth?: string;
    address?: string;
    phone?: string;
    imagePath?: string;
    medic_id: Medic[];
    token?: string;
}
