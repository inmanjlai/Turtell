from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    user = db.relationship("User", backref="comments")
    post = db.relationship("Post", back_populates="comments")


    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'post': self.post.to_dict()
        }
