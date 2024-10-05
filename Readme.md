# FSM Products Management

Welcome to the FSM Products Management repository! This project is designed to manage university products, providing various features for different types of users.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Keycloak Configuration](#keycloak-configuration)
- [License](#license)
- [Contact](#contact)

## Introduction

This project is for managing university products and provides the following features:

- For unauthenticated users:
  - View products
  - Search for products
  - Create an account
- For normal users (students, teachers):
  - All the above features
  - Create a new order
- For admin users:
  - All the above features
  - Manage products (add, update, delete)
  - Manage orders (approve, reject, deliver, or add new order)
  - Manage the inventory (counting the products and the orders)

The project is composed of three main parts:

- Security interface provided by Keycloak server in a Docker container
- Frontend application using Angular
- Backend application using Spring Boot

## Features

- User authentication and authorization
- Product management
- Order management
- Inventory management

## Technologies Used

### Front-End

- Angular
- TypeScript
- HTML/CSS
- Angular Material

### Back-End

- Spring Boot
- Java
- MySQL

### Security

- Keycloak

## Getting Started

### Prerequisites

- Docker
- Docker-compose
- Maven (for building the backend)
- Node.js (for building the frontend)
- Angular CLI (for building the frontend)
- Java 17 (for building the backend)
- Keycloak server (for the security)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo.git
    ```

2. Navigate to the front-end directory and install dependencies:
    ```sh
    cd front_end
    npm install
    ```

3. Navigate to the back-end directory and build the services:
    ```sh
    cd gestion_bien_backend
    mvn clean install
    ```

### Running the Project

#### Front-End

1. Navigate to the front-end directory:
    ```sh
    cd front_end
    ```

2. Start the Angular development server:
    ```sh
    ng serve
    ```

3. Open your browser and go to `http://localhost:4200`.

#### Back-End

1. Navigate to the back-end directory:
    ```sh
    cd gestion_bien_backend
    ```

2. Start the Docker containers:
    ```sh
    docker-compose up
    ```

## Keycloak Configuration

The first thing to do after cloning the project is to configure the Keycloak server. Here are the configuration steps:

1. Create a new realm called `gestion_bien`
   ![keycloak realm](ressources/create_realm.png)

2. Create a new client called `gestion_bien_client` and set the configuration as follows:
   ![keycloak client](ressources/create_client1.png)
   ![keycloak client](ressources/create_client2.png)

3. Create two roles `admin` and `user`:
   ![keycloak roles](ressources/create_roles.png)

4. Create two users `admin` and `user` and assign the roles to them.

5. Configure the realm settings as follows (or as you like):
   ![keycloak realm settings](ressources/realm_settings.png)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to us at [a.akanoun@edu.umi.ac.ma](mailto:a.akanoun@edu.umi.ac.ma).
  