import { InMemoryCache,
}                       from '@apollo/client'

const Cache = new InMemoryCache({
  typePolicies: {
    Bee: { keyFields: ['letters'] },
  },
})

export default Cache
