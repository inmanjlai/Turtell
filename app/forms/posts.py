from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class CreatePost(FlaskForm):
    user_id = StringField('user id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    subreddit_it = IntegerField('subreddit id', validators=[DataRequired()])

class EditPost(FlaskForm):
    user_id = StringField('user id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    subreddit_it = IntegerField('subreddit id', validators=[DataRequired()])

