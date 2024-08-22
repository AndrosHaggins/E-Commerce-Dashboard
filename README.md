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
- [Project Organization](#project-organization)
- [Design Decisions and Challenges](#design-decisions-and-challenges)
  - [Design Choices](#design-choices)
    - [Modular Architecture](#modular-architecture)
    - [Next.js](#nextjs)
    - [Data Management](#data-management)
    - [Frontend Framework](#frontend-framework)
  - [Challenges Encountered](#challenges-encountered)
    - [Real-Time Data Handling](#real-time-data-handling)
    - [Learning the Mantine Library](#learning-the-mantine-library)
    - [Resolving Recharts Dependency Conflict](#resolving-recharts-dependency-conflict)
    - [Complexity in Project Structure](#complexity-in-project-structure)
- [Project Story](#project-story)  
- [Known Issues](#known-issues)  
- [Reflection and Future Considerations](#reflection-and-future-considerations)


 

## Project Overview

**Ecommerce Dashboard** is a dashboard application designed for an e-commerce store. It provides insights into store performance, including sales data, customer acquisition, inventory levels, and more. This project was created as part of a take-home assignment to demonstrate my ability to build a full-stack web application using modern technologies.

## Features

- **Sales Reports**: Visualize sales data with real-time updates.
- **Customer Acquisition**: Track and analyze customer acquisition sources and trends.
- **Inventory Management**: Monitor inventory levels and changes.
- **Customer Feedback**: View and manage customer feedback.
- **Set your theme**: Allow personalize styling of the application by allowing user to set the theme.
- **Reports page**: Visualize customer acquisition sources and top products. 


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
  - Next.js 
  
- **Deployment**:
  - AWS App Runner

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AndrosHaggins/E-Commerce-Dashboard.git
   cd E-Commerce-Dashboard
   cd dashboard
    
2. **Install Dependencies** 
    ```bash
    npm install --legacy-peer-deps
    ```

    > **Note**: The `--legacy-peer-deps` flag is used to resolve a dependency conflict related to the Mantine chart library. For more details, see the [Resolving Recharts Dependency Conflict](#resolving-recharts-dependency-conflict) section.


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
Once the application is running, you can access the dashboard in your browser. The homepage features a dashboard that provides an overview of key metrics at a glance. On the left, you'll find a togglable sidebar that can be opened by clicking the hamburger icon in the top left corner. This sidebar allows you to navigate between different sections of the application:

- **Dashboard**: Displays key data points and insights in an easy-to-digest format.
- **Reports**: A dedicated page that visualizes data through charts and graphs.
- **Settings**: Allows you to customize your experience, including toggling between light and dark themes.

## Project Organization

The project is organized as follows:

```plaintext
dashboard/
├── app/                          # Main application logic
│   ├── layout.tsx                # Layout component that wraps all pages
│   ├── page.tsx                  # Main entry point for the homepage
│   ├── hooks/                    # Custom hooks for reusable logic
│   └── Reports/                  # Reports page components and logic
├── components/                   # Reusable UI components
├── lib/                          # Library files (e.g., Prisma setup)
├── pages/                        # API routes and page components
│   └── api/                      # API routes for backend logic
├── public/                       # Static assets like images
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions and helpers
└── .next/                        # Next.js build output
```
> **Note**: 
> - `layout.tsx`: The Layout component that wraps around all pages, providing a consistent layout across the application.
> - `page.tsx`: The main entry point for the homepage, rendering the initial view when users visit the root URL.

### Project Story

This project began with a clear goal: to build a dashboard for a business that sells dog toys, enabling them to efficiently track sales, manage inventory, and gather customer feedback. Throughout the development, I focused on delivering a solution that met the business’s needs while also ensuring a positive development and user experience. I selected technologies and design patterns that would make the codebase maintainable and scalable, balancing practical functionality with long-term sustainability. The following is about my design choices, the challenges I encountered and what I have learned.

### Design Decisions and Challenges

#### Design Choices

1. **Project Structure**:
   - **Modular Components**: I adopted a modular approach, breaking down the application into reusable components like `StatusCard`, `SalesLineGraph`, and `DataTable`. This modular structure not only promotes reusability and maintainability but also simplifies testing and future enhancements.
   - **Next.js**: I chose Next.js because it provides a clean, intuitive file-based routing system, which helps keep the project organized and makes navigation and code maintenance easier as the application grows. Next.js allows for server-side rendering and API routes within the same framework, streamlining both frontend and backend development in one cohesive environment. Additionally, if the customer was interested in us building the store front as well NextJS would allow us to have an improved 
   SEO experience which is crucial for e-commerce applications where they would want their products to be ranked highly in search. 
   - **TypeScript**: I used TypeScript throughout the project to add type safety. This helped catch errors during development and made the code easier to maintain and understand, especially as the project grew.



2. **Data Management**:
   - **Server-Side Data Fetching with API Routes**: I used Next.js API routes to handle server-side data fetching, ensuring a clear separation of concerns between the frontend and backend. This approach keeps the frontend components lightweight and focused solely on rendering UI elements.
   - **Custom Hooks for Polling**: To achieve real-time data updates, I implemented custom hooks that poll the server at regular intervals. Although WebSockets could provide more efficient real-time communication, polling was chosen for its simplicity, ease of implementation, and suitability for the project's scale.
   - **Prisma ORM**: Prisma was selected for database interactions due to its type-safe interface, which minimizes the risk of runtime errors and streamlines database queries. This choice also enhanced developer productivity by providing an intuitive API for managing the PostgreSQL database.

3. **Frontend Framework**:
   - **MantineUI**: I opted for MantineUI for building the frontend due to its flexibility and seamless TypeScript integration. This choice allowed for strong typing across the application, reducing potential bugs and ensuring a more reliable codebase.
   - **Responsive Design**: A key focus was ensuring that the dashboard is fully responsive, allowing it to function seamlessly across various devices, from large desktop monitors to mobile phones.



#### Challenges Encountered

1. **Real-Time Data Handling**:
   - **Challenge**: Implementing real-time updates without introducing unnecessary complexity or overloading the server.
   - **Solution**: I opted for a polling strategy using custom hooks rather than WebSockets. This decision was based on the need for simplicity and the fact that the polling approach was sufficient to meet the application's real-time data requirements without adding undue complexity.

2. **Learning the Mantine Library**:
   - **Challenge**: Adapting to the Mantine library, which was new to me, and effectively using it to build the frontend components.
   - **Solution**: To get up to speed, I spent time going through the Mantine documentation and experimented with different components. This helped me understand how to use Mantine effectively with TypeScript and create a responsive UI.


3. **Resolving Recharts Dependency Conflict**:
   - **Challenge**: Encountering a version conflict between the Mantine chart library and Recharts, which caused errors during installation.
   - **Solution**: The Mantine chart library depends on Recharts version 2, but I needed to install the alpha version of Recharts to fix a warning of `Warning: XAxis: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.` This caused a dependency conflict during installation. I resolved this by using the `--legacy-peer-deps` flag with `npm install`, which allowed the installation to proceed despite the conflict.


4. **Complexity in Project Structure**:
   - **Challenge**: Designing a project structure that is scalable and maintainable while remaining easy to navigate.
   - **Solution**: Leveraging the Next.js App Router, I structured the project with a clear hierarchy, making it easier to manage components and pages as the project grows. This approach also simplifies onboarding new developers who may work on the project in the future.

### Known Issues

1. **ARIA Attribute Warning**: 
   - **Description**: When clicking the dropdown to set the theme, a warning appears in the console: "Blocked `aria-hidden` on a `<div>` element because the element that just received focus must not be hidden from assistive technology users."
   - **Cause**: This issue occurs due to the interaction between Mantine's dropdown and button components (`Menu`, `UnstyledButton`, `Group`) and their use of the `aria-hidden` attribute. Since these are core Mantine components, this behavior is tied to how Mantine handles accessibility.
   - **Impact**: The warning does not affect the functionality of the theme switcher, but it could potentially impact the accessibility of the application.
   - **Potential Fix**: While this behavior originates from the Mantine library itself, I will monitor Mantine’s issue tracker or community discussions for potential updates or fixes. Additionally, I could consider customizing these components or handling focus management manually if accessibility becomes a critical concern.



### Reflection and Future Considerations

**Reflection**: This project was a valuable learning experience, particularly in balancing simplicity with functionality. While polling was chosen over WebSockets for real-time data updates, I now have a deeper understanding of the trade-offs involved. Given more time or in a production environment, I would explore implementing WebSockets to enhance the efficiency of data handling. Additionally, in my api calls I would verify the method (GET, POST, etc.) since this application is a read only application there was no reason to check the method but as we get into writing data all my api routes would need to check method. 

**Future Considerations**: If I were to continue developing this project, I would consider implementing more advanced features, such as user authentication, role-based access control. Additionally I would implement openai api to perform sentiment analysis and provide a summary for each product based off of the reviews left for the products. These enhancements would provide additional value to the dashboard and make it more suitable for a real-world e-commerce environment. I would also explore optimizing the backend by integrating caching mechanisms to further improve performance and reduce the load on the database.
