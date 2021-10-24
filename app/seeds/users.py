from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', biography='Hello World~', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zjxboQ5ESgzcNXJ7VPdzLHRZljriUnyunA&usqp=CAU')
    user2 = User(
        username='HappyWish', email='user2@aa.io', password='password', biography='Happy Everyday!', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWOdZJlzGgsaxupEmN1jGhRIn41F0Y-0ZR7A&usqp=CAU')
    user3 = User(
        username='DreamTrue', email='user3@aa.io', password='password', biography='My name is Bobbie.', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGZMvntM86MXW_ddi6psTHg9z0hAB4LVA_w&usqp=CAU')
    user4 = User(
        username='Bing', email='user4@aa.io', password='password', profilePic='data:image/jpeg;base64,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')
    user5 = User(
        username='Sharon', email='user5@aa.io', password='password', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREa1qRQ74VfSjmo_QjScXKCwi8JxAW6kk5Mw&usqp=CAU')
    user6 = User(
        username='Meijing', email='user6@aa.io', password='password', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhltpTO84WUIKaZK2wa5JWXxyCiLakcf2Tw&usqp=CAU')
    user7 = User(
        username='Guagua', email='user7@aa.io', password='password', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1ShDrRFStyLwHv-W95Vfnm70JLXlCEL7CQ&usqp=CAU')
    user8 = User(
        username='Krystal', email='user8@aa.io', password='password', profilePic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqOV8UIjUQK6a64wTd_WXOdyq_yBw9v55ww&usqp=CAU')
    user9 = User(
        username='Lin', email='user9@aa.io', password='password', profilePic='data:image/jpeg;base64,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')
    user9 = User(
        username='Qu', email='user10@aa.io', password='password', profilePic='data:image/jpeg;base64,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')

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
