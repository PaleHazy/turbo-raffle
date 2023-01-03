import { request, gql, GraphQLClient } from "graphql-request";
// import { GET_ALL_USERS_QUERYNAME } from "raffle-server/src/resolvers/users.resolver";
import type { User } from "interfaces";

const graphQLClient = new GraphQLClient("http://localhost:3005/graphql", {
  credentials: 'include',
  mode: 'cors',
})

export async function getAllUsers() {
  const query = gql`
    query AllUsers {
      AllUsers {
        id
        email
        password
      }
    }
  `;
  type Response = {
    AllUsers: User[];
  };
  
  const res = await graphQLClient.request<Response>( query );
  return res;
}

export async function deleteUser(userId: number) {
  const query = gql`
    mutation Mutation($userId: Float!) {
      deleteUser(userId: $userId) {
        id
        email
        password
      }
    }
  `;
  //TODO make modular
  const res = await request<User>("http://raffle:3005/graphql", query, { userId });
  return res;
}

export async function createUser(email: string, password: string) {
  const userData = {
    email,
    password,
  };

  const query = gql`
    mutation CreateUser($userData: CreateUserDto!) {
      createUser(userData: $userData) {
        id
        email
        password
      }
    }
  `;
  try {
    const res = await request<User>("http://raffle:3005/graphql", query, { userData });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function loginUser(email: string, password: string) {
  
  



  const userData = {
    email,
    password,
  };

  const query = gql`
    mutation Login($userData: CreateUserDto!) {
      login(userData: $userData) {
        id
        email
        password
      }
    }
  `;
  try {
    const res = await graphQLClient.request<User>(query, { userData, });
    return res;
  } catch (e) {
    console.error(e);
  }
}
