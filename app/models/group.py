from .db import db
from datetime import datetime
from .user import memberships


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    isDM = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String)
    description = db.Column(db.String)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.now())
    # many to one user
    adminId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    admin = db.relationship('User', back_populates='groupsOwned')

    # many groups to many users through memberships
    members = db.relationship(
        "User", back_populates="groupsJoined", secondary=memberships)
  
    # one to many messages
    messages = db.relationship(
        'Message', back_populates='group', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'isDM': self.isDM,
            'name': self.name,
            'description': self.description,
            'createdAt': self.createdAt,
            "updatedAt": self.updatedAt,
            "adminId": self.adminId,
            # "admin": self.admin,
            # using user.to_dict_for_Group method (no groups) to prevent
            # infinitely association between user and groups,
            # because user.to_dict() using groups as well.
            "members": [member.to_dict_for_Group for member in self.members],
            "messages": [m.to_dict() for m in self.messages],
        }
