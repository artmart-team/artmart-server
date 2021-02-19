Get all option by artist id (contoh by artist id 1)

GET /artists/:artistId/options

```
[
  {
    "id" : 1,
    "title" : "4K Resolution"
    "extraPrice" : 25000, // type: double
    "artistId": 1
  },
  {
    "id" : 3,
    "title" : "Full Body"
    "extraPrice" : 50000, // type: double
    "artistId": 1
  }
]
```

Add option by artist id (contoh by artist id 1)

POST /artists/:artistId/options

body
```
{
  "title" : "4K Resolution"
  "extraPrice" : 25000, // type: double
}
```

response
```
{
  "id" : 1,
  "title" : "4K Resolution"
  "extraPrice" : 25000, // type: double
  "artistId": 1
}
```

Edit option by artist id (contoh by artist id 1)

PUT /artists/:artistId/options/:optionId

body
```
{
  "title" : "Quad-HD Resolution"
  "extraPrice" : 25000, // type: double
}
```

response
```
{
  "id" : 1,
  "title" : "Quad-HD Resolution"
  "extraPrice" : 25000, // type: double
  "artistId": 1
}
```


Delete option by artist id (contoh by artist id 1)

DELETE /artists/:artistId/options/:optionId

response
```
{
  "messages": "Options <option title> deleted from artist id <artistId>"
}
```