from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CreateComment(FlaskForm):
    user_id = StringField('user id', validators=[DataRequired()])
    post_id = StringField('post_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])

class EditComment(FlaskForm):
    post_id = StringField('post_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])

