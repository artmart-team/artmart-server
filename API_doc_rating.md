Get rating by artist id (contoh by artist id 1)

GET /artists/:artistId/ratings

```
[
  {
    "id" : 1,
    "score" : 3.5, // angka float 0-5
    "artistId" : 1,
    "userId": 1,
  },
   {
    "id" : 2,
    "score" : 4, // angka float 0-5
    "artistId" : 1,
    "userId": 2,
  },
  {
    "id" : 3,
    "score" : 3, // angka float 0-5
    "artistId" : 1,
    "userId": 3,
  }
]
```

Post rating by user id // 1 userId tidak boleh vote artistId yang sama
(contoh user id 5 post ratings artist id 1)

POST /users/:userId/artists/:artistId/ratings

body
```
{
  score: 4.5
}
```

response
```
{
  "id" : 4,
  "score" : 4, // angka float 0-5
  "artistId" : 1,
  "userId": 5,
}
```

Patch rating by user id
(contoh user id 5 patch ratings artist id 1)

PATCH /users/:userId/artists/:artistId/ratings

body
```
{
  score: 5
}
```

response
```
{
  "id" : 4,
  "score" : 5, // << tadinya 4
  "artistId" : 1,
  "userId": 5,
}
```

Delete rating by user id
(contoh user id 5 delete ratings artist id 1)

DELETE /users/:userId/artists/:artistId/ratings

response
```
{
  "messages": 'ratings for artist id 1 from user id 5 deleted'
}
```