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

  bee_list_ids_qy: gql`
  query bee_list_qy($cursor: String) {
    bee_list(limit: 231, cursor: $cursor) {
      bees { letters }
      cursor
    }
  }
  `,

  bee_put_mu: gql`
  mutation bee_put_mu($letters: String!, $guesses: [String!], $nogos: [String!], $datestr: String) {
    bee_put(
      letters: $letters, guesses: $guesses, nogos: $nogos, datestr: $datestr
    ) {
      success
      message
      bee { ...bee_frag }
    }
  }
  ${Fragments.bee_frag}
  `,

  bee_del_mu: gql`
  mutation bee_del_mu($letters: String!) {
    bee_del(
      letters: $letters
    ) {
      success
      message
      bee { letters }
    }
  }
  `,
}

export default Ops
