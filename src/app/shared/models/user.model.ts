export interface User {
  id: number;
  email: string;
  pseudo: string;
  roles: string[];
  created_at: string;
  token?: string;
}


//ng generate service core/services/anime