GET /categories

```
[
  {
    "id" : 1,
    "name" : "Cartoon"
  },
  {
    "id" : 2,
    "name" : "Realism"
  },
  {
    "id" : 3,
    "name" : "Design"
  },
  {
    "id" : 4,
    "name" : "Anime"
  },
  {
    "id" : 5,
    "name" : "Abstract"
  }
]
```

Get order by orderId (contoh by orderId 1)

GET /orders/:orderId

```
{
  "id" : 1,
  "title" : "Halooo",
  "description" : "bikin kyk yang ini ya tapi blablabal", // boleh kosong
  "refImageId": "2", // boleh kosong
  "duration" : 48, // 1 point 1 jam
  "price" : 50000,  //price from refImage
  "totalPrice" : 75000,  //price from refImage + options
  "accepted" : true,
  "done" : true,
  "paid" : false,
  "imageURL" : "", // boleh kosong, terisi ketika artist klik done
  "userId" : 1,
  "artistId" : 1,
}
```


Get All orders by user id (contoh by user id 1)

GET /users/:userId/orders

```
[
  {
    "id" : 1,
    "title" : "Halooo",
    "description" : "bikin kyk yang ini ya tapi blablabal", // boleh kosong
    "refImageId": "2", // boleh kosong
    "duration" : 48, // 1 point 1 jam
    "price" : 50000,  //price from refImage
    "totalPrice" : 75000,  //price from refImage + options
    "accepted" : true,
    "done" : true,
    "paid" : false,
    "imageURL" : "", // boleh kosong, terisi ketika artist klik done
    "userId" : 1,
    "artistId" : 1,
  },
    {
    "id" : 2,
    "title" : "A simple commission",
    "description" : "bebas deh, pokoknya bagus", // boleh kosong
    "refImageId": "", // boleh kosong
    "duration" : 48, // 1 point 1 jam
    "price" : 50000,  //price from refImage
    "totalPrice" : 75000,  //price from refImage + options
    "accepted" : true,
    "done" : false,
    "paid" : false,
    "imageURL" : "", // boleh kosong, terisi ketika artist klik done
    "userId" : 1,
    "artistId" : 2,
  }
]
```


Get All orders by artist id (contoh by artist id 2)

GET /artists/:artistId/orders

```
[
  {
    "id" : 1,
    "title" : "Need art with your style",
    "description" : "", //description boleh kosong,
    "refImageId": "3", // boleh kosong
    "duration" : 48, // 1 point 1 jam
    "price" : 50000,  //price from refImage
    "totalPrice" : 75000,  //price from refImage + options
    "accepted" : false,
    "done" : false,
    "paid" : false,
    "imageURL" : "", // boleh kosong, terisi ketika artist klik done
    "userId" : 4,
    "artistId" : 2,
  },
  {
    "id" : 2,
    "title" : "A simple commission",
    "description" : "bebas deh, pokoknya bagus", //description boleh kosong
    "refImageId": "", // boleh kosong
    "duration" : 48, // 1 point 1 jam
    "price" : 50000,  //price from refImage
    "totalPrice" : 75000,  //price from refImage + options
    "accepted" : true,
    "done" : false,
    "paid" : false,
    "imageURL" : "", // boleh kosong, terisi ketika artist klik done
    "userId" : 1,
    "artistId" : 2,
  }
]
```


Edit order title, description // only user allowed, user can only edit when accepted === false

PUT /users/:userId/orders/:orderId

body 
```
{
  "title" : "Need art with your style pleasee",
  "description": "I need it right now",
}
```

response
```
{
  "id" : 1,
  "title" : "Need art with your style pleasee",
  "description" : "I need it right now",
  "refImageId": "3", // boleh kosong
  "duration" : 48, // 1 point 1 jam
  "price" : 50000,  //price from refImage
  "totalPrice" : 75000,  //price from refImage + options
  "accepted" : false,
  "done" : false,
  "paid" : false,
  "imageURL" : "", // boleh kosong, terisi ketika artist klik done
  "userId" : 4,
  "artistId" : 2,
}
```


Artists accepts the order

PATCH /artists/:artistId/orders/:orderId/accepted

response
```
{
  "id" : 1,
  "title" : "Need art with your style pleasee",
  "description" : "I need it right now",
  "refImageId": "3", // boleh kosong
  "duration" : 48, // 1 point 1 jam
  "price" : 50000,  //price from refImage
  "totalPrice" : 75000,  //price from refImage + options
  "accepted" : true, // << tadinya false jadi true,
  "done" : false,
  "paid" : false,
  "imageURL" : "", // boleh kosong, terisi ketika artist klik done
  "userId" : 4,
  "artistId" : 2,
}
```

Artists completed the request >> press done >> akan ada form untuk upload >> setelah masuk firebase (server yg nampung image) >> balikan firebase berupa link >> langsung hit PATCH /artists/:artistId/orders/:orderId/done

PATCH /artists/:artistId/orders/:orderId/done

body
```
{
  "imageURL" : "www.image.com/11",
}
```

response
```
{
  "id" : 1,
  "title" : "Need art with your style pleasee",
  "description" : "I need it right now",
  "refImageId": "3", // boleh kosong
  "duration" : 48, // 1 point 1 jam
  "price" : 50000,  //price from refImage
  "totalPrice" : 75000,  //price from refImage + options
  "accepted" : true,
  "done" : true, // << tadinya false jadi true
  "paid" : false, 
  "imageURL" : "www.image.com/11", // << tadinya kosong (selama belum paid dikasih watermark nutupin gambar)
  "userId" : 4,
  "artistId" : 2,
}
```

User pays the bill

PATCH /users/:userId/orders/:orderId/paid

response
```
{
  "id" : 1,
  "title" : "Need art with your style pleasee",
  "description" : "I need it right now",
  "refImageId": "3", // boleh kosong
  "duration" : 48, // 1 point 1 jam
  "price" : 50000,  //price from refImage
  "totalPrice" : 75000,  //price from refImage + options
  "accepted" : true,
  "done" : true, 
  "paid" : true, // << tadinya false jadi true
  "imageURL" : "www.image.com/11",
  "userId" : 4,
  "artistId" : 2,
}
```