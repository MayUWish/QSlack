from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Group, db, Moment, Like, Comment
from app.forms import CreateGroupForm
from app.api.auth_routes import validation_errors_to_error_messages


moment_routes = Blueprint('moments', __name__)


@moment_routes.route('/')
@login_required
def get_moments():
    moments = Moment.query.all()
    momentsIdSorted = sorted(moments, key=lambda m: m.id)
    momentsIdSorted = list(map(lambda m: m.id, momentsIdSorted))

    return {'momentsDic': {moment.id: moment.to_dict() for moment in moments},
            'momentsList': momentsIdSorted}
