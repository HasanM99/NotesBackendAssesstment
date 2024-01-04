# Backend Notes Assessment

This project is a RESTful API for note-taking. It uses Express.js as the framework and MongoDB as the database. It includes authentication, rate limiting, request throttling, and search functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`

## Running the tests

Run the tests with `npm test`.

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.

## Built With

- Express.js - The web framework used
- MongoDB - The database used
- Mongoose - MongoDB object modeling tool
- jsonwebtoken - Used to generate JWTs
- bcrypt - Used for password hashing
- express-rate-limit - Used for rate limiting

## Authors

- Hasan Mahmoud
