# Movie API Documentation

## Endpoints :

- `POST /register`
- `POST /login`
- `POST /google-signin`

- `GET /ArinandaPlants`
- `POST /MyArinandaPlants`
- `GET /MyArinandaPlants`
- `DELETE /MyArinandaPlants/:id`
- `DELETE /ArinandaPlants/:id`
- `PUT /ArinandaPlants/:id`

- `Post /MyArinandaPlants/payment`

## 1. POST /registers

Request:

- body:

```js
{

  "email": "string",
  "password": "string",

}

```

_Response (201 - created)_

```json
{
  "message": "string",
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
  "message": "Password must be more than 5 characters"
}
```

&nbsp;

## 2. POST /login

Description:

- login for users

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
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (401 - Bad Request)_

```json
{
  "message": "Incorrect Email or Password"
}
```

&nbsp;

## 3. POST /google-signin

Description:

- login for customers

Request:

- payload:

```json
{
  "email": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "string",
  "access_token": "string"
}
```

_Response (201 - CREATED)_

```json
{
  "message": "string",
  "access_token": "string"
}
```

&nbsp;

## 4 GET /ArinandaPlants

Description:

- Get All Plants

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
        "name": "string",
        "imageUrl": "string",
        "price": "integer",
        "stock": "integer",
        "CategoryId": "integer",
        "Category": {
            "name": "string"
        }
    },
    ...
]
```

&nbsp;

## 5 POST /MyArinandaPlants

Description:

- ADD Plants MyPlant

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "PlantId": "integer",
  "qauntity": "integer"
}
```

_Response (201 - created)_

```json
{
    "UserId": "integer",
    "PlantId": "integer",
    "quantity": "integer",
    "status": "boolean",

}

&nbsp;
```

## 6 GET /MyArinandaPlants

Description:

- GET ALL MyPlant

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "carts": [

        {
            "id": "integer",
            "UserId": "integer",
            "ProductId": "integer",
            "status": "boolean",
            "quantity": "integer",
            "Plant": {
                "id": "integer",
                "name": "string",
                "imgUrl": "string",
                "price": "integer",
                "stock": "integer",
                "CategoryId": "integer",

            }
        }
        ...
    ],
    "sub": [
        "integer"
    ],
    "total": "integer"
}

&nbsp;
```

## 7 DELETE /MyArinandaPlants/:id`

Description:

- DELETE MyPlant

Request:

- params:

```json
{
  "plantId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
&nbsp;
```

## 8 DELETE /ArinandaPlants/:id

Description:

- DELETE Plant

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
&nbsp;
```

## 9 PUT /ArinandaPlants/:id

Description:

- Edit Plant

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "integer",
  "stock": "integer",
  "Categoryd": "integer"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "integer",
  "stock": "integer",
  "Categoryd": "integer"
}
```

&nbsp;

## 10 POST /MyArinandaPlants/payment

Description:

- payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "midtransToken": {
    "token": "string",
    "redirect_url": "string"
  }
}
```

&nbsp;
