import {app, getContext} from '@getcronit/pylon'

import { drizzle } from 'drizzle-orm/node-postgres'
import { users } from './schema';

class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  static async getAll(): Promise<User[]> {
    const c = getContext()
    const db = drizzle(c.env.DATABASE_URL)
    const rows = await db.select().from(users)
    return rows.map((row) => new User(row.id, row.name))
  }
}

export const graphql = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    world: () => {
      const c = getContext()
      return `Hello, ${c.req.header('USER-AGENT')}`
    },
    users: User.getAll,
  },
  Mutation: {}
}

app.get('/users', async(c) => {
  const users = await User.getAll()
  return c.json(users)
})

export default app
