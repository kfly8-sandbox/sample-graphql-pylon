import {app, getContext } from '@getcronit/pylon'

import { User } from './repo/user'

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
if (process.env.APP_ENV === 'development') {
  app.get('/graphql', async (c) => {
    return c.notFound()
  });
  app.get('/viewer', async (c) => {
    return c.notFound()
  });
}

export default app
