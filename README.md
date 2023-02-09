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
  "code": "string"
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
  "access_token": "string"
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
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Github unlinked!"
}
```

## GET /auth/spotify

redirect to spotify oauth URL

_Response (302 - Found)_

```
https://spotify.com/login/oauth/authorize?client_id=xxxx
```

## POST /auth/spotify

Login/register with spotify

Request:

- body:

```json
{
  "code": "string"
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

## PUT /auth/spotify

Link spotify account with current user

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
  "message": "Successfuly link your spotify account!"
}
```

_Response (400 - Forbidden)_

```json
{
  "message": "You already link a spotify account, please unlink before procced"
}
```

## DELETE /auth/spotify

unlink spotify account with current user

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
  "message": "spotify unlinked!"
}
```

## GET /auth/discord

redirect to discord oauth URL

_Response (302 - Found)_

```
https://discord.com/login/oauth/authorize?client_id=xxxx
```

## POST /auth/discord

Login/register with discord

Request:

- body:

```json
{
  "code": "string"
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

## PUT /auth/discord

Link discord account with current user

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
  "message": "Successfuly link your discord account!"
}
```

_Response (400 - Forbidden)_

```json
{
  "message": "You already link a discord account, please unlink before procced"
}
```

## DELETE /auth/discord

unlink discord account with current user

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
  "message": "discord unlinked!"
}
```

## GET /profile/:username

Request:

- headers:

```json
{
  "access_token": "string" // optional
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "username": "meh",
  "name": "meh",
  "profilePicture": "https://images2.imgbox.com/cd/9b/xS9npXWE_o.jpeg",
  "bio": "null",
  "background": null,
  "createdAt": "2023-02-09T00:05:53.910Z",
  "updatedAt": "2023-02-09T00:06:26.977Z",
  "Followings": 1,
  "Followers": 0,
  "Links": [],
  "Github": null,
  "Discord": {
    "id": 1,
    "UserId": 2,
    "email": "callmeoniichandesu@gmail.com",
    "discordId": "286738605932675082",
    "username": "meh",
    "discriminator": 9634,
    "createdAt": "2023-02-09T00:05:53.985Z",
    "updatedAt": "2023-02-09T00:05:53.985Z"
  },
  "Spotify": null,
  "followed": false,
  "following": false
}
```

## GET /profile/:username/spotify

get currently playing song

_Response (200 - OK)_

<details>
<summary>Response JSON</summary>

```json
{
  "timestamp": 1675901832852,
  "context": null,
  "progress_ms": 15485,
  "item": {
    "album": {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/7Jc4sKtoPlx4K6JON5QeVu"
          },
          "href": "https://api.spotify.com/v1/artists/7Jc4sKtoPlx4K6JON5QeVu",
          "id": "7Jc4sKtoPlx4K6JON5QeVu",
          "name": "Mr.Tree",
          "type": "artist",
          "uri": "spotify:artist:7Jc4sKtoPlx4K6JON5QeVu"
        }
      ],
      "available_markets": [
        "AD",
        "AE",
        "AG",
        "AL",
        "AM",
        "AO",
        "AR",
        "AT",
        "AU",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BN",
        "BO",
        "BR",
        "BS",
        "BT",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CD",
        "CG",
        "CH",
        "CI",
        "CL",
        "CM",
        "CO",
        "CR",
        "CV",
        "CW",
        "CY",
        "CZ",
        "DE",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ES",
        "ET",
        "FI",
        "FJ",
        "FM",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GR",
        "GT",
        "GW",
        "GY",
        "HK",
        "HN",
        "HR",
        "HT",
        "HU",
        "ID",
        "IE",
        "IL",
        "IN",
        "IQ",
        "IS",
        "IT",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MG",
        "MH",
        "MK",
        "ML",
        "MN",
        "MO",
        "MR",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NE",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PG",
        "PH",
        "PK",
        "PL",
        "PS",
        "PT",
        "PW",
        "PY",
        "QA",
        "RO",
        "RS",
        "RW",
        "SA",
        "SB",
        "SC",
        "SE",
        "SG",
        "SI",
        "SK",
        "SL",
        "SM",
        "SN",
        "SR",
        "ST",
        "SV",
        "SZ",
        "TD",
        "TG",
        "TH",
        "TJ",
        "TL",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TW",
        "TZ",
        "UA",
        "UG",
        "US",
        "UY",
        "UZ",
        "VC",
        "VE",
        "VN",
        "VU",
        "WS",
        "XK",
        "ZA",
        "ZM",
        "ZW"
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/36iUk7by3NVgpSAn41aGxC"
      },
      "href": "https://api.spotify.com/v1/albums/36iUk7by3NVgpSAn41aGxC",
      "id": "36iUk7by3NVgpSAn41aGxC",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2736bfec169a7c1c80331bcae1c",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e026bfec169a7c1c80331bcae1c",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048516bfec169a7c1c80331bcae1c",
          "width": 64
        }
      ],
      "name": "Splitting",
      "release_date": "2013-02-17",
      "release_date_precision": "day",
      "total_tracks": 9,
      "type": "album",
      "uri": "spotify:album:36iUk7by3NVgpSAn41aGxC"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/7Jc4sKtoPlx4K6JON5QeVu"
        },
        "href": "https://api.spotify.com/v1/artists/7Jc4sKtoPlx4K6JON5QeVu",
        "id": "7Jc4sKtoPlx4K6JON5QeVu",
        "name": "Mr.Tree",
        "type": "artist",
        "uri": "spotify:artist:7Jc4sKtoPlx4K6JON5QeVu"
      }
    ],
    "available_markets": [
      "AD",
      "AE",
      "AG",
      "AL",
      "AM",
      "AO",
      "AR",
      "AT",
      "AU",
      "AZ",
      "BA",
      "BB",
      "BD",
      "BE",
      "BF",
      "BG",
      "BH",
      "BI",
      "BJ",
      "BN",
      "BO",
      "BR",
      "BS",
      "BT",
      "BW",
      "BY",
      "BZ",
      "CA",
      "CD",
      "CG",
      "CH",
      "CI",
      "CL",
      "CM",
      "CO",
      "CR",
      "CV",
      "CW",
      "CY",
      "CZ",
      "DE",
      "DJ",
      "DK",
      "DM",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "ES",
      "ET",
      "FI",
      "FJ",
      "FM",
      "FR",
      "GA",
      "GB",
      "GD",
      "GE",
      "GH",
      "GM",
      "GN",
      "GQ",
      "GR",
      "GT",
      "GW",
      "GY",
      "HK",
      "HN",
      "HR",
      "HT",
      "HU",
      "ID",
      "IE",
      "IL",
      "IN",
      "IQ",
      "IS",
      "IT",
      "JM",
      "JO",
      "JP",
      "KE",
      "KG",
      "KH",
      "KI",
      "KM",
      "KN",
      "KR",
      "KW",
      "KZ",
      "LA",
      "LB",
      "LC",
      "LI",
      "LK",
      "LR",
      "LS",
      "LT",
      "LU",
      "LV",
      "LY",
      "MA",
      "MC",
      "MD",
      "ME",
      "MG",
      "MH",
      "MK",
      "ML",
      "MN",
      "MO",
      "MR",
      "MT",
      "MU",
      "MV",
      "MW",
      "MX",
      "MY",
      "MZ",
      "NA",
      "NE",
      "NG",
      "NI",
      "NL",
      "NO",
      "NP",
      "NR",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PG",
      "PH",
      "PK",
      "PL",
      "PS",
      "PT",
      "PW",
      "PY",
      "QA",
      "RO",
      "RS",
      "RW",
      "SA",
      "SB",
      "SC",
      "SE",
      "SG",
      "SI",
      "SK",
      "SL",
      "SM",
      "SN",
      "SR",
      "ST",
      "SV",
      "SZ",
      "TD",
      "TG",
      "TH",
      "TJ",
      "TL",
      "TN",
      "TO",
      "TR",
      "TT",
      "TV",
      "TW",
      "TZ",
      "UA",
      "UG",
      "US",
      "UY",
      "UZ",
      "VC",
      "VE",
      "VN",
      "VU",
      "WS",
      "XK",
      "ZA",
      "ZM",
      "ZW"
    ],
    "disc_number": 1,
    "duration_ms": 227527,
    "explicit": true,
    "external_ids": { "isrc": "GBSMU7785167" },
    "external_urls": {
      "spotify": "https://open.spotify.com/track/1WywWkNZl1nThYsb1fiePZ"
    },
    "href": "https://api.spotify.com/v1/tracks/1WywWkNZl1nThYsb1fiePZ",
    "id": "1WywWkNZl1nThYsb1fiePZ",
    "is_local": false,
    "name": "Tully",
    "popularity": 36,
    "preview_url": "https://p.scdn.co/mp3-preview/e57bd716aee6712831bb670c082bdc314ed0b1e1?cid=92fd494820834f128226db53ecf45744",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:1WywWkNZl1nThYsb1fiePZ"
  },
  "currently_playing_type": "track",
  "actions": {
    "disallows": {
      "resuming": true,
      "toggling_repeat_context": true,
      "toggling_repeat_track": true,
      "toggling_shuffle": true
    }
  },
  "is_playing": true
}
```

</details>

## GET /:username/followings

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "0wx",
  "name": "Gilang Ramadhan",
  "profilePicture": "https://images2.imgbox.com/f4/1b/fD1ysVxw_o.jpg",
  "bio": "null",
  "background": "https://images2.imgbox.com/46/9d/OZlWettj_o.jpg",
  "createdAt": "2023-02-08T23:31:11.190Z",
  "updatedAt": "2023-02-08T23:55:21.151Z",
  "Followings": []
}
```

