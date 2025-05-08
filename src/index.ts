import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { asyncContext, getContext, Env } from '@getcronit/pylon'

import { User } from './repo/user'

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

export const graphql = {
  Query: {
    hello: () => {
      const c = getContext()
      return `Hello, ${c.req.header('USER-AGENT')}`
    },
    user: async (id: number) => User.getById(id),
    users: User.getAll,
  },
  Mutation: {}
}

// Turn off playground and viewer for production
// If Pylon is upgraded to v3, then it can disabled by configuration.
// Ref: https://github.com/getcronit/pylon/issues/72
app.get('/graphql', async (c, next) => {
  if (c.env.APP_ENV === 'production') {
    return c.notFound()
  }
  await next()
})

export default app
