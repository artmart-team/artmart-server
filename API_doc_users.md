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
}


// error id not found

{
    "errors" : "user Id not found"
}

// error internal server

{
    "errors" : "error in internal server"
}

--------------------------------------------------------
POST /users/register

SEND BODY

{
    "username" : "username",
    "firstName" : "user",
    "lastName" : "name",
    "email" : "user@mail.com",
    "password" : "!23456",
    "profilePicture" : "link/google.com"
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
    "errors" : "username required"
}

// error firstName empty

{
    "errors" : "firstName required"
}

// error lastname empty

{
    "errors" : "lastName required"
}

// error email empty

{
    "errors" : "email required"
}

// error email not email format

{
    "errors" : "email must be email format"
}

// error password empty

{
    "errors" : "password required"
}

// error internal server

{
    "errors" : "error in internal server"
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
    "accss_token" : access_token,
    "id" : 1,
    "username" : "username"
}

// error username / password not found

{
    "errors" : "username or password not found"
}

// error username empty

{
    "errors" : "username required"
}

// error password empty

{
    "errors" : "password required"
}

// error internal server

{
    "errors" : "error in internal server"
}


--------------------------------------------------------
PUT /users/:userId

if user Id = 1

SEND BODY

{
    "username" : "userofusername",
    "email" : "username@mail.com",
    "firstName" : "user",
    "lastName" : "username",
    "profilePicture" : "link2.google.com"
}


RESPONSE

//success

{
    "id" : 1,
    "username" : "userofusername",
    "firstName" : "user",
    "lastName" : "username",
    "email" : "username@mail.com",
    "profilePicture" : "link.google.com"
}

// error username empty

{
    "errors" : "username required"
}

// error firstName empty

{
    "errors" : "firstName required"
}

// error lastname empty

{
    "errors" : "lastName required"
}

// error email empty

{
    "errors" : "email required"
}

// error email not email format

{
    "errors" : "email must be email format"
}

// error not login user

{
    "errors" : "please login first"
}

// error internal server

{
    "errors" : "error in internal server"
}