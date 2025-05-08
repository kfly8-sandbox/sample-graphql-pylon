import {app, getContext } from '@getcronit/pylon'

import { User } from './user'

export const graphql = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    world: () => {
      const c = getContext()
      return `Hello, ${c.req.header('USER-AGENT')}`
    },
    users: User.getAll
  },
  Mutation: {}
}

export default app
