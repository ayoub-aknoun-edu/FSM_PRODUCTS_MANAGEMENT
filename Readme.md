# FSM PRODUCTS MANGEMENT

This project is for managing the university products it provides the following features:

- for unauthentocated users:
  - views products
  - search for products
  - create an account
- for normal users (students, teachers):
  - all the above features
  - create a new order
- for admin users:
  - all the above features
  - manage products (add, update, delete)
  - manage orders (approve, reject, deliver or add new order)
  - manage the inventory (couting the products and the orders)

The project composed of 3 main parts:

- Security interface provided by Keycloak server in docker container
- Frontend application using Angular
- Backend application using Spring Boot

