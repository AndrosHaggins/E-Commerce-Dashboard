# Ecommerce Dashboard

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Full Stack](#full-stack)
  - [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Running in Development Mode](#running-in-development-mode)
- [Building and Running in Production](#building-and-running-in-production)
- [Usage](#usage)
- [Design Decisions and Challenges](#design-decisions-and-challenges)
  - [Design Choices](#design-choices)
  - [Challenges Encountered](#challenges-encountered)

## Project Overview

**Ecommerce Dashboard** is a dashboard application designed for an e-commerce store. It provides comprehensive insights into store performance, including sales data, customer acquisition, inventory levels, and more. This project was created as part of a take-home assignment to demonstrate my ability to build a full-stack web application using modern technologies.

## Features

- **Sales Reports**: Visualize sales data with real-time updates.
- **Customer Acquisition**: Track and analyze customer acquisition sources and trends.
- **Inventory Management**: Monitor inventory levels and changes.
- **Customer Feedback**: View and manage customer feedback.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - MantineUI
  - Tabler Icons

- **Backend**:
  - Node.js
  - PostgreSQL

- **Full Stack**:
  - Next.js (using the App Router)
  
- **Deployment**:
  - AWS App Runner

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd dashboard
    
2. **Install Dependencies** 
    ```bash
   npm install --legacy-peer-deps

3. **Set up the environment** 
- Create a .env file in the root directory (dashboard/).
- Add any required environment variables, such as database connection strings.

## Running in Development mode

1. **Start the deployment server** 
    ```bash
    npm run dev

2. **Access the application:** 
Open your browser and navigate to http://localhost:3000.

## Building and Running in Production

1. **Build the project** 
    ```bash
    npm run build

2. **Start the application** 
    ```bash
    npm run start
    
## Usage
Once the application is running, you can access the dashboard in your browser. The dashboard provides insights and reports on various aspects of the e-commerce store.


### Design Decisions and Challenges

#### Design Choices

1. **Project Structure**:
   - **Modular Components**: The project is structured into modular components, each responsible for a specific part of the dashboard (e.g., `StatusCard`, `SalesLineGraph`, `DataTable`). This modularity enhances reusability and maintainability.
   - **App Router in Next.js**: The App Router was used to organize the project, leveraging its file-based routing system. This choice allows for a clean and intuitive structure, making it easier to navigate between different parts of the application.

2. **Data Fetching**:
   - **API Routes**: I used Next.js API routes to handle data fetching on the server side. This keeps the data fetching logic isolated from the frontend components, ensuring a clear separation of concerns.
   - **Custom Hooks for Polling**: To handle real-time updates, I implemented custom hooks that poll the server at regular intervals. This approach ensures that the dashboard remains up-to-date without the need for more complex WebSocket implementations.
   - **Prisma ORM**: Prisma was used for database interactions with PostgreSQL. It provides a type-safe way to interact with the database, reducing the likelihood of errors and improving the developer experience.

3. **Frontend Framework**:
   - **MantineUI**: Chosen for its flexibility, MantineUI was used to build the UI components. Its integration with TypeScript allowed for strong typing throughout the project, leading to fewer runtime errors and more predictable behavior.
   - **Responsive Design**: The dashboard is designed to be responsive, ensuring it works well on various screen sizes, from desktop monitors to mobile devices.

#### Challenges Encountered

1. **Real-Time Data Handling**:
   - **Challenge**: Implementing real-time updates without overwhelming the server or client.
   - **Solution**: Instead of using WebSockets, which can be overkill for this application, I opted for a polling strategy using custom hooks. This approach balances simplicity with the need for up-to-date information.

2. **Project Structure Complexity**:
   - **Challenge**: Organizing the project in a way that is both scalable and easy to understand.
   - **Solution**: The use of Next.js App Router allowed for a clean and logical organization of pages and components, making it easier to manage as the project grows.

3. **Database Schema Design**:
   - **Challenge**: Ensuring the database schema supports the features of the dashboard without becoming overly complex.
   - **Solution**: I used UUIDs for primary keys to ensure uniqueness across tables and implemented relationships that reflect the business logic of an e-commerce platform (e.g., orders linked to customers and products).
