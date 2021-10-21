from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Group


group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
@login_required
def groups():
    groups = current_user.groupsJoined
    return {group.id: group.to_dict() for group in groups}
