Get rating by artist id (contoh by artist id 1)

GET /artists/:artistId/comments

```
[
  {
    "id" : 1,
    "description" : "keren mantap abis tuh", // string
    "artistId" : 1,
    "userId": 1,
  },
  {
    "id" : 2,
    "description" : "keren mantap abis tuh 2", // string
    "artistId" : 1,
    "userId": 1,
  },
  {
    "id" : 3,
    "description" : "keren mantap abis tuh 3", // string
    "artistId" : 1,
    "userId": 1,
  }
]
```



POST /users/:userId/artists/:artistId/comments

if userId = 1
if artistId = 1

body
```
{
  description: "kayanya keren"
}
```

response
```
{
  "id" : 2,
  "description" : "kayanya keren", 
  "artistId" : 1,
  "userId": 1,
}
```

Patch comments by user id
(contoh user id 1 patch ratings artist id 1)

PATCH /users/:userId/artists/:artistId/comments/:commentId

body
```
{
  description: "ternyata udah keren"
}
```

response
```
{
  "id" : 2,
  description: "ternyata udah keren"
  "artistId" : 1,
  "userId": 1,
}
```

Delete rating by user id
(contoh user id 1 delete comments artist id 1)

DELETE /users/:userId/artists/:artistId/ratings/:commentId

response
```
{
  "messages": 'comment artist id 1 from user id 1 deleted'
}
```