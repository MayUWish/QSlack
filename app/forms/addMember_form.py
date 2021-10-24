from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Group


def user_exists(form, field):
    # Checking if user exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('User not found.')

    groupId = form.data['groupId']
    userId = user.id
    groupsJoined = list(filter(lambda group: group.id ==
                        groupId, user.groupsJoined))
    # print('groupsJoined!!!', groupsJoined, groupsJoined[0].id)
    if groupsJoined and groupsJoined[0].id:
        # print('ValidationError', ValidationError(
        #     'User is already in the chat groups.'))
        raise ValidationError('User is already in the chat group.')


def dm_channel(form, field):
    # Checking if user exists
    id = field.data
    group = Group.query.filter(Group.id == int(id)).first()
    if group.isDM:
        raise ValidationError('Direct message channel can not have more than 2 members')


class AddMemberForm(FlaskForm):
    username = StringField('username', validators=[
        DataRequired(), user_exists])
    groupId = IntegerField('groupId', validators=[
                           DataRequired(), dm_channel])
