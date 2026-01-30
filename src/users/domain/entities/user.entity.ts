import { User, Session } from 'generated/prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  sessions?: Session[];
  createdAt: Date;
  updatedAt: Date;
}
