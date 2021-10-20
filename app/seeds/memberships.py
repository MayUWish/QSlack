from app.models import db, User, Group
import random


def seed_memberships():
    groups = Group.query.all()
    users = User.query.all()
    numberOfUsers = len(users)
    for group in groups:
        randomNum = random.randint(2, len(users))
        for randomUser in random.sample(users, randomNum):
            group.members.append(randomUser)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the memberships table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_memberships():
    db.session.execute('TRUNCATE memberships RESTART IDENTITY CASCADE;')
    db.session.commit()
