import { Role } from './role';

export interface Patient {
    _id: string;
    username: string; // nombre
    password: string; // apellido
    firstName: string;
    lastName: string;
    ci: number;
    age: number;
    role: Role;
    email?: string;
    genero?: string;
    ethnicity?: string;
    maritalStatus?: string;
    ocupation?: string;
    placeBirth?: string;
    address: string;
    phone?: string;
    medic_id: string;
    imagePath?: string;
    token?: string;
}
