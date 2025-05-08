import { db } from './util'
import { users } from './schema';

export class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  static async getAll(): Promise<User[]> {
    const rows = await db().select().from(users)
    return rows.map((row) => new User(row.id, row.name))
  }
}
