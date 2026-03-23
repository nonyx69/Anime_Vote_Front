import { Profil } from './profil.model';

export type User_Role = 'ROLE_USER' | 'ROLE_ADMIN';

export interface User {
  id: number;
  email: string;
  pseudo: string;
  roles: User_Role[];
  createdAt: string;
  token?: string;
  profil?: Profil;
}