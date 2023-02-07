# Hacktree Server

## GET /auth/github
redirect to github oauth URL

_Response (302 - Found)_
```
https://github.com/login/oauth/authorize?client_id=xxxx
```

## POST /auth/github
Login/register with github

Request:

- body:

```json
{
  "code": "string",
}
```

_Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```
_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

## PUT /auth/github
Link github account with current user

Request:

- headers:

```json
{
  "access_token": "string",
}
```

_Response (201 - Created)_

```json
{
  "message": "Successfuly link your github account!"
}
```
_Response (400 - Forbidden)_
```json
{
  "message": "You already link a github account, please unlink before procced"
}
```

## DELETE /auth/github
unlink github account with current user

Request:

- headers:

```json
{
  "access_token": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Github unlinked!"
}
```


