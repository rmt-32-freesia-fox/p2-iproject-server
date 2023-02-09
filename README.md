# p2-iproject-server
Individual Project - Server

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /animefinder/`
- `GET /events/`
- `GET /news`
- `POST /animeplaylist`
- `PATCH /animeplaylist`
- `DELETE /animeplaylist/`
- `GET /animeplaylist/:UserId`
- `POST /myevents`
- `GET /myevents`

### POST /register

#### Description

- Create a new users data

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "role": String,
  }
  ```

#### Response

_201 - Created_

```json
{
    "username": String,
    "email": String,
    "role": String,
}

```

_400 - Bad Request_

```json
 {
    "message": String
}
```

### POST /login

#### Description

- Logging into application 

#### Request

- Body

  ```json

  {
    "email": String,
    "password": String,
  }

  ```

#### Response

_200 - OK_

```json
{
  {
    "access_token": String,
    "username": String,
    "role": String,
    "userId": Integer
}
}
```

_400 - Bad Request_

```json
{
    "message": "Email and password are required"
}
```

### POST /animefinder

#### Description

- Get all anime

#### Request

- Params

  ```json

  {
    "name": String,
  }


#### Response

_200 - OK_

```json
  {
    "data": [
        {
            "_id": String,
            "title": String,
            "alternativeTitles": [String , ...],
            "ranking": Integer,
            "genres": [ String, ...],
            "episodes": Integer,
            "hasEpisode": Boolean,
            "hasRanking": Boolean,
            "image": String,
            "link": String,
            "status": String,
            "synopsis": String,
            "thumb": String,
            "type": String
        },
    ...
  ],
  "meta": {
        "page": Integer,
        "size": Integer,
        "totalData": Integer,
        "totalPage": Integer
    }
}

```


### GET /events

#### Description

- Get all events data

#### Request

#### Response

_200 - OK_

```json
  [
    {
        "id": Integer,
        "name": String,
        "date": String,
        "location": String,
        "description": String,
        "createdAt": Date,
        "updatedAt": Date
    },
    ...
  ]
  

```

_401 - Unauthorized_

```json
{
    "message": "Invalid Token"
}
```

_400 - Bad Request_

```json
{
    "message": String
}
```

### GET /news

#### Description

- Get all news data

#### Response

_200 - OK_

```json
{
    "pagination": {
        "last_visible_page": Integer,
        "has_next_page": Boolean,
        "current_page": Integer,
        "items": {
            "count": Integer,
            "total": Integer,
            "per_page": Integer
        }
    },
    "data": [
        {
            "mal_id": Integer,
            "url": String,
            "images": {
                "jpg": {
                    "image_url": String,
                    "small_image_url": String,
                    "large_image_url": String
                },
                "webp": {
                    "image_url": String,
                    "small_image_url": String,
                    "large_image_url": String
                }
            },
            "trailer": {
                "youtube_id": String,
                "url": String,
                "embed_url": String,
                "images": {
                    "image_url": String,
                    "small_image_url": String,
                    "medium_image_url": String,
                    "large_image_url": String,
                    "maximum_image_url": String
                }
            },
            "approved": Boolean,
            "titles": [
                {
                    "type": String,
                    "title": String
                },
                {
                    "type": String,
                    "title": String
                }
            ],
            "title": String,String,
            "title_japanese": null,
            "title_synonyms": [],
            "type": String,
            "source": String,
            "episodes": Integer,
            "status": String,
            "airing": Boolean,
            "aired": {
                "from": Date,
                "to": Date,
                "prop": {
                    "from": {
                        "day": Integer,
                        "month": Integer,
                        "year": Integer
                    },
                    "to": {
                        "day": Integer,
                        "month": Integer,
                        "year": Integer
                    }
                },
                "string": String
            },
            "duration": String,
            "rating": String,
            "score": Integer,
            "scored_by": String,
            "rank": Integer,
            "popularity": Integer,
            "members": Integer,
            "favorites": Integer,
            "synopsis": String,
            "background": String,
            "season": Integer,
            "year": Integer,
            "broadcast": {
                "day": Integer,
                "time": Integer,
                "timezone": Integer,
                "string": String
            },
            "producers": [String],
            "licensors": [String],
            "studios": [String],
            "genres": [String],
            "explicit_genres": [String],
            "themes": [String],
            "demographics": [String]
        },
    ]
}
```


_404 - Not Found_

```json
{
    "message": "Error Data is Not Found"
}
```

### POST /animeplaylist

#### Description

- Create data playlist

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```


- Body
  ```json
  {
    "title": String,
    "AnimeId": Integer,
    "episodes": Integer,
    "image": String,
  }
  ```

#### Response

_200 - OK_

```json
{
    "UserId": String,
    "AnimeId": String,
    "status":String,
    "totalEpisodes": String,
    "watchedEpisodes": Integer
}

```

_401 - Unauthorized_

```json
{
    "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
    "message": "Forbidden Access"
}

```

_404 - Not Found_

```json
{
    "message": "Error Data is Not Found"
}

```

### PATCH /animeplaylist

#### Description

- Update status data playlist

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "UserId": Integer,
    "watchedEpisodes": Integer,
    "AnimeId": Integer,
  }
  ```

#### Response

_200 - OK_

```json

{
    "UserId": String,
    "AnimeId": String,
    "status":String,
    "totalEpisodes": String,
    "watchedEpisodes": Integer
}

```

_401 - Unauthorized_

```json
{

    "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
    "message": "Forbidden Access"
}
```

_404 - Not Found_

```json
{
    "message": "Error Data is Not Found"
}
```

### DELETE /animeplaylist

#### Description

- Delete Playlist Data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "UserId": Integer,
    "AnimeId": Integer,
  }
  ```
#### Response

_200 - OK_

```json
{
"message" : "Anime has been deleted"
}
```

_401 - Unauthorized_

```json
{
    "message": "Invalid Token"
}
```

### GET /animeplaylist/:UserId

#### Description

- Get animeplaylist based on user id given

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Params
  ```json
  {
        "UserId": Integer,
  }
  ```

#### Response

_200 - OK_

```json
[
    {
    "UserId": String,
    "AnimeId": String,
    "status":String,
    "totalEpisodes": String,
    "watchedEpisodes": Integer
    },
    ...
]
```

_401 - Unauthorized_

```json
{
    "message": "Invalid Token"
}
```

_400 - Bad Request_

```json
{
    "message": String
}
```

### POST /myevents

#### Description

- Create My Event data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```


- Body
  ```json
  {
        "UserId": Integer,
        "EventId": Integer,
  }
  ```

#### Response

_200 - OK_

```json
{

    "id": Integer,
    "UserId": Integer,
    "EventId": Integer,
    "updatedAt": Date,
    "createdAt": Date
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_400 - Bad Request_

```json
{
    "message": String
}
```

### GET /myevents

#### Description

- Get All Data My Events

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- User

  ```json
  {
    "id": Integer,
  }

  ```

#### Response

_200 - OK_

```json
[
    {
    "id": Integer,
    "UserId": Integer,
    "EventId": Integer,
    "updatedAt": Date,
    "createdAt": Date
    },
    ...
]
```

_401 - Unauthorized_

```json
{

    "message": "Invalid Token"
}
```

_403 - Forbidden_

```json
{
    "message": "Forbidden Access"
}
```

_404 - Not Found_

```json
{
    "message": "Error Data is Not Found"
}
```



### Global Error

#### Response

_500 - Internal Server Error_

```json
{
  "statusCode": 500,
  "error": {
    "message": "Internal Server Error"
  }
}
```
