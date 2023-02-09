# API_Documentation for Gymster App

## ⬅⬅⬅ End Point ➡➡➡

- `POST /register`
- `POST /login`

- `GET /muscle`
- `GET /exercise`
- `GET /myexercise`
- `POST /myexercise/:exerciseId`
- `DELETE /myexercise/:id`

### 1. POST /register

#### Description

- For register User account

#### REQUEST

- Body

```json
[
    {
        "username"      : String,
        "email"         : String,
        "password"      : String,
        "phoneNumber"   : String,

    }
]
```

#### Response (**_201-Created_** )

```json
{
  "statuscode": 201,
  "message": "User with email <email> has been succesfully registered",
  "data": {
    "id": Integer,
    "email": String,
    "status": String,

  }
}
```

#### Response (_400-Bad Request_)

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
or
{
    "message": "Phone Number is Required"
}
```

&nbsp;

### 2. POST /login

Request:

- body:

```json
{
  "email": string,
  "password": string
}
```

_Response (200 - OK)_

```json
{
  "access_token": string,
  "username": string,
  "role": string
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
  "message": "Incorrect Email or Password"
}
```

&nbsp;

### 3. GET /muscle

#### Description

- Get All Muscle

#### Response (_201-Created_)

```json
[
  {

      "id": Integer,
      "name": String

  }
]
```

&nbsp;

### 4. GET /exercise

#### Description

- Get All Exercise

#### Response (_200-OK_)

```json
{
  "response": {
    "countPage": integer,
    "Exercise": [
      {
        "id": integer,
        "image": string,
        "name": string,
      }
    ]
  }
}
```

&nbsp;

### 5. GET /myexercise

#### Description

- Get My Exercise(Favorite)

#### Request

```json
[
  {
    "id": integer,
    "UserId": integer,
    "ExerciseId": integer,
    "createdAt": string,
    "updatedAt": string,
    "Exercise": {
      "id": integer,
      "image": string,
      "name": string,

    }
  }
]
```

&nbsp;

#### Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

### 6. POST /myexercise/:exerciseId

#### Description

- Get All MyExercise

#### Request

```json
[
    {
        "UserId": integer,
        "ExerciseId" : integer,
    }
]
```

#### Response (**_201-Created_** )

```json
{

    "UserId": Integer,
    "ExerciseId": Integer,

}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

&nbsp;

#### Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

### 7. DELETE /myexercise/:id

#### Description

- Delete MyExercise

#### Request

- Params

```json
[
    {
       "id": Integer
    }
]
```

&nbsp;

#### Global Error

_Response (200 - OK)_

```json
[
    {
        "message": String,
    }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Exercise not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

#### Description

- Delete MyFood

#### Request

```json
[
    {
       "id": Integer
    }
]
```

&nbsp;

#### Global Error

_Response (200 - OK)_

```json
{
  "message": "MyFood has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

#### Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
