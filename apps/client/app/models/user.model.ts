export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export type NewUser = Omit<User, '_id'>;
