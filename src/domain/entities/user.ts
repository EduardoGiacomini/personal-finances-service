export interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
