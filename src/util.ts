import { getContext } from '@getcronit/pylon'
import { drizzle } from 'drizzle-orm/node-postgres'

export const getDB = function () {
  const c = getContext()
  const db = drizzle(c.env.DATABASE_URL)
  return db;
}
