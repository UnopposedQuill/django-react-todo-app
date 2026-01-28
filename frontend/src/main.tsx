import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8000/graphql/', // Your Django GraphQL endpoint
    }),
    cache: new InMemoryCache(),
});


let rootElement = document.getElementById('root');

if (!rootElement) {
    console.error('No root element found!')
}
else {
    createRoot(rootElement).render(
        <ApolloProvider client={apolloClient}>
            <StrictMode>
                <App/>
            </StrictMode>
        </ApolloProvider>,
    )
}
