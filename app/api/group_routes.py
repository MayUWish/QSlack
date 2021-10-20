from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group


group_routes = Blueprint('groups', __name__)


# @group_routes.route('/<int:id>')
# @login_required
# def groups(id):
    # user = User.query.get(id)
    # groups = Group.query.filter(Group.members.id == id).all()
    # groupsDic = [g.to_dict() for g in groups]
    # print('groups!!!', groupsDic)
    # userDic = user.to_dict()
    # # userDic['groups'] = groupsDic
    # # print('???userDic!!!', userDic, userDic['groups'])

    # return userDic
