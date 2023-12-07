import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;
