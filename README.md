# Task Manager

Backend for Task Manager application that is developed in Typescript using NodeJS and ExpressJS. MongoDB is used as the database. 

## Services:

- [x] Authentication service
- [x] Task management service

## Features:

This project has several features -

- use Typescript for making it easier to read and debug
- build robust authentication flow
- handle errors and present different types of errors
- create, read, update and delete task from MongoDB Atlas
- show different entities using query on documents
- use Test Driven approach for effective and sustainable code 
- write production-ready code following best practices

## API Reference:

- auth

| Route                     | Method        | Body                                | Purpose                        |
|:-------------------------:|:-------------:|:-----------------------------------:|:------------------------------:|
| /api/v1/users/signup      | POST          | { email: string, password: string } | Sign up for an account         |
| /api/v1/users/signin      | POST          | { email: string, password: string } | Sign in to an existing account |
| /api/v1/users/signout     | POST          | { }                                 | Sign out                       |
| /api/v1/users/currentuser | GET           | -                                   | Returns info about the user    |

---

- tasks

| Route                     | Method        | Body                                                                           | Purpose                               |
|:-------------------------:|:-------------:|:------------------------------------------------------------------------------:|:-------------------------------------:|
| /api/v1/tasks             | POST          | { title: string, description?: string, startTime: string, finishTime: string } | Create a new task                     |
| /api/v1/tasks             | GET           | -                                                                              | Returns all the tasks created by user |
| /api/v1/tasks/:id         | GET           | -                                                                              | Returns a single task                 |
| /api/v1/tasks/:id         | PATCH         | { title?: string, description?: string, startTime?: string, finishTime?: string, done?: boolean } | Update the task    |
| /api/v1/tasks/:id         | DELETE        | -                                                                              | Delete the task                       |

---

- index

| Route                     | Method        | Body                                | Purpose                                                  |
|:-------------------------:|:-------------:|:-----------------------------------:|:--------------------------------------------------------:|
| /api/v1/backlog           | GET           | -                                   | Returns the tasks that are missed                        |
| /api/v1/progress          | GET           | -                                   | Returns the tasks that are in progress                   |
| /api/v1/done/latest       | GET           | -                                   | Returns the tasks that are done in last 7 days           |
| /api/v1/done              | GET           | -                                   | Returns the tasks that are completed                     |
| /api/v1/assigned          | GET           | -                                   | Returns the tasks that are assigned                      |
| /api/v1/search            | POST          | { input: string }                   | Returns the tasks that matches the input with task title |


## Running the project:

- Clone the repository using `git clone https://github.com/thecodexhub/task-manager.git`.
- Create a new file named .env in the `root` directory and add variables specified in `.env.sample`.
- Install the node modules using `npm install`.
- Run the app using `npm start`.
- Run all the tests using `npm run test`.

## [License: MIT](LICENSE)
