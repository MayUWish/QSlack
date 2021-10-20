from app.models import db, Group


def seed_groups():
    group1 = Group(
        isDM=True, name='group1', description='this is group1.', adminId=1)
    group2 = Group(
        isDM=True, name='group2', description='this is group2.', adminId=1)
    group3 = Group(
        isDM=False, name='DM1', description='this is DM1.', adminId=1)

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the groups table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
