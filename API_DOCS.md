# Easy Rent Server

## RESTful endpoints

### POST/customers/register

> Create new customer

_Request Body_

```
{
  "name": "<name to get insert into>",
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_

```
{
    "id": 5,
    "email": "rere@gmail.com"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Name is required",
        "Password is required",
        "Email is required",
    ]
}
OR
{
    "message": "Email must be unique"
}
```

### POST/customers/login

> Customer login

_Request Body_

```

{
"email": "<email to get insert into>"
"password": "<password to get insert into>"
}

```

_Response (200 - OK)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1ODYzNjYzfQ.nrkGOX6L0xfhAraTVPiQGUWdnRDMtvsyr03GBywDkOI",
    "id": 2,
    "name": "Lala",
    "email": "lala@gmail.com",
    "role": "Customer"
}

```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Password is required",
        "Email is required",
    ]
}
```

_Response (401 - Bad Request)_

```
{
    "message": "Your account has registered as renter and cannot login"
}
```

### POST/customers/google-sign-in

> Customer login with google

_Response (200 - OK)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1ODYzNjYzfQ.nrkGOX6L0xfhAraTVPiQGUWdnRDMtvsyr03GBywDkOI",
    "id": 2,
    "name": "Lala",
    "email": "lala@gmail.com",
    "role": "Customer"
}

```

### POST/customers/items

> Get item

_Response (200 - OK)_

```
{
    "totalItems": 9,
    "items": [
        {
            "id": 9,
            "name": "Villa",
            "quantity": 1,
            "description": "Cozy",
            "price": 1000000,
            "status": "Ready",
            "imageUrl": "https://rb.gy/5cr3co",
            "CategoryId": 3,
            "UserId": 1,
            "User": {
                "id": 1,
                "name": "Dimas",
                "email": "dimasardiyanto19@gmail.com",
                "role": "Renter"
            },
            "Category": {
                "id": 3,
                "name": "Property",
                "createdAt": "2023-02-08T05:21:12.812Z",
                "updatedAt": "2023-02-08T05:21:12.812Z"
            }
        },
    ]
}
```

### GET/customers/items/2

> Get item by id

_Request Params_

```
"id": "integer (required)"
```

_Response (200 - OK)_

```
   {
    "id": 1,
    "name": "Camera Canon 5D Mark 3",
    "quantity": 8,
    "description": "Very good",
    "price": "Rp 150.000,00",
    "status": "Ready",
    "imageUrl": "https://rb.gy/xicwvy",
    "CategoryId": 1,
    "UserId": 1,
    "createdAt": "2023-02-08T05:21:12.825Z",
    "updatedAt": "2023-02-08T08:36:18.093Z",
    "Category": {
        "id": 1,
        "name": "Electronic",
        "createdAt": "2023-02-08T05:21:12.812Z",
        "updatedAt": "2023-02-08T05:21:12.812Z"
    },
    "User": {
        "id": 1,
        "name": "Dimas",
        "email": "dimasardiyanto19@gmail.com",
        "role": "Renter"
    },
    "Transactions": []
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Item not found"
}
```

### GET/customers/categories

> Get all categories
> _Response (200 - OK)_

```
[
    {
        "id": 1,
        "name": "Electronic",
        "createdAt": "2023-02-08T03:51:08.871Z",
        "updatedAt": "2023-02-08T03:51:08.871Z"
    },
    {
        "id": 2,
        "name": "Trasportation",
        "createdAt": "2023-02-08T03:51:08.871Z",
        "updatedAt": "2023-02-08T03:51:08.871Z"
    },
    {
        "id": 3,
        "name": "Property",
        "createdAt": "2023-02-08T03:51:08.871Z",
        "updatedAt": "2023-02-08T03:51:08.871Z"
    }
]
```

### POST/customers/addCart/:itemId

> Add item to cart by id
> _Request Params_

```
"id": "integer (required)"
```

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
{
    "id": 21,
    "quantity": 2,
    "ItemId": 4,
    "UserId": 2,
    "status": "cart",
    "subtotal": 2000000,
    "updatedAt": "2023-02-08T09:12:29.704Z",
    "createdAt": "2023-02-08T09:12:29.704Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Quantity must be greather than 0"
}
OR
{
    "message": "Cannot add item to cart"
}
```

_Response (401 - Invalid Request)_

```

{
"message": "Invalid token!"
}

```

### GET/customers/carts

> Get all carts

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
[
    {
        "id": 14,
        "quantity": 2,
        "subtotal": 600000,
        "Item": {
            "id": 2,
            "name": "Laptop ROG Gaming",
            "quantity": 2,
            "description": "All game can play",
            "price": 300000,
            "status": "Ready",
            "imageUrl": "https://rb.gy/mgbvhn",
            "CategoryId": 1,
            "UserId": 1,
            "createdAt": "2023-02-06T15:38:54.126Z",
            "updatedAt": "2023-02-07T07:07:31.431Z",
            "Category": {
                "id": 1,
                "name": "Electronic",
                "createdAt": "2023-02-06T15:38:54.116Z",
                "updatedAt": "2023-02-06T15:38:54.116Z"
            }
        },
        "User": {
            "id": 4,
            "name": "popo",
            "email": "popo@gmail.com",
            "password": "$2a$10$KFU3dXL5sWE/2dAE9js6FOLRXQwxx/rmuYu08f6vXUYJTN0DO6LjW",
            "role": "Customer",
            "createdAt": "2023-02-06T15:52:25.156Z",
            "updatedAt": "2023-02-06T15:52:25.156Z"
        }
    }
]
```

