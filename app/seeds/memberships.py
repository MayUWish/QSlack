from app.models import db, User, Group, Message
import random


def seed_memberships():
    groups = Group.query.all()
    for group in groups:
        # user created/as admin should always be in the chat groups
        adminUser = User.query.filter(User.id == group.adminId).first()
        group.members.append(adminUser)
        randomMessage = f'Hi, this is {adminUser.username} saying hello in # {group.name}'
        group.messages.append(Message(
            userId=adminUser.id, groupId=group.id, message=randomMessage))
        # ramdom select nonAdminUsers to add to memberships
        nonAdminUsers = User.query.filter(User.id != group.adminId).all()
        if group.isDM:
            randomNum = 1
        else:
            randomNum = random.randint(1, len(nonAdminUsers))

        for randomUser in random.sample(nonAdminUsers, randomNum):
            group.members.append(randomUser)
            randomMessage = f'Hi, this is {randomUser.username} saying hello in # {group.name}'
            group.messages.append(Message(
                userId=randomUser.id, groupId=group.id, message=randomMessage))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the memberships table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_memberships():
    db.session.execute('TRUNCATE memberships RESTART IDENTITY CASCADE;')
    db.session.commit()
