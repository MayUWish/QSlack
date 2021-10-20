from app.models import db, Group


def seed_groups():
    group1 = Group(
        name='group1', description='this is group1.', adminId=1)
    group2 = Group(
        name='group2', description='this is group2.', adminId=1)
    group3 = Group(
        name='group3', description='this is group3.', adminId=2)
    group4 = Group(
        name='group4', description='this is group4.', adminId=3)
    group5 = Group(
        isDM=True, name='DM1', description='this is DM1.', adminId=1)
    group6 = Group(
        isDM=True, name='DM2', description='this is DM2.', adminId=2)
    group7 = Group(
        isDM=True, name='DM3', description='this is DM3.', adminId=3)
    
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
