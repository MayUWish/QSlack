from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Moment


class DeleteCommentForm(FlaskForm):
    commentId = IntegerField('userId', validators=[DataRequired()])
    momentId = IntegerField('momentId', validators=[DataRequired()])
