import { users } from './schema';
import { eq } from 'drizzle-orm';
import { getDB } from './util';

export class User {
  id: number
  name: string

  constructor(row: { id: number, name: string }) {
    this.id = row.id
    this.name = row.name
  }

  static async getById(id: number): Promise<User | null> {
    const rows = await getDB().select().from(users).where(eq(users.id, id))
    return rows[0] ? new User(rows[0]) : null
  }

  static async getAll(): Promise<User[]> {
    const rows = await getDB().select().from(users)
    return rows.map((row) => new User(row))
  }
}
