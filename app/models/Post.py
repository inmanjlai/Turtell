from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.String(2000), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subreddit_id': self.subreddit_id,
            'title': self.title,
            'content': self.content
        }


