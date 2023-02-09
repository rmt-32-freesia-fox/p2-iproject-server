## Endpoints

List of Available Endpoints:

- `POST users/register`
- `POST users/login`
- `GET /idols`
- `GET /idols/lives/:id`
- `GET /idols/upcomings/:id`
- `POST /payments`
- `PATCH /payments`

### POST users/register

#### Description

- Create a new user data

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": Integer,
    "email": String
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": String
  }
  ```

### POST users/login

#### Description

- Login user

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": String,
    "accountStatus": String,
    "username": String
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

### GET /idols

#### Description

- Get all the channels data

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "yt_channel_id": String,
        "bb_space_id": String,
        "trailerUrl": String,
        "name": String,
        "description": String,
        "photo": String,
        "published_at": Date,
        "twitter_link": String,
        "view_count": Integer,
        "subscriber_count": Integer,
        "video_count": Integer,
        "video_original": Integer
    },
   ] 
  
  ```

### GET /idols/lives/:id

#### Description

- Get all the live streaming data based on channel_id

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "yt_video_key": String,
        "bb_video_id": String,
        "title": String,
        "thumbnail": String,
        "status": String,,
        "live_schedule": Date,
        "live_start": Date,
        "live_end": Date,
        "live_viewers": Integer,
        "channel": {
            "id": Integer,
            "yt_channel_id": Integer,
            "bb_space_id": Integer,
            "name": String,
            "description": String,
            "photo": String,
            "published_at": Date,
            "twitter_link": String,
            "view_count": Integer,
            "subscriber_count": Integer,
            "video_count": Integer
        }
    }
   ] 
  ```


### GET /idols/upcomings/:id

#### Description

- Get all the upcoming streaming data based on channel_id

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "yt_video_key": String,
        "bb_video_id": String,
        "title": String,
        "thumbnail": String,
        "status": String,,
        "live_schedule": Date,
        "live_start": Date,
        "live_end": Date,
        "live_viewers": Integer,
        "channel": {
            "id": Integer,
            "yt_channel_id": Integer,
            "bb_space_id": Integer,
            "name": String,
            "description": String,
            "photo": String,
            "published_at": Date,
            "twitter_link": String,
            "view_count": Integer,
            "subscriber_count": Integer,
            "video_count": Integer
        }
    }
   ] 
  ```

### POST /payments

#### Description

- Login user

#### Request

- headers
  ```json
  {
    "access_token": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "token": String,
    "redirect_url": String,
  }
  ```

### PATCH /payments

#### Description

- Edit Account Status and Payment Status

#### Response

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
    "orderId": Integer
  }
  ```

_200 - OK_

- Body
  ```json
  { "message": "Payment status updated" }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
