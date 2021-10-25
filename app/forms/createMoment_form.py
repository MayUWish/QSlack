from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Moment


class CreateMomentForm(FlaskForm):
    description = TextAreaField('description', validators=[DataRequired()])
