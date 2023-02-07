# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Signed Up successfully",
  "data": {
    "id": "integer",
    "email": "string"
  }
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
  "message": "Username is required"
}
OR
{
  "message": "PhoneNumber is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password length minimal 5"
}
```

&nbsp;

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
  "message": "Login Successfully",
  "data": {
    "access_token": "string",
    "id": "integer",
    "username": "string",
    "role": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password are required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Incorrect email or password"
}
```

&nbsp;

## 3. post /google-sign-in

Description:

- Signin aplication with google

Request:

- headers:

```json
{
  "google-auth-token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "user with email <email> has been found",
  "id": "integer",
  "access_token": "string",
  "username": "string",
  "role": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "user with email <email> has been created",
  "id": "integer",
  "access_token": "string",
  "username": "string",
  "role": "string"
}
```

&nbsp;

_Response (404 - Not Found)_

```json
{ "message": "Data Not Found" }
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthenticated)_

```json
{
  "message": "Invalid Token"
}
```
