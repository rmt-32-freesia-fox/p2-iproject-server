# HLR-Auction API Documentation

&nbsp;

## Models :

_User_

```
- email     : string, required, unique
- name      : string, required,
- password  : string, required,
```

_Auction_

```
UserId       : integer, required
name         : string, required
category     : string, required
color        : string, required
startPrice   : integer, required
multiple     : integer, required
date         : dateonly, required
status       : string (default : available)
```

_Image_

```
AuctionId : integer, required
imageUrl : string, required
```

_History_

```
AuctionId : integer, required
UserId : integer, required
bid : integer, required
```

&nbsp;

# REST - API :

## Users

- 1. POST /register

  - request :

    ```json
    body:{
        "email" : '<string>',
        "name"  : '<string>',
        "password" : '<string>'
    }

    ```

- response :

  _200, OK_

  ```json
  {
    "id": "integer",
    "name": "string",
    "email": "string"
  }
  ```

  _400, BAD REQUEST_

  ```json
    {
      "message": "Email must be unique"
    },
  //or
    {
      "message": "Email is required"
    }
  //or
    {
      "message": "Name is required"
    }
  //or
    {
      "message": "Password is required"
    }
  ```

- 1. POST /login

  - request :

    ```json
    body:{
        "email" : '<string>',
        "name"  : '<string>',
        "password" : '<string>'
    }

    ```

- response :

  _200, OK_

  ```json
  {
    "access_token": "string"
  }
  ```

  _401, UNAUTHORIZE"_

  ```json
    {
      "message": "Invalid email/password"
    },
  ```

  _400 - BAD REQUEST_

  ```json
    //or
    {
      "message": "Email is required"
    }
  //or
    {
      "message": "Password is required"
    }
  ```

## Users

1. GET /auctions

- response :

_200 - OK_

```json
    "totalItem": "integer",
    "auctions": [
        {
            "id": "integer",
            "UserId": "integer",
            "name": "string",
            "category": "string",
            "color": "string",
            "startPrice": "integer",
            "multiple": "integer",
            "date": "date",
            "status": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...
    ]
```

2. GET /auctions/detail/:id

- response :

_200 - OK_

```json
{
  "auction": {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "category": "string",
    "color": "string",
    "startPrice": "integer",
    "multiple": "integer",
    "date": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "images": [
    {
      "id":  "integer",
      "AuctionId":  "integer",
      "imageUrl": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    ...
  ]
}
```

3. GET /auctions/myauctions

- request :

  ```json
  headers:{
  "access_token" : "string"
  }

  ```

- response :

_200 - OK_

```json
[
    {
        "id": "integer",
        "UserId": "integer",
        "name": "string",
        "category": "string",
        "color": "string",
        "startPrice": "integer",
        "multiple": "integer",
        "date": "date",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
  ...
]
```

3. GET /auctions/winner/:id

- request :

  ```json
  headers:{
  "access_token" : "string"
  }

  ```

- response :

_200 - OK_

```json
{
  "id": "integer",
  "AuctionId": "integer",
  "UserId": "integer",
  "bid": "integer",
  "createdAt": "date",
  "updatedAt": "date",
  "User": {
    "id": "integer",
    "email": "string",
    "name": "string"
  }
}
```

3. GET /auctions/itemslist

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  params:{
    "category" : "string"
  }

  ```

- response :

_200 - OK_

````json
[
  {
    "id":"string",
    "title":"string",
    "link":"string",
    "img":"string",
    "price":"integer",
    "brand":"string",
    "model":"string",
    "storageInterface":"string",
    "memory":"string",
    "clockSpeed":"string",
    "chipset":"string"
    },
    ...
]
```

3. POST /auctions/newauction

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  body:{
     "name" : "string",
     "category"  : "string",
     "date"  : "date",
     "color" : "string",
     "startPrice" : "integer",
     "multiple" : "integer"
  }

````

- response :

_200 - OK_

```json

  {
    "id" : "integer",
    "name" : "string",
     "category"  : "string",
     "date"  : "date",
     "color" : "string",
     "startPrice" : "integer",
     "multiple" : "integer",
     "status" : "string"
    },

```

3. GET /auctions/recentAuction

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  ```

``

- response :

_200 - OK_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "category": "string",
    "color": "string",
    "startPrice": "integer",
    "multiple": "integer",
    "date": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  },
  ...
]
```

3. GET /auctions/getTransaction

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  ```

``

_200 - OK_

- response :

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "name": "string",
    "category": "string",
    "color": "string",
    "startPrice": "integer",
    "multiple": "integer",
    "date": "date",
    "status": "pending",
    "createdAt": "date",
    "updatedAt": "date"
  },
  ...
]
```

3. POST /auctions/transaction/:id

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  ```

- response :

_200 - OK_

```json

[
  {
    "token" : "string",
    "redirect_url" : "string"
  },
  ...
]
```

_400 - BAD REQUEST_

```json
{
  "message": "Invoice Has Been Pay"
}
```

3. PATCH /auctions/changestatus/:id

- request :

  ```json
  headers:{
  "access_token" : "string"
  },
  ```

- response :

_200 - OK_

```json

[
  {
    "message" :"Thankyou for purchasing this auction"
  },
  ...
]
```

## GLOBAL ERROR

_404 - NOT FOUND_

```json
{
  "message": "Data not found"
}
```

_401 - UNAUTHORIZED_

```json
{
  "message": "Invalid token"
}
```

_403 - FORBIDDEN_

```json
{
  "message": "You are not authorized"
}
```

_500 - INTERNAL SERVER ERROR_

```json
{
  "message": "Internal server error"
}
```
