from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

regexEmail = r'[A-Za-z0-9!#$%&\'*+-/=?^_`{|}~]+@[A-Za-z0-9]+\.[A-Za-z0-9]+'


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def username_length(form, field):
    username = field.data
    if len(username) > 25:
        raise ValidationError('Username cannot be more than 25 characters.')


def email_format(form, field):
    email = field.data
    if not (re.fullmatch(regexEmail, email)):
        raise ValidationError('Please provide an email in a valid format.')


def email_length(form, field):
    email = field.data
    if len(email) > 255:
        raise ValidationError('Email cannot be more than 255 characters.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,
                                username_length])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_length,
                        email_format])
    password = StringField('password', validators=[DataRequired()])
    biography = TextAreaField('biography')
