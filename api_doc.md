# Movie API Documentation

## Endpoints :

List of available endpoints:


USER : 
- `POST /user/register`
- `POST /user/login`
- `POST /user/google-sign-in`
- `PATCH /user/subscription`
- `POST /user/generate-midtrans-token`

&nbsp;

FETCHING NEWS : 
- `GET  /news`
- `GET /news/podcast`
- `GET  /news/search?search=seachParameter`
- `GET  /news/games`
- `GET  /news/games/search?search=`
- `GET  /news/tech`


&nbsp;

PLAYLIST : 
- `POST  /playlist`
- `GET  /playlist`
- `DELETE  /playlist`


&nbsp;

## USER
## 1. POST /user/register

Request:
- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string"
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
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /user/google-sign-in

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
  "username": "string",
}
```

_Response (201 - Create)_
```json
{
    "access_token": "string",
    "username": "string",
    "role": "string",

}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /user/login

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
  "username": "string",
  "role": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;
## 4. PATCH /user/subscription

Request:
- headers: 

```json
{
  "access_token": "string"
}
```


_Response (201 - updated)_

```json
{
    "msg": `status has been succesfuly updated`
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 5. POST /user/generate-midtrans-token

Request:
- headers: 

```json
{
  "access_token": "string"
}
```


_Response (201 - updated)_

```json
{
    "midtransToken": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## NEWS 
## 1. GET /news

Description:
- Get all news

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
   "status": "ok",
    "totalResults": 1533,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Moz.com"
            },
            "author": "Emilie Martin",
            "title": "Daily SEO Fix: Investigating Keyword Cannibalization",
            "description": "In this Daily SEO Fix edition, we take you through what keyword cannibalization is, how to investigate it on your own website, and how to solve any potential issues your site may have.",
            "url": "https://moz.com/blog/daily-seo-fix-investigating-keyword-cannibalization",
            "urlToImage": "https://moz.com/images/cms/6042b901d424f8.96940036_2021-04-15-230656.png?w=1200&h=630&q=82&auto=format&fit=crop&dm=1618528016&s=b298c4d810e8e8ad23b1fc18e845f64e",
            "publishedAt": "2023-01-23T08:00:00Z",
            "content": "Keyword cannibalization occurs when a website has too many similar keywords spread throughout the various pages on that site. This can harm the SEO potential of the pages involved, and can quite ofte… [+1550 chars]"
        },
        ....
    ]
  }
  ...,
]
```

&nbsp;
## 2. GET /podcast

Description:
- Get all podcast

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
   "status": 200,
    "featured_podcast": {
        "link": "https://jakpost.vercel.app/api/detailpodcast/multimedia/2023/01/31/singing-songs-of-rebels-rice-and-romance-in-chinas-lower-yangtze-delta",
        "title": "Singing songs of rebels, rice and romance in China’s lower Yangtze Delta",
        "image": "https://img.jakpost.net/c/2023/01/31/2023_01_31_135042_1675138836._small.jpg",
        "duration": "47:26",
        "published_at": "1 week ago"
    },
    "podcast": [
        {
            "link": "https://jakpost.vercel.app/api/detailpodcast/multimedia/2023/01/12/a-changed-hong-kong-under-chinas-national-security-law",
            "title": "A changed Hong Kong under China’s national security law",
            "image": "https://img.jakpost.net/c/2023/01/12/2023_01_12_134399_1673492633._small.jpg",
            "duration": "52:45",
            "published_at": "3 weeks ago"
        },
        ....
    ]
  }
  ...,
]
```

&nbsp;
## 3. GET /search

Description:
- Get search news

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
    "seachParameter" : "any string"
}

