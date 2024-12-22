# Moi Class Test

This is a simple Node.js application built with TypeScript, Express, and PostgreSQL. The app uses Knex.js for querying the database.

## Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://npmjs.com/) (Node package manager)
- [PostgreSQL](https://www.postgresql.org/) for database

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://your-repository-url.git
   cd moi-class-test
2. Install dependencies
   ```bash
   npm install

3. Set up the environment variables:

DB_CLIENT=pg
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
NODE_ENV=development
INCLUDE_STACKTRACE=false
SERVER_PORT=3000

4. Build and Start APP in One Command
   ```bash
   npm run start:build
