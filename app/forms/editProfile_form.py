from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    users = User.query.filter(User.username == username).all()
    otherUser = list(filter(lambda user: user.id != current_user.id, users))
    if otherUser:
        raise ValidationError('Username is already in use.')


def username_length(form, field):
    username = field.data
    if len(username) > 25:
        raise ValidationError('Username cannot be more than 25 characters.')


class EditProfileForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,
                                username_length])
    biography = TextAreaField('biography')
    userId = IntegerField('userId', validators=[DataRequired()])
