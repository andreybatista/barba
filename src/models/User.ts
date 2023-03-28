import { RowDataPacket } from 'mysql';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}
