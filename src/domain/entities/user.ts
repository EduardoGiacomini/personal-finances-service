export interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
