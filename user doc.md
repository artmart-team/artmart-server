--------------------------------------------------------
GET /user/:userId

if userId = 1

// success

{
    "id" : 1,
    "username" : "username",
    "firstName" : "user",
    "lastName" : "name",
    "email" : "user@mail.com",
    "password" : "!23456"
}


// error id not found

{
    "message" : "user Id not found"
}

// error internal server

{
    "message" : "error in internal server"
}

--------------------------------------------------------
POST /users/register

SEND BODY

{
    "username" : "username",
    "firstName" : "user",
    "lastName" : "name",
    "email" : "user@mail.com",
    "password" : "!23456"
}


RESPONSE

// success

{
    "id" : 1,
    "username" : "username",
    "firstName" : "user",
    "lastName" : "name",
    "email" : "user@mail.com"
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
POST /users/login


SEND BODY

{
    "username" : "username",
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
PATCH /users/:userId

if user Id = 1

SEND BODY

{
    "username" : "userofusername"
}

//or

{
    "email" : "username@mail.com"
}

//or

{
    "firstName" : "user"
}

//or

{
    "lastName" : "username"
}


RESPONSE

//success

{
    "id" : 1,
    "username" : "userofusername",
    "firstName" : "user",
    "lastName" : "username",
    "email" : "username@mail.com"
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