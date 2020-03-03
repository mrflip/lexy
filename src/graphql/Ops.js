import gql          from 'graphql-tag'

const Fragments = {
  bee_frag: gql`
    fragment bee_frag on Bee {
      letters, guesses, nogos, __typename
    }
  `,
}

const Ops = {
  bee_get_qy: gql`
  query bee_get_qy($letters: String!) {
    bee_get(letters: $letters) {
      success
      message
      bee { ...bee_frag }
    }
  }
  ${Fragments.bee_frag}
  `,

  bee_list_qy: gql`
  query bee_list_qy($cursor: String) {
    bee_list(limit: 200, cursor: $cursor) {
      bees { ...bee_frag }
      cursor
    }
  }
  ${Fragments.bee_frag}
  `,

  bee_put_mu: gql`
  mutation bee_put_mu($letters: String!, $guesses: [String!]) {
    bee_put(
      letters: $letters, guesses: $guesses, nogos: [],
    ) {
      success
      message
      bee { ...bee_frag }
    }
  }
  ${Fragments.bee_frag}
  `,

  bee_del_mu: gql`
  mutation bee_put_mu($letters: String!, $guesses: [String!]) {
    bee_put(
      letters: $letters, guesses: $guesses, nogos: [],
    ) {
      success
      message
      bee { ...bee_frag }
    }
  }
  ${Fragments.bee_frag}
  `,
}

export default Ops
