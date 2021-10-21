from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Group


class CreateGroupForm(FlaskForm):
    name = StringField('name', validators=[
        DataRequired()])
    description = StringField('description')
    isDM = BooleanField('isDM')
