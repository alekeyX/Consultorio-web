import { Role } from './role';

export interface Medic {
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
    image?: File;
    token?: string;
}