_Response (401 - Invalid Request)_

```
{
"message": "Invalid token!"
}
```

### GET/customers/carts/:cartId

> Get cart by id

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
{
    "id": 8,
    "quantity": 2,
    "status": "cart",
    "subtotal": 300000,
    "ItemId": 1,
    "UserId": 2,
    "createdAt": "2023-02-07T04:31:03.847Z",
    "updatedAt": "2023-02-07T04:44:35.642Z",
    "Item": {
        "id": 1,
        "name": "Camera Canon 5D Mark 3",
        "quantity": 3,
        "description": "Very good",
        "price": 150000,
        "status": "Ready",
        "imageUrl": "https://rb.gy/xicwvy",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2023-02-06T15:38:54.126Z",
        "updatedAt": "2023-02-07T04:49:45.446Z",
        "User": {
            "id": 1,
            "name": "Dimas",
            "email": "dimasardiyanto19@gmail.com",
            "role": "Renter",
            "createdAt": "2023-02-06T15:38:53.793Z",
            "updatedAt": "2023-02-06T15:38:53.793Z"
        },
        "Category": {
            "id": 1,
            "name": "Electronic",
            "createdAt": "2023-02-06T15:38:54.116Z",
            "updatedAt": "2023-02-06T15:38:54.116Z"
        }
    }
}
```

_Response (401 - Invalid Request)_

```
{
"message": "Invalid token!"
}
```

### DELETE/customers/carts/delete/:cartId

> Delete cart by id

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
{
    "message": "Sussess delete"
}
```

_Response (401 - Invalid Request)_

```
{
"message": "Invalid token!"
}
```

### GET/customers/rent/:transactionId

> Rent item by transaction id

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
{
    "midtransToken": {
        "token": "351ab281-c806-458e-b36c-ec1679f1f75a",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/351ab281-c806-458e-b36c-ec1679f1f75a"
    },
    "checkout": {
        "id": 21,
        "quantity": 2,
        "status": "checkout",
        "subtotal": 2000000,
        "ItemId": 4,
        "UserId": 2,
        "createdAt": "2023-02-08T09:12:29.704Z",
        "updatedAt": "2023-02-08T09:12:44.253Z",
        "Item": {
            "id": 4,
            "name": "Toyota Alphard",
            "quantity": 4,
            "description": "Comfortable",
            "price": 1000000,
            "status": "Ready",
            "imageUrl": "https://rb.gy/sbmcl3",
            "CategoryId": 2,
            "UserId": 1,
            "createdAt": "2023-02-08T05:21:12.825Z",
            "updatedAt": "2023-02-08T09:12:44.261Z",
            "User": {
                "id": 1,
                "name": "Dimas",
                "email": "dimasardiyanto19@gmail.com",
                "role": "Renter",
                "createdAt": "2023-02-08T05:21:12.524Z",
                "updatedAt": "2023-02-08T05:21:12.524Z"
            }
        }
    }
}
```

_Response (400 - Bad Request)_

```
{
    message: "You have rented this item"
}
```

_Response (401 - Invalid Request)_

```
{
    message: "Register or login first"
}
```

### GET/customers/histories

> Get all customer transaction histories

_Request Header_

```
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NDI5MjAxOH0.2Of46IX-42GqBOvyq5mZd6sp_JQ9CNa8yj4EWbghHkI
```

_Response (200 - OK)_

```
{
    "transaction": [
        {
            "id": 20,
            "quantity": 1,
            "subtotal": "Rp 400.000,00",
            "Item": {
                "id": 5,
                "name": "Rumah",
                "quantity": 7,
                "description": "Your house here",
                "price": "Rp 400.000,00",
                "status": "Ready",
                "imageUrl": "https://rb.gy/fmerki",
                "CategoryId": 3,
                "UserId": 1,
                "createdAt": "2023-02-08T05:21:12.825Z",
                "updatedAt": "2023-02-08T08:49:25.815Z"
            }
        },
        {
            "id": 21,
            "quantity": 2,
            "subtotal": "Rp 2.000.000,00",
            "Item": {
                "id": 4,
                "name": "Toyota Alphard",
                "quantity": 4,
                "description": "Comfortable",
                "price": "Rp 1.000.000,00",
                "status": "Ready",
                "imageUrl": "https://rb.gy/sbmcl3",
                "CategoryId": 2,
                "UserId": 1,
                "createdAt": "2023-02-08T05:21:12.825Z",
                "updatedAt": "2023-02-08T09:12:44.261Z"
            }
        },
        {
            "id": 23,
            "quantity": 2,
            "subtotal": "Rp 300.000,00",
            "Item": {
                "id": 6,
                "name": "Iphone 14 Pro",
                "quantity": 7,
                "description": "Grab fast",
                "price": "Rp 150.000,00",
                "status": "Ready",
                "imageUrl": "https://rb.gy/zbq9sq",
                "CategoryId": 1,
                "UserId": 1,
                "createdAt": "2023-02-08T05:21:12.825Z",
                "updatedAt": "2023-02-08T09:53:02.458Z"
            }
        }
    ],
    "totalPrice": "Rp 2.700.000,00"
}
```
