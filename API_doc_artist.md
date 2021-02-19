--------------------------------------------------------
GET /artists/:artisId

if artistId = 1

// success

{
    "id" : 1,
    "username" : "artist",
    "firstName" : "art",
    "lastName" : "ist",
    "email" : "artist@mail.com",
    "completeDuration" : 48
}


// error id not found

{
    "message" : "artist Id not found"
}

// error internal server

{
    "message" : "error in internal server"
}

--------------------------------------------------------
POST /artists/register

SEND BODY

{
    "username" : "artist",
    "firstName" : "art",
    "lastName" : "ist",
    "email" : "artist@mail.com",
    "password" : "!23456",
    "completeDuration" : 48
}


RESPONSE

// success

{
    "id" : 1,
    "username" : "artist",
    "firstName" : "art",
    "lastName" : "ist",
    "email" : "artist@mail.com",
    "completeDuration" : 48
}

// error username empty

{
    "message" : "username must filled"
}

// error firstName empty

{
    "message" : "firstName must filled"
}

// error lastname empty

{
    "message" : "lastName must filled"
}

// error email empty

{
    "message" : "email must filled"
}

// error email not email format

{
    "message" : "email must be email format"
}

// error password empty

{
    "message" : "password must filled"
}

// error internal server

{
    "message" : "error in internal server"
}


--------------------------------------------------------
POST /artists/login


SEND BODY

{
    "username" : "artists",
    "password" : "!23456"
}


RESPONSE

// success

{
    "accss_token" : access_token
}

// error username / password not found

{
    "message" : "username or password not found"
}

// error username empty

{
    "message" : "firstName must filled"
}

// error password empty

{
    "message" : "lastName must filled"
}

// error internal server

{
    "message" : "error in internal server"
}


--------------------------------------------------------
PATCH /artists/:artistId

if artist Id = 1

SEND BODY

{
    "username" : "artistuser"
}

//or

{
    "email" : "artistuser@mail.com"
}

//or

{
    "firstName" : "artist"
}

//or

{
    "lastName" : "user"
}


RESPONSE

//success

{
    "id" : 1,
    "username" : "artistuser",
    "firstName" : "artist",
    "lastName" : "user",
    "email" : "artistuser@mail.com",
    "completeDuration" : 48
}

// error username empty

{
    "message" : "username must filled"
}

// error firstName empty

{
    "message" : "firstName must filled"
}

// error lastname empty

{
    "message" : "lastName must filled"
}

// error email empty

{
    "message" : "email must filled"
}

// error email not email format

{
    "message" : "email must be email format"
}

// error internal server

{
    "message" : "error in internal server"
}