from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Group, db
from app.forms import CreateGroupForm
from app.api.auth_routes import validation_errors_to_error_messages


group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
@login_required
def get_groups():
    groupsJoined = current_user.groupsJoined
    return {'dmChannels': {group.id: group.to_dict() for group in groupsJoined
                           if group.isDM},
            'chatGroups': {group.id: group.to_dict() for group in groupsJoined
                           if not group.isDM}
            }


@group_routes.route('/', methods=['POST'])
@login_required
def create_group():
    form = CreateGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('!!!form before', form.data)
    if form.validate_on_submit():
        print('!!!form after', form.data)
        group = Group(name=form.data['name'],
                      description=form.data['description'],
                      adminId=current_user.id,
                      isDM=False)
        db.session.commit()
        return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
