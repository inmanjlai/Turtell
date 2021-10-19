from app.models import db, Subreddit


# Adds a demo user, you can add other users here if you want
def seed_subreddits():
    edh = Subreddit(name='Elder Dragon Highlander', tag='EDH', description="A friendly community based around the Commander format for Magic: the Gathering. Join us!")
    WoW = Subreddit(name='World of Warcraft', tag='WoW', description="A subreddit dedicated to World of Warcraft (retail), the most popular MMO ever made.")
    tarkov = Subreddit(name='Escape From Tarkov', tag='tarkov', description="A community based around Escape from Tarkov, we welcome Rats and Chads alike.")

    db.session.add(edh)
    db.session.add(WoW)
    db.session.add(tarkov)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_subreddits():
    db.session.execute('TRUNCATE subreddits RESTART IDENTITY CASCADE;')
    db.session.commit()
