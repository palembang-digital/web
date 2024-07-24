# Local Development Guide

Welcome to the local development guide for Palembang Digital website. This document will walk you through setting up your development environment to ensure a smooth and efficient workflow. Please follow the steps below to get started.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js v20**: Our project requires Node.js version 20. If you don't have it installed, you can download it from [the official Node.js website](https://nodejs.org/).

2. **Docker (optional)**: Docker is used for running our project's databases containers. It's optional but highly recommended for a consistent development environment. Download Docker from [the Docker website](https://www.docker.com/get-started).

3. **IDE (preferably, VS Code)**: We recommend using Visual Studio Code (VS Code) as the Integrated Development Environment (IDE) for this project. It offers excellent support for Node.js and Docker. Download it from [the VS Code website](https://code.visualstudio.com/).

## Local Database Setup with Docker (Optional)

If you choose to use Docker for running the database locally, follow these steps:

1. **Install Docker**: If you haven't already, install Docker on your machine as mentioned in the prerequisites.

2. **Run Docker Compose**: Navigate to the root directory of the project in your terminal and run the following command to start the database container:

   ```bash
   docker compose up
   ```

   This command reads the `compose.yml` file in the root directory and starts the database service defined in it.

## Populate Environment Variables

For local development, we use a `.env.local` file to store environment variables. Follow these steps to set up your environment variables:

1. **Generate `.env.local` File**: Copy the contents from `.env.local.example` to a new file named `.env.local` in the root directory of your project. This example file contains template environment variables that you'll need to replace with actual values for your local development setup.

2. **Edit Environment Variables**: Open the `.env.local` file in your IDE and replace the placeholder values with your actual local development values. This may include database connection strings, API keys, and other necessary configurations.

## Install Project Dependencies

Before you can run the service, you need to install the project dependencies. Open your terminal, navigate to the project's root directory, and run the following command:

```bash
npm install
```

This command will install all the dependencies listed in the `package.json` file. It's essential to do this step before attempting to start the service to ensure all necessary libraries and tools are available.

## Database Migration

To ensure your local database schema is up to date, you'll need to run database migrations. This project uses a migration tool to manage database changes. Follow these steps to run migrations:

1. **Ensure the Database Service is Running**: If you're using Docker to run your database, make sure the database container is up and running as described in the "Local Database Setup with Docker" section.

2. **Run Migrations**: Execute the migration command to update your local database schema. The specific command may vary depending on the migration tool used in the project. For many Node.js projects, it might look something like this:

```bash
npm run db:generate
npm run db:migrate
```

This command will apply all pending migrations to your local database, ensuring it matches the expected schema for the project.

## Running The Service

After completing the above steps, your local development environment should be set up and ready to go. You can now start the development server, typically with a command like `npm start`, depending on the project setup.

For any additional setup or troubleshooting help, please refer to the project's README file, create GitHub issue, or contact the project maintainers.
