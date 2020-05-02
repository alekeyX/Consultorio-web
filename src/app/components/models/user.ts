import { Role } from './role';

export class User {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: Role;
    token?: string;
}
