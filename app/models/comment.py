from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())

    # many comments to one moment
    momentId = db.Column(db.Integer, db.ForeignKey(
        'moments.id'), nullable=False)
    moment = db.relationship('Moment', back_populates='comments')
    # many comments to one user
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='comments')

    comment = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'momentId': self.momentId,
            'userId': self.userId,
            'comment': self.comment,
            'user': self.user.to_dict(),
            'createdAt': self.createdAt
        }
