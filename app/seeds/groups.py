from app.models import db, Group


def seed_groups():
    group1 = Group(
        name='group1', description='this is group1.', adminId=1)
    group2 = Group(
        name='group2', description='this is group2.', adminId=1)
    group3 = Group(
        name='group3', description='this is group3.', adminId=1)
    group4 = Group(
        name='group4', description='this is group4.', adminId=2)
    group5 = Group(
        name='group5', description='this is group5.', adminId=2)
    group6 = Group(
        name='group6', description='this is group6.', adminId=3)
    group7 = Group(
        name='group7', description='this is group7.', adminId=2)

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)
    db.session.add(group5)
    db.session.add(group6)
    db.session.add(group7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the groups table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
