# 👨‍🎓API_documentation_for_mCourse

## ⏬⏬⏬List End Point⏬⏬⏬

- `POST /register`

🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽

<b>1. POST /register</b>

### Description

- For register new user in mCourse

### Request

- Body

```json
{
    "username":String,
    "email":String,
    "password":String,
    "phoneNumber":Integer,
}
```

### Response Body

- _201-create_

```json
{
  "message": "Success create user",
  "data": {
    "id": 1,
    "username": "user1",
    "email": "user1@mail.com"
  }
}
```

- _400-Bad request_

```json
{
    "message": "email must be unique"
}
OR
{
    "message": "username is require"
}
OR
{
    "message": "email is require"
}
OR
{
    "message": "password is require"
}
OR
{
    "message": "Phone Number is require"
}
```

<b> 2. POST /login </b>

### Description

- For get access token

### Request

- body

```json
{
    "email":String,
    "password":String
}
```

### Response body

- _200-OK_

```json
{
    "access_token": "eyJhb...",
    "username": String,
    "role": String
}
```

- _400-Bad Request_

```json
{
    "message": "email is require"
}
or
{
    "message": "password is require"
}
```

- _401-Unauthorized_

```json
{
  "message": "invalid email or password"
}
```
