from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    # groups = Group.query.join(User).filter(User.id == id).all()
    # groupsDic = [g.to_dict() for g in groups]
    # print('groups!!!', groupsDic)
    # userDic['groups'] = groupsDic
    # print('5555333332222!!!!')

    return user.to_dict()
