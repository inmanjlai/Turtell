from .db import db


class Subreddit(db.Model):
    __tablename__ = 'subreddits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=False)
    tag = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'tag': self.tag,
            'description': self.description
        }
