# MegaBlog: A Full-Stack Blogging Platform

MegaBlog is a modern, full-stack blogging application built with React and powered by Appwrite as the backend-as-a-service. This project demonstrates how to build a feature-rich, real-time content platform with user authentication, post management, file storage, and a rich text editor.

This application is part of the "Chai aur React" learning series, showcasing best practices for building scalable web applications with a modern tech stack.

*(Suggestion: Replace this line with a screenshot of your application's home page or a post page)*


## ✨ Features

-   **User Authentication**: Secure user sign-up and login functionality using Appwrite's auth service.
-   **Post Management (CRUD)**: Authenticated users can create, read, update, and delete their own blog posts.
-   **Rich Text Editing**: Uses **TinyMCE** to provide a powerful WYSIWYG editor for creating and formatting blog posts.
-   **File Storage**: Seamless image uploads and management for post-featured images, handled by Appwrite Storage.
-   **Responsive Design**: A clean, modern, and responsive UI built with Tailwind CSS.
-   **Centralized State Management**: Utilizes Redux Toolkit for efficient and predictable state management across the application.
-   **Protected Routes**: Ensures that only authenticated users can access certain pages, like creating or editing a post.
-   **Real-time Database**: Leverages Appwrite's real-time capabilities to keep the UI in sync.

## 🛠️ Tech Stack

-   **Frontend**:
    -   **React**: A JavaScript library for building user interfaces.
    -   **React Router**: For declarative routing in the application.
    -   **Redux Toolkit**: For efficient and robust state management.
    -   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    -   **TinyMCE React**: A rich text editor component for creating post content.
    -   **html-react-parser**: To safely parse and render HTML content from the editor.

-   **Backend (BaaS)**:
    -   **Appwrite**: An open-source, self-hostable backend-as-a-service platform that provides authentication, databases, storage, and more.

-   **Build Tool**:
    -   **Vite**: A next-generation frontend tooling that provides a faster and leaner development experience.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or higher)
-   npm or yarn
-   An Appwrite instance (You can use [Appwrite Cloud](https://cloud.appwrite.io/) or self-host it)

### 1. Set up Appwrite

1.  **Create an Appwrite Project**:
    -   Go to your Appwrite console and create a new project.
    -   Note the **Project ID** and the **API Endpoint URL**.

2.  **Create a Web Platform**:
    -   In your Appwrite project, navigate to **Platforms** and add a new **Web** platform.
    -   Register your hostname (e.g., `localhost` for local development).

3.  **Set up Authentication**:
    -   Enable the **Email/Password** login method under the **Auth** section.

4.  **Create a Database and Collection**:
    -   Go to the **Databases** section and create a new database. Note the **Database ID**.
    -   Inside the database, create a collection named `posts` (or similar). Note the **Collection ID**.
    -   Define the following attributes for your collection:
        -   `title` (string, required)
        -   `content` (string, required)
        -   `featuredImage` (string, required)
        -   `status` (string, required)
        -   `userId` (string, required)
    -   Configure the collection's **Permissions** to allow authenticated users to create, read, update, and delete documents.

5.  **Create a Storage Bucket**:
    -   Go to the **Storage** section and create a new bucket.
    -   Note the **Bucket ID**.
    -   Configure the bucket's **Permissions** to allow authenticated users to create, read, and delete files.

### 2. Frontend Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/12MegaBlog.git
    cd 12MegaBlog
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create an environment file**:
    -   Create a `.env` file in the root of the project.
    -   Add your Appwrite configuration details to it. The variable names must start with `VITE_` as required by Vite.

    ```env
    VITE_APPWRITE_URL="<YOUR_APPWRITE_API_ENDPOINT>"
    VITE_APPWRITE_PROJECT_ID="<YOUR_APPWRITE_PROJECT_ID>"
    VITE_APPWRITE_DATABASE_ID="<YOUR_APPWRITE_DATABASE_ID>"
    VITE_APPWRITE_COLLECTION_ID="<YOUR_POSTS_COLLECTION_ID>"
    VITE_APPWRITE_BUCKET_ID="<YOUR_STORAGE_BUCKET_ID>"
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should now be running on `http://localhost:5173`.

## 💡 How It Works

-   **Configuration (`/src/appwrite/config.js`)**: This file centralizes all interactions with the Appwrite SDK. It exports a service class that handles all CRUD operations for posts and file storage.
-   **Authentication (`/src/appwrite/auth.js`)**: Manages user authentication states (login, logout, signup) and session handling.
-   **State Management (`/src/store/authSlice.js`)**: The Redux slice `authSlice` keeps track of the user's authentication status and user data, making it accessible throughout the component tree.
-   **Components (`/src/components`)**: Reusable UI components like `Button`, `Input`, `Container`, and `PostCard` are kept here for a modular and maintainable codebase.
-   **Pages (`/src/pages`)**: Each route in the application corresponds to a component in this directory (e.g., `Home.jsx`, `Post.jsx`, `AllPosts.jsx`).
-   **Routing (`/src/main.jsx`)**: React Router is configured here to define the application's routes, including protected routes that require authentication.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

