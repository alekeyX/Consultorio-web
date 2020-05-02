import { Role } from './role';

export interface Patient {
    id: number;
    username: string; // nombre
    password: string; // apellido
    firstName: string;
    lastName: string;
    role: Role;
    genero: string;
    date: string;
    email?: string;
    address: string;
    phone: string;
    image?: File;
    token?: string;
}
