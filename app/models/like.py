from .db import db
from datetime import datetime


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())

    # many likes to one moment
    momentId = db.Column(db.Integer, db.ForeignKey(
        'moments.id'), nullable=False)
    moment = db.relationship('Moment', back_populates='likes')
    # many likes to one user
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'momentId': self.momentId,
            'userId': self.userId,
        }