```

_Response (200 - OK)_

```json
[
  {
   "status": 200,
    "important": "headline return markdown, you should use markdown parser like react-markdown, markdown-it, markedjs and etc",
    "data": [
        {
            "link": "https://jakpost.vercel.app/api/detailpost/",
            "title": "The Jakarta Post - Still bold, fiercely independent",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-NPcOsSJxy76H2QVBmSP8vf2RgHn3_3H171qc9YdQOyDjKKFWqPfQbvI",
            "headline": "In **Indonesia**, as in many other parts of the world, media freedom continues to ... Extra work, less fun: **Indonesian** students talk surviving inflation abroad.",
            "premium_badge": "not premium"
        },...
    ]
  }
  ...,
]
```

&nbsp;
## 4. GET /games

Description:
- Get games news

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
    "category" : "console game",
    "category" : "e-sport",
    "category" : "news",
    "category" : "lazy-talk",
    "category" : "pc",
    "category" : "review",
}

```

_Response (200 - OK)_

```json
[
  {
        "title": "The Day Before Buktikan Game-nya Nyata Lewat Gameplay 10 Menit!",
        "thumb": "https://thelazy.media/wp-content/uploads/2023/02/Artboard-1-1-218x150.png",
        "author": "Teo Ariesda",
        "tag": "Games",
        "time": "February 3, 2023",
        "desc": "Trailer gameplay ini merupakan jawaban dari pemberitaan miring game The Day Before yang dianggap hanya tipu-tipu belaka!\n\nhttps://youtu.be/fGLCpcF_jX8\nGameplay Terbaru The Day Before Tampilkan Eksplorasi Pada Saat Pagi dan Malam Hari!\n \n\nSepertinya kurang...",
        "key": "2023/02/03/the-day-before-03022023"
    },
    {
        "title": "Hogwarts Legacy Kembali Rilis Trailer Jelang Tanggal Perilisan!",
        "thumb": "https://thelazy.media/wp-content/uploads/2023/02/Artboard-15-218x150.png",
        "author": "Teo Ariesda",
        "tag": "Games",
        "time": "February 2, 2023",
        "desc": "Game yang diadaptasi dari seri novel dan film Harry Potter berjudul Hogwarts Legacy ini kembali merilis sebuah trailer jelang perilisan game-nya di tanggal 10 Februari mendatang!\n\nhttps://youtu.be/BtyBjOW8sGY\n\nBerbagai macam hal yang ditampilkan dalam...",
        "key": "2023/02/02/hogwarts-legacy-02022023"
    },
  ...,
]
```

&nbsp;
## 5. GET /games/search

Description:
- Get search games news

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- query:
```json
{
    "search" : "any string",
}

```

_Response (200 - OK)_

```json
[
 {
        "title": "Star Wars Jedi Survivor Rilis Gameplay Selama 9 Menit!",
        "thumb": "https://thelazy.media/wp-content/uploads/2023/02/Artboard-7-3-150x150.png",
        "author": "Teo Ariesda",
        "tag": "Game News",
        "time": "February 8, 2023",
        "desc": "Petualangan Cal Kestis dalam sebagai Jedi kembali dilanjut melalui video gameplay Star Wars Jedi Survivor selama 9 menit dari IGN!\n\nhttps://youtu.be/i05L-FaDhko\n\nVideo tersebut menampilkan sedikit aksi...",
        "key": "2023/02/08/star-wars-jedi-survivor-08022023"
    },
    {
        "title": "Resident Evil 4 Remake Bagikan Video Gameplay Selama 12 Menit!",
        "thumb": "https://thelazy.media/wp-content/uploads/2023/02/Artboard-6-2-150x150.png",
        "author": "Teo Ariesda",
        "tag": "Game News",
        "time": "February 7, 2023",
        "desc": "Dikutip dari Game Informer, media yang sebelumnya juga membagikan konten ekslusif untuk God of War: Ragnarok, di mana kali ini mereka  mendapat giliran untuk...",
        "key": "2023/02/07/resident-evil-4-remake-07022023"
    },
  ...,
]
```

&nbsp;
## 6. GET /tech

Description:
- Get search tech news

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- query:
```json
{
    "subCategory" : "news",
    "subCategory" : "setup",
    "subCategory" : "recommend",
    "subCategory" : "review",
    "subCategory" : "tip",
}

```

