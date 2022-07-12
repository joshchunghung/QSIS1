import gql from 'graphql-tag'
export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password1: String! 
        $password2: String!
        ){register(   
            username:$username,
            email:$email,
            password1:$password1,
            password2:$password2
        ){
        success,
        errors
        }
}`

export const LOGIN_USER = gql`
mutation tokenAuth($password: String! $email: String!) {
  tokenAuth(password: $password email: $email) {
    token
    success
    errors
    user {
      username
    }
    refreshToken
  }
}
`
