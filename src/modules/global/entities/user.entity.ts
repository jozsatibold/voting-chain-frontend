export interface User {
  name: string;
  picture?: string;
  email: string;
  birthDate?: number;
  sex?: 'F' | 'M';
  pin?: string;
  id?: number;
  role?: string;
}