## GET /:username/followers

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "0wx",
  "name": "Gilang Ramadhan",
  "profilePicture": "https://images2.imgbox.com/f4/1b/fD1ysVxw_o.jpg",
  "bio": "null",
  "background": "https://images2.imgbox.com/46/9d/OZlWettj_o.jpg",
  "createdAt": "2023-02-08T23:31:11.190Z",
  "updatedAt": "2023-02-08T23:55:21.151Z",
  "Followers": []
}
```

## POST /:username/follow

Follow user

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
  "message": "Following {username}"
}
```

## DELETE /:username/follow

Unollow user

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
  "message": "Unfollowing {username}"
}
```

## POST /link

Add link

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
  "link": "string",
  "label": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "UserId": 2,
  "link": "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  "label": "teatttt",
  "logo": null,
  "updatedAt": "2023-02-09T00:26:31.589Z",
  "createdAt": "2023-02-09T00:26:31.589Z"
}
```

## GET /link/:id

_Response (200 - OK)_

```json
{
  "id": 4,
  "UserId": 2,
  "link": "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  "label": "teatttt",
  "logo": null,
  "updatedAt": "2023-02-09T00:26:31.589Z",
  "createdAt": "2023-02-09T00:26:31.589Z"
}
```

## PUT /link/:id

