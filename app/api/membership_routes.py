from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Group
from app.forms import AddMemberForm
from app.api.auth_routes import validation_errors_to_error_messages


membership_routes = Blueprint('memberships', __name__)


@membership_routes.route('/', methods=["POST"])
@login_required
def add_member():
    form = AddMemberForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('!!!form before', form.data)
    if form.validate_on_submit():
        print('!!!form after', form.data)
        group = Group.query.filter(Group.id == form.data['groupId']).first()
        print('!!group', group)
        user = User.query.filter(
            User.username == form.data['username']).first()
        print('!!user', user)
        group.members.append(user)
        print('group.members', group.members)
        db.session.commit()
        print('members:', {member.id: member.to_dict()
                           for member in group.members})

        return {'members': {member.id: member.to_dict()
                for member in group.members}, 'groupId': form.data['groupId']}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
