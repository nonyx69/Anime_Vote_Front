export interface User {
  id: number;
  email: string;
  pseudo: string;
  roles: string[];
  created_at: string;
  token?: string;
  image_profil?: string;
}