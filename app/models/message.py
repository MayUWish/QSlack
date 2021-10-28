from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.utcnow())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.utcnow())
    # many messages to one user
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    user = db.relationship('User', back_populates='messages')
    # many messages to one group
    groupId = db.Column(db.Integer, db.ForeignKey(
        "groups.id"), nullable=False)
    group = db.relationship('Group', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            "userId": self.userId,
            "groupId": self.groupId,
            'message': self.message,
            'createdAt': self.createdAt,
            "updatedAt": self.updatedAt,
        }
