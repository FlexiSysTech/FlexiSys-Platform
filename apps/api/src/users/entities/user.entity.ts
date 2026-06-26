import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
  id!: string;

  username!: string;

  fullName!: string;

  email!: string;

  role!: string;

  isActive!: boolean;

  createdAt!: Date;

  updatedAt!: Date;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}