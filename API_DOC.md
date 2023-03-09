## Endpoints

List of Available admin or staff Endpoints:
- `POST /register`
- `POST /login`
- `post /google-login`
- `GET /movies/`
- `GET /movie/:id`

- `PATCH /update_status/:id`
- `POST /generate-midtrans/:id`
- `GET /order/:movieId`

### POST /register
#### Description
- Registration User

#### Request
- Body
```json
{
    "username": String,
    "email": String,
    "password": String,
}
```
#### Response (201-Created)

```json
{
  "statuscode": 201,
  "data": {
    "id": Integer,
    "email": String,
    "username": String
  }
}
```

#### Response (400-Bad Request)

```json
{
  "message": "Username is Required"
}
or
{
    "message": "Email is Required"
}
or
{
    "message": "Password is Required"
}
```

### Global Error

### Response (500 - Internal Server Error)

```json

{
  "message": "Internal server error"
}
```

### POST /login

#### Description
- Login User

#### Request
- Body
```json
{
    "email": String,
    "password": String
}
```
### Response (200 - OK)

```json
{
  "access_token": string,
  "email": string
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Email or Password"
}
```
### Global Error

### Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### POST /login google

#### Description
- Login User menggunakan akun google

### Response (200 - OK)

```json
{
  "access_token": string,
  "email": string
}
```

### Global Error

### Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
### GET /movies
#### Description
- Get all the movies data

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "data": [
        {
          "id": string,
          "title": String,
          "rank": String,
          "price": Integer,
          "imgUrl": String,
          "authorId": Integer,
          "categoryId": Integer,
          "createdAt": Date,
          "updatedAt": Date
        },
        ...
      ]
    }
    ```

### Global Error

### Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

