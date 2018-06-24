import { Query } from './Query/Query'
import Mutations from './Mutation';
import { Subscription } from './Subscription'
import { AuthPayload } from './AuthPayload'
import { User } from './Query/User'

export default {
  Query,
  Mutation: {
    ...Mutations,
  },
  Subscription,
  AuthPayload,
  User,
}
