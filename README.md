# Task Management App Documentation

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [Dockerfile](#dockerfile)
  - [Docker Compose](#docker-compose)
- [Running the Application](#running-the-application)
- [RBAC Implementation](#rbac-implementation)
- [Drag and Drop Boards](#drag-and-drop-boards)
- [User Management](#user-management)
- [Environment Variables](#environment-variables)

## Introduction

This documentation provides a guide to setting up and running a Task Management application built with React and Vite. The application allows users to manage their tasks with features such as drag and drop boards and user management. Role-Based Access Control (RBAC) is implemented to manage different user permissions.

## Features

- Add to-do lists
- Drag and drop boards
- User management for admin
- Role-Based Access Control (RBAC)

## Project Structure

The project structure is as follows:

```
task-management-app
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   ├── lib
│   │   ├── routes
│   │   ├── plugins
│   │   ├── types
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.html
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── setupTests.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
```

## Prerequisites

- Node.js
- yarn
- Docker
- Docker Compose

## Setup and Installation

### Docker Compose

To build the Docker image, run the following command:

```bash
docker compose up --build
```

To run the Docker container, run the following command:

```bash
docker compose up
```

The application will be accessible at `http://localhost:3000` or based on your desire port that you setup with the docker.

## Running the Application

To run the application, execute the following command:

```bash
yarn

yarn build

yarn preview
```

## RBAC Implementation

Role-Based Access Control (RBAC) is implemented in the application. The roles are as follows:

- Admin
- User

The admin role has full access to the application, while the user role has limited access.

## Drag and Drop Boards

The application allows users to create boards and drag and drop tasks between boards.

## User Management

The application has a user management feature that allows the admin to manage users.

## Environment Variables

The application uses environment variables to manage configurations. The environment variables are stored in a `.env` file.

```
REACT_APP_API_URL=
EXPOSED_PORT=
```

The `REACT_APP_API_URL` variable is used to set the API URL, while the `EXPOSED_PORT` variable is used to set the port number.

```
```


