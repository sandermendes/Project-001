# Project

**Golang-Gorm-Postgres-Gqlgen-Graphql-gRPC** is a project showcasing the implementation of a system using various technologies and frameworks.

## Technologies Used

1. **DevContainer**: Provides a consistent and reproducible development environment.
2. **Gorm**: A powerful Go ORM framework for simplifying database interactions and enabling efficient data access.
3. **Postgres**: An open-source, scalable, and reliable relational database management system.
4. **Gqlgen**: A Go library that simplifies the development of GraphQL servers by automatically generating code based on the GraphQL schema.
5. **GraphQL**: A modern query language and runtime for APIs, enabling efficient and flexible data retrieval.
6. **gRPC**: A high-performance, language-agnostic framework for building distributed systems with efficient communication.
7. **Protobuf**: A language-agnostic data serialization format for structured data communication.
<br/>
<br/>
---
## Buy me a coffee
<br/>
Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee, so I can dedicate more time on open-source projects like this :)

<a href="https://www.buymeacoffee.com/sandermendes" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
<br/>
<br/>

## Project structure
![Sander Mendes App Project-001](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Project-001-2023-07-6-0945.png)

## Architecture Overview

The project consists of the following components:

1. **GraphQL Service**: Acts as an entry point for receiving GraphQL requests from clients. It handles incoming requests and forwards them to the appropriate resolver functions for processing.

2. **Account Service**: Serves as an intermediary between the GraphQL service and the User service. It handles account-related functionality, such as authentication, authorization, and account management.

3. **User Service**: Responsible for managing user-specific operations. It handles user-related business logic, such as user creation, retrieval, updates, and deletion. The User service interacts with the database to perform these operations.

4. **Database**: Stores user information and provides persistent storage for the system. The User service interacts with the database to store and retrieve user data.

The data flow starts with a GraphQL request coming into the GraphQL service. The request is then forwarded to the Account service, which handles authentication and authorization. Once authenticated and authorized, the Account service communicates with the User service to perform user-related operations. The User service interacts with the database to store or retrieve user data as needed. The response follows the reverse path, with the User service providing the response to the Account service, which returns the response to the GraphQL service for final delivery to the client.

## Generating Protobuf Files

To generate Protobuf files, run the following command if there have been changes in the *.proto files:
```
$ ./generate-protobufs.sh
```
Note: Run this command inside the devcontainer terminal.

## Generating GraphQL Schema Files

To generate/regenerate GraphQL files, run the following command if there have been changes in the schema.graphql file:
```
$ ./generate-graphql.sh
```
Note: Run this command inside the devcontainer terminal.

## Public GraphQL Server

The main GraphQL server can be accessed at: [http://localhost:8080/](http://localhost:8080/)

## Adminer

Adminer, a database management tool, can be accessed at: [http://localhost:8088/](http://localhost:8088/)

## Redis Commander

Redis Commander, a Redis management tool, can be accessed at: [http://localhost:8081/](http://localhost:8081/)

To get started, run the following command:
```
$ docker-compose up -d --build
```
Note: Run this command in host terminal.
This command will start the necessary services and set up the environment inside a Docker container.

## GraphQL Service Test ::TODO::

## Account Service Test ::TODO::

## User Service Test
![User Service Test](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Screenshot%20from%202023-06-29%2019-47-16.png)

Feel free to explore the code and make any improvements or modifications to suit your needs!