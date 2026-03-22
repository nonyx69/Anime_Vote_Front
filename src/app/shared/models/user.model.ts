import { Profil } from './profil.model';

export interface User {
  id: number;
  email: string;
  pseudo: string;
  roles: string[];
  createdAt: string;
  token?: string;
  profil?: Profil;
}