import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect } from "react"
import Head from "next/head"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"
import Navbar from "../components/Navbar"
import { SessionProvider } from "next-auth/react"
import Cookies from "js-cookie"
import { setContext } from "@apollo/client/link/context"
import { createNetworkStatusNotifier } from "react-apollo-network-status"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier()
const GlobalLoadingIndicator = () => {
  const status = useApolloNetworkStatus()
  if (status.numPendingQueries > 0) {
    Nprogress.start()
  } else {
    Nprogress.done()
  }
}

const linkUri = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URI}/graphql`,
  credentials: "include",
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("accessToken")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link.concat(authLink.concat(linkUri)),
})

const _app = ({ Component, pageProps: { session, ...pageProps } }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return (
    <>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>student book</title>
          </Head>
          <GlobalLoadingIndicator />
          <Navbar />
          <div className="my-5 container">
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

export default _app
