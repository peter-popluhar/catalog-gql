import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client'
import { onError } from "@apollo/client/link/error";

const localGraphQLServer = 'http://localhost:4001/graphql'

const httpLink = new HttpLink({
	uri: localGraphQLServer,
})

const errorLink = onError(({graphQLErrors, networkError}) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({message, locations, path}) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		)

	if (networkError) console.log(`[Network error]: ${networkError}`)
})

const apolloClient = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
})

export default apolloClient
