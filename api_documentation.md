# 👨‍🎓API_documentation_for_mCourse

## ⏬⏬⏬List End Point⏬⏬⏬

- `POST /register`
- `POST /login`
- `POST /googlesign`
- `POST /github`,
- `POST /resetpassword`
- `POST /newpassword`
- `POST /motivation`
- `GET /courses`
- `GET /courses/data`
- `POST /mycourses`
- `GET /mycourses`
- `DELETE /mycourses/:id`
- `GET /mycourses/:id`
- `POST /payment/:id`
- `PATCH /:id`

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
    "id": Integer,
    "username": String,
    "email": String
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

<b> 3. POST /googlesign </b>

#### Description

- for access login with google

#### Request

- Body

```json
{
    "code": (get from google button)
}
```

### Response

- body

_200-Ok_

```json
{
    "access_token": "eyJhb...",
    "username": String,
    "role": String
}
```

<b> 4. POST /github </b>

#### Descrition

- for login with github account

#### Request

- Query

```json
{
    "code":(get code to github response)
}
```

#### Response

- body

_200-ok_

```json
{
  "access_token": "eyJhb...s",
  "username":String,
  "role": "user"
}
```

<b> 5. POST /resetpassword</b>

#### Description

- for get token for reset password

#### Request

- body

```json
{
    "token":(generate token from client),
    "email":String
}
```

#### Response

```json
_200_Ok_
{
 "message":"Token has been sent in your mail"
}
```

<b> 6. POST /newpassword </b>

#### Description

- access for make new password

#### Request

- Body

```json
{
 "email":String,
 "password": String,
}
```

#### Response

- Body

_200-OK_

```json
{
  "message": "success update password"
}
```

_401- unauthorize_

```json
{
  "message": "invalid token"
}
```

<b> 7. GET /motivation </b>

#### Description

-for motivation text

#### Request

- headers

```json
{
  "access_token": "eyJhb...s"
}
```

#### Response

- Body

_200-OK_

```json
{
    String
}
```

<b> 8. GET /courses </b>

#### Description

- Get all list data course

#### Request

-headers

```json
{
  "access_token": "eyJhb...s"
}
```

#### Response

- Body

_200-OK_

```json
{
    "tokenNext": String,
    "totalPage": Integer,
    "items": [
        {
            "kind":String,
            "etag":String,
            "id": {
                "kind": String,
                "videoId": String
            },
            "snippet": {
                "publishedAt": Date,
                "channelId": String,
                "title": String,
                "description": String,
                "thumbnails": {
                    "default": {
                        "url": String,
                        "width": Integer,
                        "height": Integer
                    },
                    "medium": {
                        "url": String,
                        "width": Integer,
                        "height": Integer
                    },
                    "high": {
                         "url": String,
                        "width": Integer,
                        "height": Integer
                    }
                },

                "channelTitle": String,
                "liveBroadcastContent": String,
                "publishTime": Date
            }
        },
        ...........
    ]
}
```

<b> 9. GET /courses/data </b>

#### Description

- Get data course by id

#### Request

-headers

```json
{
  "access_token": "eyJhb...s"
}
```

- Query

```json
{
    "videoId":String
}
```

### Global Error

#### Description

- Don't have Token or wrong Token access

#### Response

_(401- unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

#### Description

- Other error

  _Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
