import React from "react";
import ReactDOM from "react-dom";
import "./styles/output.css";
import App from "./components/App";
import { HashRouter } from "react-router-dom";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import Queries from "./graphql/queries";
// import Mutations from "./graphql/mutations";

import './styles/output.css';

const {CURRENT_USER} = Queries;
// const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const httpLink = createHttpLink({
  uri: "http://localhost:1662/graphql",
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  resolvers: {},
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const token = localStorage.getItem("auth-token");
cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUser: null,
    cart: []
  }
});



if (token) {
  const currentUser = client.query({query: CURRENT_USER, variables: {token}});
  client
    .mutate({ mutation: CURRENT_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
          data: {
            isLoggedIn: data.currentUser.loggedIn,
            currentUser: Object.assign(currentUser, {__typename: "user"}),
            cart: []
          }
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
