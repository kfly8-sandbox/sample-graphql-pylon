import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  const rows = await db.select().from(users)
  console.log(rows);
}

main();
