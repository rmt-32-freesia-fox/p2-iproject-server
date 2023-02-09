## Endpoints

List of Available Endpoints:

- POST /users/register
- POST /users/login
- POST /users/google-login
- GET /api/dota2
- GET /api/dota2Team
- GET /api/dota2/:team_id

-POST /generate-midtrans-token

### 1. POST /users/register

### Description

- Register for user admin to database

Request :

- Body

```
{
    "username": "string"
    "email": "string",
    "password": "string",
}
```

- Response :

Respon 201 - (Created)

```

{
    "message": "Success created user",
    "id": number,
    "email": "string"
}
```

- Respon 400 - (Bad Request)

```
{
    "message": [
        <error>
        <error>
        <error>
    ]
}
```

### 2. POST /users/login

#### Description

- Login for user admin to database

Request :

```
{
    "email": "string",
    "password": "string",
}
```

- Response :

Respon 200 - (OK)

```
{
    "message": "Success Login!",
    "access_token": "string"
}
```

- Respon 401 - (Unauthorized)

```
{
    "message": "error invalid username or email or password"
}
```

### 3. GET /api/dota2

#### Description

- Get all the DOTA2 API data Players

Request :

- Headers

```
{
    "access_token": "string"
}
```

```
{
    "access_token": "string"
}
```

Response

- _200 - OK_

      ```
      {
      "dota2": [
          <players>
          <players>
          <players>
      ]

  }

  ```

  ```

### 4. GET /api/dota2Team

#### Description

- Get all the DOTA2 API data Team

Request :

- Headers

```
{
    "access_token": "string"
}
```

```
{
    "access_token": "string"
}
```

Response

- _200 - OK_

      ```
      {
      "dota2": [
          <team>
          <team>
          <team>
      ]

  }

  ```

  ```

  ### 5. GET /api/dota2/:team_id

#### Description

- Get all the DOTA2 API data Team By Id

Request :

- Headers

```
{
    "access_token": "string"
}
```

```
{
    "access_token": "string"
}
```

Response

- _200 - OK_

      ```
      {
      "dota2": [
          <team>
      ]

  }

  ```

  ```