_Response (200 - OK)_

```json
[
  {
        "title": "GIGABYTE Luncurkan Kartu Grafis AORUS Terbaru Berbasis NVIDIA GeForce RTX 40 Series!",
        "thumb": "https://thelazy.media/wp-content/uploads/2022/09/40_1920x900-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech",
        "time": "October 3, 2022",
        "desc": "Selasa, 20 September 2022 - GIGABYTE, umumkan kartu grafis terbaru berbasis Nvidia GeForce RTX 40 series! Lini kartu grafis yang sudah ditunggu-tunggu kedatangannya ini akhirnya tiba untuk memenuhi performa teknologi generasi...",
        "key": "2022/10/03/gigabyte-28082022"
    },
    {
        "title": "Zenbook 14X OLED Space Edition, Laptop Minimalis Spek Gahar!",
        "thumb": "https://thelazy.media/wp-content/uploads/2022/09/Zenbook-14X-OLED-Space-Edition_UX5401ZAS_Scenario-Photo_08.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech",
        "time": "September 15, 2022",
        "desc": "Zenbook 14X OLED Space Edition adalah laptop yang bisa dibilang menjadi statement dari designer di ASUS, pondasi dari laptop ini sebenarnya Zenbook 14X OLED biasa yang dimake over total menjadi “ganteng”...",
        "key": "2022/09/15/zenbook-14x-oled-space-edition"
    },
  ...,
]
```

&nbsp;




&nbsp;

## Playlist
## 1. GET /playlist

Description:
- Get all current user playlist 
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
  [
    {
        "id": 10,
        "UserId": 1,
        "PlaylistId": 10,
        "createdAt": "2023-02-08T18:09:14.350Z",
        "updatedAt": "2023-02-08T18:09:14.350Z",
        "Playlist": {
            "id": 10,
            "title": "The rise and rise of halal consumerism in Indonesiaasd1212312312312412 dfwdasf s",
            "image": "https://img.jakpost.net/c/2022/11/17/2022_11_17_132335_1668655081._large.jpg",
            "audio": "https://img.jakpost.net/podcast/2022/ai_eta_20221117_indonesia_halal_consumerism_128kbps.mp3",
            "post_content": "Muslims in Indonesia are increasingly seeking to align their consumption with their religious beliefs. The push comes from a growing urban middle class who have greater access to global products and services. At the same time, Indonesia’s halal product assurance law, which came into effect in 2019, is being phased in across a wide range of goods and services. In a world awash with consumerism, what does halal certification mean for Muslims? And how do these economic choices play into the political landscape? Indonesia watchers Professor Julian Millie and Dr Inaya Rakhmani examine the trajectory of Indonesia’s halal consumerism with presenter Ali Moore. An Asia Institute podcast. Produced and edited by profactual.com. Music by audionautix.com.",
            "published_at": "Thu, November 17, 2022 ● 10:11 am",
            "createdAt": "2023-02-08T18:04:02.537Z",
            "updatedAt": "2023-02-08T18:04:02.537Z"
        }
    }
]
]
```

&nbsp;
## 2. POST /playlist

Description:
- add podcast to current user playlist and if podcast not available create podcast to database 
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
  "image": "string",
  "audio": "string",
  "post_content": "string",
  "published_at": "string",
}
```

_Response (200 - OK)_

```json
[
    [
    "msg": `success adding to favorite`
    ]
]
```
_Response (400 - bad-request)_

```json
{
    "message": "movie already favorited"
}

```


&nbsp;
## 2. DELETE /playlist

Description:
- remove podcast to current user playlist 
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
  "PlaylistId": "integer",
  "UserPlaylistId": "integer",
}
```

_Response (200 - OK)_

```json
{
    "message": "Successfuly removed"
}


```

_Response (400 - bad-request)_

```json
{
    "message": "Playlist alread removed"
}

```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```