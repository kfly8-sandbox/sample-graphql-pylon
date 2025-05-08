import '@getcronit/pylon'

import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

declare module '@getcronit/pylon' {
  interface Bindings {
    DATABASE_URL: string
  }

  interface Variables {
    db: NodePgDatabase
  }
}
