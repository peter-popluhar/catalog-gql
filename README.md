# Catalog (GQL version)

This is refactoring of old REST API version of [Catalog](https://github.com/peter-popluhar/catalog) to GQL Apollo Server/Client

Catalog is a POC web app, for administration of products, based on Next.js and GQL server.

Exist in two languages:
- Primary - English
- Secondary - Swahili (for future plans to expand in Africa)

### Consitst of these pages:

* Login page -  helps to keep only authorized users to use Catalog. After login (user must enter correct credentials), the user is redirected to the main page.
* All Items - list of all articles available in Catalog.
* Item - full editable detail of article
* Add Item - form for adding a new article to Catalog


## Technologies:
### Client:
* Apollo Client
* Next.js
* React.js, react hooks, context api
* TypeScript
* Css modules
* Scss
* Jest, react testing library, hooks testing library
* Prettier, eslint

https://catalog-gql-apollo-client.vercel.app/

### Server:
* Apollo Server
* MongoDB (atlas cloud)

https://catalog-gql-apollo-server.vercel.app/graphql

### Hosting/deployment:
* Github
* Vercel

### Local development
An enviroment variables are needed, in order to connect to database

### Trello
https://trello.com/b/lVSLlkEE/catalogue-gql

### Architecture
https://excalidraw.com/

