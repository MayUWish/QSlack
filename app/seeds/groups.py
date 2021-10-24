from app.models import db, Group


def seed_groups():
    group1 = Group(
        name='App-Academy', description='All about App-Academy.', adminId=1)
    group2 = Group(
        name='June-Cohort', description='All about June-Cohort of App-Academy.', adminId=1)
    group3 = Group(
        name='Dogs-lover', description='All about dogs.', adminId=2)
    group4 = Group(
        name='Cats-lover', description='All about cats.', adminId=3)
    group5 = Group(
        name='Flowers', description='All about flowers.', adminId=4)
    group6 = Group(
        name='Anime', description='All about anime.', adminId=5)
    group7 = Group(
        name='Football', description='All about footaball.', adminId=6)
    group8 = Group(
        name='Street-dance', description='All about Street-dance.', adminId=7)
    group9 = Group(
        name='hip-hop', description='All about hip-hop.', adminId=8)
    group10 = Group(
        name='Food', description='All about Food.', adminId=9)
    group11 = Group(
        name='Travel', description='All about Travel.', adminId=10)

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)
    db.session.add(group5)
    db.session.add(group6)
    db.session.add(group7)
    db.session.add(group8)
    db.session.add(group9)
    db.session.add(group10)
    db.session.add(group11)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the groups table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
