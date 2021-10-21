from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.String(5000), nullable=False)

    subreddit = db.relationship("Subreddit", back_populates="posts")
    user = db.relationship("User", backref="posts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subreddit_id': self.subreddit_id,
            'title': self.title,
            'content': self.content,
            'user': self.user.to_dict()
        }


