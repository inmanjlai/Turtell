from .db import db
from app.models import members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    subreddits = db.relationship("Subreddit", secondary=members, back_populates="members")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }
    
    def to_dict_association(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }
    
    def to_dict_server(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'subreddits': [subreddit.id for subreddit in self.subreddits]
        }
    
