from .db import db
from datetime import datetime


class Moment(db.Model):
    __tablename__ = 'moments'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    media = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    # many to one user
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='moments')

    # one to many likes
    likes = db.relationship(
        'Like', back_populates='moment', cascade="all, delete")
    # one to many comments
    comments = db.relationship(
        'Comment', back_populates='moment', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'media': self.media,
            'userId': self.userId,
            "time_created": self.createdAt,
            "user": self.user.to_dict(),
            "likes": [like.to_dict() for like in self.likes],
            "comments": [comment.to_dict() for comment in self.comments]
        }
