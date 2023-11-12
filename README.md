# Nodejs Mongodb CRUD api

Simple CRUD api made using nodejs, typescript, & mongodb.

## setup

-   clone the repo
-   install dependencies `npm install`
-   create a .env file in the root directory
-   add the following variables to the .env file

```bash
MONGO_URI=<your mongodb uri>
```

-   run the server `npm start`

## API Reference

### Auth

#### login user

```http
  POST /auth/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

---

#### register user

```http
  POST /auth/register
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |
| `username` | `string` | **Required** |

---

### User

#### get all users

```http
  GET /users
```

#### get user by id

```http
  GET /users/:id
```

#### update user by id

```http
  PUT /users/:id
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |

#### delete user by id

```http
  DELETE /users/:id
```
