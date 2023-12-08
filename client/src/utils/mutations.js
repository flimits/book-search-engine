import {gql } from '@apollo/client';

export const CREATE_USER = gpl`
mutation CreateUser($username: String!,$email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
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

export const LOGIN_USER = gql`
mutation LoginUser($email: ID!, $password: String!) {
    loginUser(email: $email, password: $password) {
        user {
            _id
            username
          }
    }
}

`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}

`;

export const DELETE_BOOK = gql`
mutation DeleteBook($userId: ID!, $bookId: String!) {
    deleteBook(userId: $userId, bookId: $bookId) {
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