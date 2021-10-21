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
    if form.validate_on_submit():
        group = Group.query.get(form.data['groupId'])
        user = User.query.get(form.data['userId'])
        group.members.append(user)
        db.session.commit()

        return {member.id: member.to_dict()
                for member in group.members}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
