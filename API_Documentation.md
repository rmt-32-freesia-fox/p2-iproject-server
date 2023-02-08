# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /books`
- `GET /books/:id`
- `GET /mybooks`
- `POST /mybooks/:id`
- `POST /translate`
- `GET /convert`
- `GET /searchbook`
- `POST /generate-midtrans-token`
- `GET /send-email`


&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```


## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```


## 3. GET /books

Description:
- Get all books from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "imageUrl": "string",
        "title": "string",
        "author": "string",
        "publisher": "string",
        "price": "string",
        "review": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ...,
]
```


## 4. GET /books/:id

Description:
- Get books from database based on its ID

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
        "id": "integer",
        "imageUrl": "string",
        "title": "string",
        "author": "string",
        "publisher": "string",
        "price": "string",
        "review": "text",
        "createdAt": "date",
        "updatedAt": "date"
}
```
_Response (404 - Bad Request)_

```json
{
  "message": "Books with ID:_ is not found"
}
```


## 5. GET /mybooks

Description:
- Get all my books from user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "UserId": "integer",
        "BookId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "Book": {
            "id": "integer",
            "imageUrl": "string",
            "title": "string",
            "author": "string",
            "publisher": "string",
            "price": "string",
            "review": "test",
            "createdAt": "date",
            "updatedAt": "date"
    }
  },
  ...
]
```


## 6. POST /mybooks/:id

Description:
- Add book to MyBook page

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
    "UserId": "integer",
    "BookId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```


## 7. POST /translate

Description:
- Translate words/sentence using 3rd party API

Request:

- params:

```json
{
"translate": "string" 
}
```

_Response (200 - Created)_

```json
{
    "data": "string"
}
```


## 8. GET /convert

Description:
- Convert currency using 3rd party API

Request:

- params:

```json
{
"have": "USD",
"want": "IDR",
"amount": "integer"
}
```

_Response (201 - OK)_

```json
{
    "data": "integer"
}
```


## 9. GET /searchbook

Description:
- Search and get trivia about books & author using 3rd party API

Request:

- params:

```json
{
"search": "string" 
}
```

_Response (201 - OK)_

```json
{
    "data": "object"
}
```


## 10. GET /generate-midtrans-token

Description:
- Get token from Midtrans for authentication payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - OK)_

```json
{
    "token": "string",
    "redirect_url": "string"
}
```


## 11. GET /send-email

Description:
- Send email from NodeMailer

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - OK)_

```json
"string""
```


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```