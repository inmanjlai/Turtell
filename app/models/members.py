from .db import db

members = db.Table(
    "members",
    db.Column(
        "user_id", 
        db.Integer, 
        db.ForeignKey("users.id"), 
        primary_key=True
    ),
    db.Column(
        "subreddit_id", 
        db.Integer, 
        db.ForeignKey("subreddits.id"), 
        primary_key=True
    )
)
