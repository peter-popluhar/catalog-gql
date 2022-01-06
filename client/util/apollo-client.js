import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'

const graphQLServer = typeof window !== 'undefined' ? 'http://localhost:4001/graphql' : 'http://server:4001/graphql'

// @FIXME set headers
const httpLink = new HttpLink({
	uri: graphQLServer,
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

// @ask
//  How to setup cache correctly for SSR, so fresh data are refetch, after item is added?
const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
}

const apolloClient = new ApolloClient({
	ssrMode: true,
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
})

export default apolloClient
