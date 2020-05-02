import { Role } from './role';

export interface Medic {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    genero?: string;
    address?: string;
    phone?: string;
    especiality?: string;
    imagePath?: string;
    token?: string;
}
