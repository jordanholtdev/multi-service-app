## API

This is an API built using Node.js and the Express framework. It serves as a basic backend for a multi-service application which was built to learn about multi-service architecture and container management.

### Features

- Reverse Proxy Using Nginx
- Application-level logging using `winston`
- HTTP request logging using `morgan`
- Basic API rate limiting
- Basic client ID authentication

## Project Structure

```
├── /api
      ├── /src
         ├── /models                    # Mongoose models for the database.
         ├── /routes                    # API routes
         ├── /utils                     # Mongoose models for the database.
         ├── app.js                     # Application entry
         ├── config.js                  # Application config - env config
      ├── tests
         ├── __tests__                  # Test cases
         ├── jest.config.js
      ├── nginx                         # Reverse proxy
         ├── Dockerfile
         ├── nginx.conf
      ├── .env.development              # Dev environment variables
      ├── .env.production               # Prod environemnt variables
      ├── .docker-compose.dev.yml
      ├── .docker-compose.prod.yml
      ├── .docker-compose.yml           # Base docker-compose
      ├── .Dockerfile.dev
      ├── .Dockerfile.prod
      ├── .prettierrc
      ├── .prettierignore
      ├── eslint.config.mjs
      ├── package.json
```

## Running the application

1. `cd api/`
2. use docker-compose to build and start the container
   - dev: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`
   - prod: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build`
3. The API will be available at `http://localhost:3000`.

## Running tests

run tests: `npx jest`

## v1 API Calls

### Books

List all books:

```sh
curl -X GET http://localhost:80/v1/books \
-H "x-client-id: YOUR_CLIENT_ID"
```

Create a book:

| Field    | Type   | Description                                                 |
| -------- | ------ | ----------------------------------------------------------- |
| title    | string | The title of the book                                       |
| author   | string | The author of the book                                      |
| isbn     | string | The ISBN number                                             |
| rating   | number | The rating of the book                                      |
| category | string | The category of the book                                    |
| Method   | string | POST                                                        |
| Headers  | object | Content-Type: application/json, x-client-id: YOUR_CLIENT_ID |

```sh
curl -X POST http://localhost:80/v1/books/ -H "Content-Type: application/json" -d '{"title": "Book Title", "author": "Author", "isbn": "1234567890", "rating": 4, "category": "Book Category"}' -H "x-client-id: YOUR_CLIENT_ID"
```
