from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Group


group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
@login_required
def get_groups():
    groupsJoined = current_user.groupsJoined
    return {'dmChannel': {group.id: group.to_dict() for group in groupsJoined
                          if group.isDM},
            'chatGroups': {group.id: group.to_dict() for group in groupsJoined
                           if not group.isDM}
            }
