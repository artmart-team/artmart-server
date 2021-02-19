Get review by artist id (contoh by artist id 1)

GET /artists/:artistId/reviews

```
[
  {
    "id" : 1,
    "title" : "What a great artist",
    "description" : "I commissioned 6 hours ago, and it's done already",
    "artistId" : 1,
    "userId": 1,
  },
  {
    "id" : 2,
    "title" : "Very friendly",
    "description" : "Nice guy, easy to communicate what i want",
    "artistId" : 1,
    "userId": 2,
  }
]
```

Post review by user id (contoh by user id 3 to artist id 1)

POST /users/:userId/artists/:artistId/reviews

body
```
{
  "title" : "Fast response, flexible",
  "description" : "Allowed me to customize the request in-depth"
}
```

response
```
{
  "title" : "Fast response, flexible",
  "description" : "Allowed me to customize the request in-depth",
  "artistId" : 1,
  "userId": 3,
}
```


Put review by user id (contoh by user id 3 to artist id 1)

PUT /users/:userId/artists/:artistId/reviews

body
```
{
  "title" : "Fast response, flexible, perfect delivery time too",
  "description" : "Allowed me to customize the request in-depth"
}
```

response
```
{
  "title" : "Fast response, flexible, perfect delivery time too",
  "description" : "Allowed me to customize the request in-depth",
  "artistId" : 1,
  "userId": 3,
}
```

Delete review by user id (contoh by user id 3)

DELETE /users/:userId/artists/:artistId/reviews

response
```
{
  "messages": 'reviews for artist id 1 from user id 3 deleted'
}
```