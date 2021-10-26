from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

memberships = db.Table(
    "memberships",
    db.Column("userId", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("groupId", db.Integer, db.ForeignKey(
        "groups.id"), primary_key=True),
    db.Column("createdAt", db.DateTime, nullable=False,
              default=datetime.now()),
    db.Column("updatedAt", db.DateTime, nullable=False, default=datetime.now())
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String, nullable=True)
    profilePic = db.Column(db.String, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())

    # on to many groups created by the user
    groupsOwned = db.relationship(
        'Group', back_populates='admin', cascade="all, delete")
    # many users to many groups through memberships
    groupsJoined = db.relationship(
        "Group", back_populates="members", secondary=memberships)
    # one to many messages created by the user
    messages = db.relationship(
        'Message', back_populates='user', cascade="all, delete")
    # one to many moments created by the user
    moments = db.relationship(
        'Moment', back_populates='user', cascade="all, delete")
    # one to many likes created by the user
    likes = db.relationship(
        'Like', back_populates='user', cascade="all, delete")
    # one to many comments created by the user
    comments = db.relationship(
        'Comment', back_populates='user', cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'biography': self.biography,
            'profilePic': self.profilePic,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            # "groupsOwned": [group.to_dict() for group in self.groupsOwned],
            # "groupsJoined": [group.to_dict() for group in self.groupsJoined],
            "messages": [m.to_dict() for m in self.messages],
            "likedMomentId": [like.momentId for like in self.likes],
        }
