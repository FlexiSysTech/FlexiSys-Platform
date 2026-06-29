import { UserStatus } from '@prisma/client';

export class UserEntity {
  id!: string;

  username!: string;

  email!: string;

  fullName!: string;

  phone!: string | null;

  avatar!: string | null;

  status!: UserStatus;

  roles!: string[];

  permissions!: string[];

  lastLoginAt!: Date | null;

  passwordChangedAt!: Date | null;

  createdAt!: Date;

  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}