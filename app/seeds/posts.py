from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    edh = Post(user_id=1, subreddit_id=1, title="How do I make better decks, people keep killing my commander and then I lose", content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Massa placerat duis ultricies lacus. Nunc sed velit dignissim sodales ut eu sem integer. Neque vitae tempus quam pellentesque nec nam aliquam sem. Ultrices tincidunt arcu non sodales neque sodales ut etiam.")
    WoW = Post(user_id=2, subreddit_id=2, title="What is the best class race combo for PVP????", content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Massa placerat duis ultricies lacus. Nunc sed velit dignissim sodales ut eu sem integer. Neque vitae tempus quam pellentesque nec nam aliquam sem. Ultrices tincidunt arcu non sodales neque sodales ut etiam.Est lorem ipsum dolor sit amet. Egestas sed tempus urna et. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Et egestas quis ipsum suspendisse ultrices. Sit amet consectetur adipiscing elit duis. Ornare aenean euismod elementum nisi quis eleifend quam. At volutpat diam ut venenatis tellus.")
    tarkov = Post(user_id=3, subreddit_id=3, title="Man I hate extract campers these guys waited me out for 40 mins and one tapped me with 0.1s left", content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At urna condimentum mattis pellentesque id. Praesent elementum facilisis leo vel fringilla. Aliquam ut porttitor leo a diam sollicitudin tempor. Maecenas pharetra convallis posuere morbi leo urna. Turpis in eu mi bibendum neque egestas. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Massa placerat duis ultricies lacus. Nunc sed velit dignissim sodales ut eu sem integer. Neque vitae tempus quam pellentesque nec nam aliquam sem. Ultrices tincidunt arcu non sodales neque sodales ut etiam.Ultricies tristique nulla aliquet enim. Urna et pharetra pharetra massa massa ultricies. Faucibus nisl tincidunt eget nullam non nisi est. In metus vulputate eu scelerisque felis imperdiet. Urna id volutpat lacus laoreet non curabitur gravida arcu. Interdum velit euismod in pellentesque massa placerat duis ultricies. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Sit amet facilisis magna etiam tempor orci. Aliquet lectus proin nibh nisl. Vulputate dignissim suspendisse in est ante in. Turpis egestas maecenas pharetra convallis. Eget dolor morbi non arcu risus quis varius quam quisque. Morbi quis commodo odio aenean sed. Cras ornare arcu dui vivamus arcu felis bibendum ut. Risus pretium quam vulputate dignissim. Integer eget aliquet nibh praesent tristique magna. Odio facilisis mauris sit amet massa vitae tortor.")

    db.session.add(edh)
    db.session.add(WoW)
    db.session.add(tarkov)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
