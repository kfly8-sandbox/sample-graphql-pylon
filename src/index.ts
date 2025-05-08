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

export default app
