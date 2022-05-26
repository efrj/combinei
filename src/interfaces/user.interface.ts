export interface UserInterface {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
