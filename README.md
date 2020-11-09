# news-feed

The news feed API allows authenticated users to retrieve news or to create news item if they have the proper authorization. CI is integrated into the repository by using Travis CI.

## Table of content

- [Prerequisites](#Prerequisites)
- [How to run](#How-to-run)
- [Usage](#Usage)
    - [1. Create News Item](#1.-Create-News-Item)
    - [2. Retrieve News](#2.-Retrieve-News)
- [How to run tests](#How-to-run-tests)
- [Techologies](#Techologies)
- [Author](#Author)
- [License](#License)
- [Link](#link)


## Prerequisites

- Make sure that you have Node.js and npm installed.
- Set environment variables:

- Create a .env file in the project root directory:

```bash
 touch .env
```

- Add MongoDB and Express variables:

```
PROTOCOL=mongodb+srv:
DB_USERNAME=your_db_user
DB_PASSWORD=_your_db_password
DB_HOSTNAME=your_mongo_cluster
DB_NAME=your_db_name
DB_REMOTE=your_mongo_connection_string
```

- A seed file is provided in order to create tests users for using the API which can be found on

- transpile the src code

```
npm run transpile
```

- run seed file

```
node src/bin/seed.js
```

## How to run

```
npm i
```

This will install all the required libraries and dependencies

```
npm run dev
```

## Usage

### **1. Create News Item**

Allows the creation of a news item

- **URL**

`POST /news`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **Data Params**

```
title=[string]
headline=[string]
content=[string]
image=[string]
date=[string] format YYYY/MM/dd
```

**Optional:**

```
image=[string] image url`
quotation=[string]
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```
{
    "_id": "5fa8811a16acd8517e2560dd",
    "title": "test3",
    "headline": "test3",
    "content": "test3",
    "image": "test3",
    "date": "2020-10-06T00:00:00.000Z",
    "author": "5fa07908c11f664b7d0cbb83",
    "__v": 0
}
```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ Invalid Credentials }`

  OR

  - **Code:** 404 BAD_REQUEST <br />
    **Content:** `{ Invalid request missing data }`

- **Sample Call:**

```
curl --location --request POST 'http://localhost:3000/api/news' \
--header 'Authorization: Basic QWRtaW46ERWRtaW4xFjM=' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "title4",
    "headline":"test4",
    "content":"test4",
    "image":"test4",
    "date":"2020-10-06"
}'
```

### **2. Retrieve News**

Retrieves news

- **URL**

`GET /news?page=1&limit=10`

- **Security**

`Http Basic Auth`

- **Headers**

`Authorization: base64 encoded username:password`

- **URL Params**

```
page=[integer]
limit=[integer]
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```
[
    {
        "_id": "5fa4e93561162f1452b78d68",
        "title": "nuevo",
        "headline": "nuevo",
        "content": "nuevo",
        "image": "nuevo",
        "author": {
            "role": "ADMIN",
            "_id": "5fa07908c11f664b7d0cbb83",
            "username": "Admin",
            "createdAt": "2020-11-02T21:24:24.155Z",
            "updatedAt": "2020-11-02T21:24:24.155Z",
            "__v": 0
        },
        "date": "2020-11-06T06:12:05.331Z",
        "__v": 0
    },
    {
        "_id": "5fa81c96a5db1421df9cdb6f",
        "title": "test",
        "headline": "test",
        "content": "test",
        "image": "test",
        "date": "2020-08-09T22:00:00.000Z",
        "author": {
            "role": "ADMIN",
            "_id": "5fa07908c11f664b7d0cbb83",
            "username": "Admin",
            "createdAt": "2020-11-02T21:24:24.155Z",
            "updatedAt": "2020-11-02T21:24:24.155Z",
            "__v": 0
        },
        "__v": 0
    }
]
```

- **Error Response:**

  - Code: 401 UNAUTHORIZED <br />
    Content:`{ Invalid Credentials }`

  OR

  - Code: 404 BAD_REQUEST <br />
    Content: `{ Invalid request missing data }`

- **Sample Call:**

```
curl --location --request GET 'http://localhost:3000/api/news?page=1&limit=10' \
--header 'Authorization: Basic QWRtaW46QWRtaW4xMjM='
}'
```

## How to run tests

```
npm run tests
```

## Techologies

- [Node](https://nodejs.org/es/) - Is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/es/) - Web Applications
  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [Babel](https://babeljs.io/) -Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.
- [MongoDB](https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era
- [Jest](https://jestjs.io/) - Jest is a JavaScript testing framework.
- [node-mocks-http](https://github.com/howardabrams/node-mocks-http/) - Mocks Express http objects for testing routes.

### Additional Tools
- [Project Management](https://github.com/features/project-management/) - You can manage your work on GitHub by creating issues to track ideas, enhancements, tasks, or bugs.
- [Travis](https://travis-ci.com/) - Is a Continuous integration platform that supports the development process by automatically building and testing code changes, providing immediate feedback on the success of the change.
- [Postman](https://www.postman.com/) - Postman is a collaboration platform for API development.
- [Mongoose](https://mongoosejs.com/) - The mongodb node.js driver in charge of providing elegant mongodb object modeling for node.js

## Author

- **Dayan Rojas**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Link

[Project board - News Content Feed](https://github.com/users/Dayanro/projects/2/)