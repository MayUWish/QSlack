from .db import db
from sqlalchemy.sql import func
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

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'media': self.media,
            'userId': self.userId,
            "time_created": self.createdAt,

            "user": self.user.to_dict(),
            
            "comments": [comment.to_dict() for comment in self.comments],
           
            "likes": [like.to_dict() for like in self.likes],
          
            
        }
