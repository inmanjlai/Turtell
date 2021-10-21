from .db import db
from app.models import members


class Subreddit(db.Model):
    __tablename__ = 'subreddits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=False)
    tag = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    owner = db.relationship("User", backref="owned_subreddits", foreign_keys=[owner_id])
    members = db.relationship("User", secondary=members, back_populates="subreddits")
    posts = db.relationship("Post", back_populates="subreddit", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'tag': self.tag,
            'description': self.description,
            'owner_id': self.owner_id,
            'owner': self.owner.to_dict()
        }

    def to_dict_association(self):
        return {
            'id': self.id,
            'name': self.name,
            'tag': self.tag,
            'description': self.description,
            'owner_id': self.owner_id,
        }

