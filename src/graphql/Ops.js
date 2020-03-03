import gql          from 'graphql-tag'

const Ops = {
  bee_get_qy: gql`
    query bee_get_qy($letters: String!) {
      bee_get(letters: $letters) {
        letters
        guesses
        nogos
        datestr
      }
    }
  `,

  bee_list_qy: gql`
    query blist($cursor: String) {
      bee_list(limit: 200, cursor: $cursor) {
        bees {
          letters, datestr, guesses, nogos
        }
        cursor
      }
    }
  `,

  bee_put_mu: gql`
    mutation bee_put_mu($letters: String!, $guesses: [String!]) {
      bee_put(
        letters: $letters, guesses: $guesses, nogos: [],
      ) {
        success
        message
        bee { letters, guesses, nogos }
      }
    }
  `,

  bee_del_mu: gql`
    mutation bee_put_mu($letters: String!, $guesses: [String!]) {
      bee_put(
        letters: $letters, guesses: $guesses, nogos: [],
      ) {
        success
        message
        bee { letters, guesses, nogos }
      }
    }
  `,
}

export default Ops
