# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `POST /chatgpt`
- `GET /foods`
- `GET /foods/:id`
- `GET /events/`
- `GET /events/:id`
- `POST /events`
- `PUT /events`
- `PATCH /events`
- `POST /events/:eventId/subscibe`
- `POST /payment-gateway`

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

## 4. post /chatgpt

Description:

- search food by chat gpt

Request:

- body:

```json
{
  "food": "string"
}
```

_Response (200 - OK)_

```json
{
  "text": "string"
}
```

&nbsp;

## 5. get /foods

Description:

- get foods all

Request:

- query:

```json
{
  "number": "string",
  "includedIngredients": "string",
  "query": "string",
  "limit": "integer",
  "limit": "string"
}
```

_Response (200 - OK)_

```json
{
  "offset": 0,
  "number": 2,
  "results": [
    {
      "id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 715538,
      "title": "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
      "image": "https://spoonacular.com/recipeImages/715538-312x231.jpg",
      "imageType": "jpg"
    }
  ],
  "totalResults": 86
}
```

## 6. get /foods/:id

Description:

- get foods by id

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
  "id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
  "imageType": "jpg",
  "servings": 2,
  "readyInMinutes": 45,
  "license": "CC BY-SA 3.0",
  "sourceName": "Full Belly Sisters",
  "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
  "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
  "aggregateLikes": 209,
  "healthScore": 19.0,
  "spoonacularScore": 83.0,
  "pricePerServing": 163.15,
  "analyzedInstructions": [],
  "cheap": false,
  "creditsText": "Full Belly Sisters",
  "cuisines": [],
  "dairyFree": false,
  "diets": [],
  "gaps": "no",
  "glutenFree": false,
  "instructions": "",
  "ketogenic": false,
  "lowFodmap": false,
  "occasions": [],
  "sustainable": false,
  "vegan": false,
  "vegetarian": false,
  "veryHealthy": false,
  "veryPopular": false,
  "whole30": false,
  "weightWatcherSmartPoints": 17,
  "dishTypes": ["lunch", "main course", "main dish", "dinner"],
  "extendedIngredients": [
    {
      "aisle": "Milk, Eggs, Other Dairy",
      "amount": 1.0,
      "consitency": "solid",
      "id": 1001,
      "image": "butter-sliced.jpg",
      "measures": {
        "metric": {
          "amount": 1.0,
          "unitLong": "Tbsp",
          "unitShort": "Tbsp"
        },
        "us": {
          "amount": 1.0,
          "unitLong": "Tbsp",
          "unitShort": "Tbsp"
        }
      },
      "meta": [],
      "name": "butter",
      "original": "1 tbsp butter",
      "originalName": "butter",
      "unit": "tbsp"
    },
    {
      "aisle": "Produce",
      "amount": 2.0,
      "consitency": "solid",
      "id": 10011135,
      "image": "cauliflower.jpg",
      "measures": {
        "metric": {
          "amount": 473.176,
          "unitLong": "milliliters",
          "unitShort": "ml"
        },
        "us": {
          "amount": 2.0,
          "unitLong": "cups",
          "unitShort": "cups"
        }
      },
      "meta": ["frozen", "thawed", "cut into bite-sized pieces"],
      "name": "cauliflower florets",
      "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
      "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
      "unit": "cups"
    },
    {
      "aisle": "Cheese",
      "amount": 2.0,
      "consitency": "solid",
      "id": 1041009,
      "image": "cheddar-cheese.png",
      "measures": {
        "metric": {
          "amount": 2.0,
          "unitLong": "Tbsps",
          "unitShort": "Tbsps"
        },
        "us": {
          "amount": 2.0,
          "unitLong": "Tbsps",
          "unitShort": "Tbsps"
        }
      },
      "meta": ["grated", "(I used romano)"],
      "name": "cheese",
      "original": "2 tbsp grated cheese (I used romano)",
      "originalName": "grated cheese (I used romano)",
      "unit": "tbsp"
    },
    {
      "aisle": "Oil, Vinegar, Salad Dressing",
      "amount": 1.0,
      "consitency": "liquid",
      "id": 1034053,
      "image": "olive-oil.jpg",
      "measures": {
        "metric": {
          "amount": 1.0,
          "unitLong": "Tbsp",
          "unitShort": "Tbsp"
        },
        "us": {
          "amount": 1.0,
          "unitLong": "Tbsp",
          "unitShort": "Tbsp"
        }
      },
      "meta": [],
      "name": "extra virgin olive oil",
      "original": "1-2 tbsp extra virgin olive oil",
      "originalName": "extra virgin olive oil",
      "unit": "tbsp"
    },
    {
      "aisle": "Produce",
      "amount": 5.0,
      "consitency": "solid",
      "id": 11215,
      "image": "garlic.jpg",
      "measures": {
        "metric": {
          "amount": 5.0,
          "unitLong": "cloves",
          "unitShort": "cloves"
        },
        "us": {
          "amount": 5.0,
          "unitLong": "cloves",
          "unitShort": "cloves"
        }
      },
      "meta": [],
      "name": "garlic",
      "original": "5-6 cloves garlic",
      "originalName": "garlic",
      "unit": "cloves"
    },
    {
      "aisle": "Pasta and Rice",
      "amount": 6.0,
      "consitency": "solid",
      "id": 20420,
      "image": "fusilli.jpg",
      "measures": {
        "metric": {
          "amount": 170.097,
          "unitLong": "grams",
          "unitShort": "g"
        },
        "us": {
          "amount": 6.0,
          "unitLong": "ounces",
          "unitShort": "oz"
        }
      },
      "meta": ["(I used linguine)"],
      "name": "pasta",
      "original": "6-8 ounces pasta (I used linguine)",
      "originalName": "pasta (I used linguine)",
      "unit": "ounces"
    },
    {
      "aisle": "Spices and Seasonings",
      "amount": 2.0,
      "consitency": "solid",
      "id": 1032009,
      "image": "red-pepper-flakes.jpg",
      "measures": {
        "metric": {
          "amount": 2.0,
          "unitLong": "pinches",
          "unitShort": "pinches"
        },
        "us": {
          "amount": 2.0,
          "unitLong": "pinches",
          "unitShort": "pinches"
        }
      },
      "meta": ["red"],
      "name": "red pepper flakes",
      "original": "couple of pinches red pepper flakes, optional",
      "originalName": "couple of red pepper flakes, optional",
      "unit": "pinches"
    },
    {
      "aisle": "Spices and Seasonings",
      "amount": 2.0,
      "consitency": "solid",
      "id": 1102047,
      "image": "salt-and-pepper.jpg",
      "measures": {
        "metric": {
          "amount": 2.0,
          "unitLong": "servings",
          "unitShort": "servings"
        },
        "us": {
          "amount": 2.0,
          "unitLong": "servings",
          "unitShort": "servings"
        }
      },
      "meta": ["to taste"],
      "name": "salt and pepper",
      "original": "salt and pepper, to taste",
      "originalName": "salt and pepper, to taste",
      "unit": "servings"
    },
    {
      "aisle": "Produce",
      "amount": 3.0,
      "consitency": "solid",
      "id": 11291,
      "image": "spring-onions.jpg",
      "measures": {
        "metric": {
          "amount": 3.0,
          "unitLong": "",
          "unitShort": ""
        },
        "us": {
          "amount": 3.0,
          "unitLong": "",
          "unitShort": ""
        }
      },
      "meta": ["white", "green", "separated", "chopped"],
      "name": "scallions",
      "original": "3 scallions, chopped, white and green parts separated",
      "originalName": "scallions, chopped, white and green parts separated",
      "unit": ""
    },
    {
      "aisle": "Alcoholic Beverages",
      "amount": 2.0,
      "consitency": "liquid",
      "id": 14106,
      "image": "white-wine.jpg",
      "measures": {
        "metric": {
          "amount": 2.0,
          "unitLong": "Tbsps",
          "unitShort": "Tbsps"
        },
        "us": {
          "amount": 2.0,
          "unitLong": "Tbsps",
          "unitShort": "Tbsps"
        }
      },
      "meta": ["white"],
      "name": "white wine",
      "original": "2-3 tbsp white wine",
      "originalName": "white wine",
      "unit": "tbsp"
    },
    {
      "aisle": "Pasta and Rice",
      "amount": 0.25,
      "consitency": "solid",
      "id": 99025,
      "image": "breadcrumbs.jpg",
      "measures": {
        "metric": {
          "amount": 59.147,
          "unitLong": "milliliters",
          "unitShort": "ml"
        },
        "us": {
          "amount": 0.25,
          "unitLong": "cups",
          "unitShort": "cups"
        }
      },
      "meta": ["whole wheat", "(I used panko)"],
      "name": "whole wheat bread crumbs",
      "original": "1/4 cup whole wheat bread crumbs (I used panko)",
      "originalName": "whole wheat bread crumbs (I used panko)",
      "unit": "cup"
    }
  ],
  "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375\">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href=\"https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437\">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738\">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.",
  "winePairing": {
    "pairedWines": ["chardonnay", "gruener veltliner", "sauvignon blanc"],
    "pairingText": "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta. Sauvignon Blanc and Gruner Veltliner both have herby notes that complement salads with enough acid to match tart vinaigrettes, while a Chardonnay can be a good pick for creamy salad dressings. The Buddha Kat Winery Chardonnay with a 4 out of 5 star rating seems like a good match. It costs about 25 dollars per bottle.",
    "productMatches": [
      {
        "id": 469199,
        "title": "Buddha Kat Winery Chardonnay",
        "description": "We barrel ferment our Chardonnay and age it in a mix of Oak and Stainless. Giving this light bodied wine modest oak character, a delicate floral aroma, and a warming finish.",
        "price": "$25.0",
        "imageUrl": "https://spoonacular.com/productImages/469199-312x231.jpg",
        "averageRating": 0.8,
        "ratingCount": 1.0,
        "score": 0.55,
        "link": "https://www.amazon.com/2015-Buddha-Kat-Winery-Chardonnay/dp/B00OSAVVM4?tag=spoonacular-20"
      }
    ]
  }
}
```

&nbsp;

_Response (404 - Not Found)_

```json
{ "message": "Data Not Found" }
```

&nbsp;

## 8. get /events

Description:

- get foods all

Request:

- query:

```json
{
  "number": "string"
}
```

_Response (200 - OK)_

```json
{
  "count": 5,
  "rows": [
    {
      "id": 1,
      "title": "asdasd",
      "link": "asdasda",
      "eventDate": "0123-03-12T03:23:00.000Z",
      "imageUrl": "https://media.istockphoto.com/id/498615802/id/foto/empat-orang-mengambil-bagian-dalam-kelas-memasak.jpg?s=612x612&w=0&k=20&c=ClwMkQ9hMvzKpC1EvTA-0hBV-1HK-k6gk6xXbF7mVIg=",
      "desc": "asdas",
      "price": 123123,
      "status": "pending",
      "createdAt": "2023-02-09T02:04:46.342Z",
      "updatedAt": "2023-02-09T02:04:46.342Z"
    },
    {
      "id": 2,
      "title": "cooking together",
      "link": "https://meet.google.com/pfn-vizk-bpp",
      "eventDate": "0434-03-12T12:03:00.000Z",
      "imageUrl": "https://weddingbells.mblycdn.com/wb/resized/2020/03/634x418/why-cooking-together-is-a-relationship-must.jpg",
      "desc": "cook together and have fun , we are family not foreign ",
      "price": 2000000,
      "status": "pending",
      "createdAt": "2023-02-09T04:12:54.680Z",
      "updatedAt": "2023-02-09T04:12:54.680Z"
    },
    {
      "id": 3,
      "title": "How to make family time with cooking ",
      "link": "https://meet.google.com/pfn-vizk-bpp",
      "eventDate": "2023-02-09T11:14:00.000Z",
      "imageUrl": "https://www.palatesensations.com/images/2019/09/pasted-image-0-1024x683.png",
      "desc": "make family have fun , not boring masak lah pokoknyamah gitu enak",
      "price": 1000000,
      "status": "pending",
      "createdAt": "2023-02-09T04:15:33.475Z",
      "updatedAt": "2023-02-09T04:15:33.475Z"
    },
    {
      "id": 4,
      "title": "learn together with mama dedeh ,, cooking prntol ayam",
      "link": "https://meet.google.com/pfn-vizk-bpp",
      "eventDate": "2023-02-09T11:18:00.000Z",
      "imageUrl": "https://www.casualgourmet.com/wp-content/uploads/2016/03/Couples-Who-Cook-Together.jpg",
      "desc": "learn together with mama dedeh ,, cooking prntol ayam enak mantap delicious ahhahahahahaha",
      "price": 9999999,
      "status": "pending",
      "createdAt": "2023-02-09T04:18:54.336Z",
      "updatedAt": "2023-02-09T04:18:54.336Z"
    },
    {
      "id": 5,
      "title": "how to learn children",
      "link": "https://meet.google.com/pfn-vizk-bpp",
      "eventDate": "2023-02-25T17:22:00.000Z",
      "imageUrl": "https://fetch.drprem.com/uploads/a37c92d3ea4044c3565ddca9fec634d0.jpg",
      "desc": "learn children how to make jelly potter and seblak mamah acunnnn ",
      "price": 200000,
      "status": "pending",
      "createdAt": "2023-02-09T04:22:17.592Z",
      "updatedAt": "2023-02-09T04:22:17.592Z"
    }
  ]
}
```

## 8. DELETE /events/:id

Description:

- get delete evenet

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
  "message": "Successfully delete"
}
```

&nbsp;

## 9. PATCH /events/:id

Description:

- Update status evenst by id

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
  "status": "string"
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
  "message": "evenst status has been updated "
}
```

_Response (404 - Not Found)_

```json
{ "message": "Data Not Found" }
```

&nbsp;

## 10. PUT /events/:id

Description:

- Replace events by id

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
  "title": "string",
  "link": "string",
  "price": "string",
  "imageUrl": "string",
  "eventDate": "string",
  "desc": "string"
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
  "message": "Events has been updated"
}
```

_Response (404 - Not Found)_

```json
{ "message": "Data Not Found" }
```

&nbsp;

## 11. POST /events/:eventId/subscribe

Description:

- subscribe events

Request:

- params:

```json
{
  "eventId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{ "message": "Subscribe successfully" }
```

_Response (404 - Not Found)_

```json
{ "message": "Data Not Found" }
```

&nbsp;

## 12. POST /payment-gateway

Description:

- subscribe events

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
  "price": "integer"
}
```

_Response (200 - OK)_

```json
{ "token": "string" }
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
