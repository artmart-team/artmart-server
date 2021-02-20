// from user router

// describe GET /users/:userId/orders   //comment artisnya
// -- it success
// -- it error not found 

// describe GET /users/:userId/comments/:commentId
// -- it success
// -- it error user not login
// -- it error comment id not found 

// decribe POST /users/:userId/comments
// -- it success
// -- it error description empty
// -- it error artis id not found
// -- it error artis Id empty

// decribe PATCH /users/:userId/comments/:commentId   // updating title commnet or desciption
// -- it success 
// -- it error description empty
// -- it error not login user

// describe DELETE /users/:userId/comments/:commentId
// -- it success
// -- it error comment id not found
// -- it error not login user



// ==============================================================
// ==============================================================
// ==============================================================

// from artis router

// describe GET //:artistId/orders   //comment artisnya
// -- it success
// -- it error not found 

// describe GET /artists/:artistId/comments/:commentId
// -- it success
// -- it error user not login
// -- it error comment id not found 

// decribe POST /artists/:artistId/comments
// -- it success
// -- it error description empty
// -- it error artis id not found
// -- it error artis Id empty

// decribe PATCH /artists/:artistId/comments/:commentId   // updating title commnet or desciption
// -- it success 
// -- it error description empty
// -- it error not login user

// describe DELETE /artists/:artistId/comments/:commentId
// -- it success
// -- it error comment id not found
// -- it error not login user