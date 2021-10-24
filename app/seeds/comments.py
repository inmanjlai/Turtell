from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    one = Comment(user_id=1, post_id=1, content="Lorem ipsum dolor sit amet, At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque.")
    two = Comment(user_id=2, post_id=1, content="Lorem ipsum dolor sit amet, At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque.")
    three = Comment(user_id=3, post_id=1, content="Lorem ipsum dolor sit amet, At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque.")
    four = Comment(user_id=2, post_id=2, content="Lorem ipsum dolor sit amet, At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque.")
    five = Comment(user_id=3, post_id=2, content="Lorem ipsum dolor sit amet, At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque.")
    
    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
