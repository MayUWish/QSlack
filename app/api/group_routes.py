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
    if request.form['isDM']:
        form = CreateGroupForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # print('!!!form before', form.data)
        if form.validate_on_submit():
            # print('!!!form after', form.data)
            group = Group(name=form.data['name'],
                          description=form.data['description'],
                          adminId=current_user.id,
                          isDM=False)
            db.session.add(group)
            db.session.commit()
            group.members.append(current_user)
            db.session.commit()
            return group.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        if not request.form['username']:
            return {'errors': ['username: input an username to start direct message.']}, 401
        else:
            # username is unique in db
            theOtherUser = User.query.filter(
                User.username == request.form['username']).first()
            if not theOtherUser:
                return {'errors': ['username: user cannot be found.']}, 401
            # name the DM channel with name userId_userId to avoid duplication
            dmGroupName = f'{current_user.id}_{theOtherUser.id}_UniqueDM'
            isDMExisted = Group.query.filter(Group.name == dmGroupName,
                                             Group.isDM is True)
            if isDMExisted:
                return {'dmChannelId': isDMExisted.id} 
            group = Group(name=dmGroupName,
                          adminId=current_user.id,
                          isDM=True)
            db.session.add(group)
            db.session.commit()
            return group.to_dict()


@group_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_group(id):
    userId = current_user.id
    group = Group.query.get(id)
    isAdmin = userId == group.adminId

    if isAdmin:
        deletedGroupID = group.id
        db.session.delete(group)
        db.session.commit()
        return {'deletedGroupId': int(id)}
    else:
        currentUserInMemberships = list(filter(lambda member: member.id == userId,
                                        group.members))[0]

        currentUserInMemberships = group.members.pop(
            group.members.index(currentUserInMemberships))
        db.session.commit()
        return {'deletedGroupId': int(id), 'userId': userId}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_group(id):
    form = CreateGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('!!!form before', form.data)
    if form.validate_on_submit():
        print('!!!form after', form.data)
        group = Group.query.get(id)
        if group.adminId != current_user.id:
            return {'errors': ['No authorization']}, 403
        group.name = form.data['name']
        group.description = form.data['description']
        db.session.commit()
        return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
