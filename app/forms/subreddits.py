from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Subreddit


def subreddit_exists(form, field):
    # Checking if subreddit with the same tag already exists
    tag = form.data['tag']
    exists = Subreddit.query.filter(Subreddit.tag == tag).first()
    if exists:
        raise ValidationError('a subreddit with this tag already exists!')

class CreateSubreddit(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    tag = StringField('tag', validators=[DataRequired(), subreddit_exists])
    description = StringField('description', validators=[DataRequired()])
