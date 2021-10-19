
// Creating tables
Table Users {
  id int [pk, increment] 
  username varchar
  email varchar
  hashed_password varchar
  biography  varchar
  profilePic varchar
  createdAt timestamp
  updatedAt timestamp

}

Table Groups {
  id int [pk, increment]
  adminId int
  isDM boolean
  name varchar
  description varchar
  createdAt timestamp
  updatedAt timestamp

}


Table Membership {
  id int [pk, increment]
  userId int
  groupId int
  createdAt timestamp
  updatedAt timestamp

}

Table Messages {
  id int [pk, increment]
  userId int
  groupId int
  message varchar
  createdAt timestamp
  updatedAt timestamp

}

Table Moments {
  id int [pk, increment]
  userId int
  media varchar
  description varchar
  createdAt timestamp
  updatedAt timestamp

}
 
Table Comments {
  id int [pk, increment] 
  momentId int
  userId int
  comment varchar
  createdAt timestamp
  updatedAt timestamp
}

 
Table Likes {
  id int [pk, increment] 
  momentId int
  userId int
}


 

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
Ref: Groups.adminId > Users.id

Ref: Membership.userId > Users.id
Ref: Membership.groupId > Groups.id

Ref: Messages.groupId > Groups.id
Ref: Messages.userId > Users.id


Ref: Moments.userId > Users.id

Ref: Comments.userId > Users.id
Ref: Comments.momentId > Moments.id

Ref: Likes.userId > Users.id
Ref: Likes.momentId > Moments.id

