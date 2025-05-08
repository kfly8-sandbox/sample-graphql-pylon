import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'

import { asyncContext, getContext, Env } from '@getcronit/pylon'
import { drizzle } from 'drizzle-orm/node-postgres'

export const getDB = function () {
  const c = getContext()
  const db = drizzle(c.env.DATABASE_URL)
  return db;
}

export const createApp = function () {

  const app = new Hono<Env>()
  app.use(logger())
  app.use(requestId())

  // Save the request context in the async context
  app.use('*', async (c, next) => {
    return new Promise((resolve, reject) => {
      asyncContext.run(c, async () => {
        try {
          resolve(await next())
        } catch (error) {
          reject(error)
        }
      })
    })
  })

  // Turn off playground and viewer for production
  // If Pylon is upgraded to v3, then it can disabled by configuration.
  // Ref: https://github.com/getcronit/pylon/issues/72
  app.get('/graphql', async (c, next) => {
    if (c.env.APP_ENV === 'production') {
      return c.notFound()
    }
    await next()
  })

  return app;
}
