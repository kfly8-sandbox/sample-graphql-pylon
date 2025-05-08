import {app, getContext as c} from '@getcronit/pylon'

import { drizzle } from 'drizzle-orm/node-postgres'
import { users } from './schema';

app.use('/*', async (c, next) => {
  const db = drizzle(c.env.DATABASE_URL)
  c.set('db', db);
  await next()
});

class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  static async getAll(): Promise<User[]> {
    const rows = await c().get('db').select().from(users)
    return rows.map((row) => new User(row.id, row.name))
  }
}

export const graphql = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    world: () => {
      return `Hello, ${c().req.header('USER-AGENT')}`
    },
    users: User.getAll
  },
  Mutation: {}
}

export default app
