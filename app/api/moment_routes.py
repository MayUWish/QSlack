from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Group, db, Moment, Like, Comment
from app.forms import CreateMomentForm
from app.api.auth_routes import validation_errors_to_error_messages
# setup AWS
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

moment_routes = Blueprint('moments', __name__)


@moment_routes.route('/')
@login_required
def get_moments():
    moments = Moment.query.all()
    # sort from largest Id to smalles Id, most latest to earliest.
    momentsIdSorted = sorted(moments, key=lambda m: -m.id)
    momentsIdSorted = list(map(lambda m: m.id, momentsIdSorted))

    return {'momentsDic': {moment.id: moment.to_dict() for moment in moments},
            'momentsList': momentsIdSorted}


@moment_routes.route('/', methods=['POST'])
@login_required
def create_moment():
    form = CreateMomentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        if "media" not in request.files:
            return {"errors": ["Photo is required"]}, 400
        media = request.files["media"]
        if not allowed_file(media.filename):
            return {"errors": ["Photo file type not permitted"]}, 400
        media.filename = get_unique_filename(
            media.filename)
        upload_media = upload_file_to_s3(media)
        if "url" not in upload_media:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {'errors': [upload_media['errors']]}, 400
        media_url = upload_media["url"]

        moment = Moment(
            userId=current_user.id,
            description=form.data['description'],
            media=media_url,
        )
        db.session.add(moment)
        db.session.commit()
        return moment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
