# Multi-Service App

This is a multi-service application consisting of three main components: `api`, `db`, and `frontend`. Each component is managed separately and has its own configuration for linting, formatting, and dependencies.

The infrasture for this project is defined in a separate repository.

## Project Structure

```
project-root/
   ├── /api             # Express API
   ├── /db              # Mongodb configuration
   ├── /frontend        # React frontend code
```

## Getting Started

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/jordanholtdev/multi-service-app.git
   cd multi-service-app
   ```

2. Install dependencies for each component:

```
cd api
npm install
```

## Running the Application

1. Start the corresponding services:
   - See the API README for details
   - See the db README for details
   - See the frontend README for details
