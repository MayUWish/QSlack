from app.models import db, Comment


# Adds comments
def seed_comments():
    comment701 = Comment(
        momentId=1,
        userId=2, comment="So Pretty")
    comment702 = Comment(
        momentId=1,
        userId=1, comment='Love it!')

    comment704 = Comment(
        momentId=2,
        userId=1, comment="Love it!")
    comment705 = Comment(
        momentId=2,
        userId=5, comment='Awesome!')

    comment706 = Comment(
        momentId=3,
        userId=1, comment="Good afternoon~")

    comment708 = Comment(
        momentId=4,
        userId=8, comment="Enjoy~")
    comment709 = Comment(
        momentId=4,
        userId=9, comment='Bravo!')
    comment710 = Comment(
        momentId=4,
        userId=7, comment='This is aaaaaaamazing. Wow! :D')

    comment711 = Comment(
        momentId=5,
        userId=8, comment="Nice!")
    comment712 = Comment(
        momentId=5,
        userId=5, comment='Pretty~')
  
    db.session.add(comment701)
    db.session.add(comment702)
    db.session.add(comment704)
    db.session.add(comment705)
    db.session.add(comment706)
    db.session.add(comment708)
    db.session.add(comment709)
    db.session.add(comment710)
    db.session.add(comment711)
    db.session.add(comment712)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
