from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group


group_routes = Blueprint('groups', __name__)


@group_routes.route('/<int:id>')
@login_required
def groups(id):
    return None