edit link

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "link": "string",
  "label": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "UserId": 2,
  "link": "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  "label": "teatttt",
  "logo": null,
  "updatedAt": "2023-02-09T00:26:31.589Z",
  "createdAt": "2023-02-09T00:26:31.589Z"
}
```

## DELETE /link/:id

_Response (200 - OK)_

```json
{ "message": "Link deleted" }
```

## GET /logs

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "page": "number"
}
```

_Response (200 - OK)_

```json
{
  "count": 5,
  "rows": [
    {
      "id": 5,
      "type": "created",
      "LinkId": 3,
      "UserId": 1,
      "createdAt": "2023-02-08T23:53:37.032Z",
      "updatedAt": "2023-02-08T23:53:37.032Z",
      "User": {
        "id": 1,
        "username": "0wx",
        "name": "Gilang Ramadhan",
        "profilePicture": "https://images2.imgbox.com/f4/1b/fD1ysVxw_o.jpg",
        "bio": "null",
        "background": "https://images2.imgbox.com/46/9d/OZlWettj_o.jpg",
        "createdAt": "2023-02-08T23:31:11.190Z",
        "updatedAt": "2023-02-08T23:55:21.151Z"
      },
      "Link": {
        "id": 3,
        "UserId": 1,
        "link": "https://coda.io/d/Phase-2-Buddy-Ganang_dk8qGsagrom/Gilang-Ramadhan_suRIp#_luy6_",
        "label": "Buddy Ganang Coda",
        "logo": null,
        "createdAt": "2023-02-08T23:53:36.965Z",
        "updatedAt": "2023-02-08T23:53:36.965Z"
      }
    }
  ]
}
```

## GET /user

get user information

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "username": "meh",
  "name": "mehz",
  "profilePicture": "https://images2.imgbox.com/cd/9b/xS9npXWE_o.jpeg",
  "bio": "null",
  "background": null,
  "createdAt": "2023-02-09T00:05:53.910Z",
  "updatedAt": "2023-02-09T00:35:04.986Z",
  "Followings": 1,
  "Followers": 0,
  "Links": [],
  "Github": null,
  "Discord": {
    "id": 1,
    "UserId": 2,
    "email": "callmeoniichandesu@gmail.com",
    "discordId": "286738605932675082",
    "username": "meh",
    "discriminator": 9634,
    "createdAt": "2023-02-09T00:05:53.985Z",
    "updatedAt": "2023-02-09T00:05:53.985Z"
  },
  "Spotify": null,
  "followed": false,
  "following": false
}
```

## PUT /user

Edit user information

- Body

```json
{
  "id": 2,
  "username": "string",
  "name": "string",
  "profilePicture": (binary),
  "bio": "string",
  "background": (binary),
}
```

_Response (200 - OK)_

```json
{ 
  "message": "Updated!" 
}
```


## Global Error
#### Response
_500 - internal server error_
```json
{
  "message": "Internal server error"
}
```

_401 - unauthorized_
```json
{
  "message": "Unauthorized"
}
```

_403 - forbidden_
```json
{
  "message": "Forbidden"
}
```

_404 - not found_
```json
{
  "message": "Not found"
}
```

_400 - bad request_
```json
{
  "message": "Bad request"
}
```
