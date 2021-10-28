from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Group


def name_length(form, field):
    name = field.data
    if len(name) > 25:
        raise ValidationError('Group Name cannot be more than 25 characters.')


class CreateGroupForm(FlaskForm):
    name = StringField('name', validators=[
        DataRequired(), name_length])
    description = StringField('description')
    isDM = BooleanField('isDM')
