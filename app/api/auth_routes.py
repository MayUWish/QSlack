from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditProfileForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

# setup AWS
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        allUsers = User.query.all()
        return {'user': current_user.to_dict(),
                'allUsers': [user.to_dict() for user in allUsers]}
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        allUsers = User.query.all()
        # return user.to_dict()
        return {'user': current_user.to_dict(),
                'allUsers': [user.to_dict() for user in allUsers]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "profilePic" in request.files:
            profilePic = request.files["profilePic"]

            if not allowed_file(profilePic.filename):
                return {"errors": ["profilePic file type not permitted"]}, 400

            profilePic.filename = get_unique_filename(
                profilePic.filename)

            upload_profilePic = upload_file_to_s3(profilePic)

            if "url" not in upload_profilePic:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return {'errors': [upload_profilePic['errors']]}, 400

            profilePic_url = upload_profilePic["url"]
        else:
            profilePic_url = None

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            biography=form.data['biography'],
            profilePic=profilePic_url,
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        allUsers = User.query.all()
        # return user.to_dict()
        return {'user': current_user.to_dict(),
                'allUsers': [user.to_dict() for user in allUsers]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/edit', methods=['PATCH'])
def editProfile():
    """
    Creates a new user and logs them in
    """
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = User.query.get(form.data['userId'])
    if user.id != current_user.id:
        return {"errors": ["No authorization."]}, 401

    if form.validate_on_submit():
        if "profilePic" in request.files:
            profilePic = request.files["profilePic"]

            if not allowed_file(profilePic.filename):
                return {"errors": ["profilePic file type not permitted"]}, 400

            profilePic.filename = get_unique_filename(
                profilePic.filename)

            upload_profilePic = upload_file_to_s3(profilePic)

            if "url" not in upload_profilePic:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return {'errors': [upload_profilePic['errors']]}, 400

            profilePic_url = upload_profilePic["url"]
        else:
            profilePic_url = None

        user.username = form.data['username']
        user.biography = form.data['biography']
        user.updatedAt = datetime.utcnow()
        if profilePic_url:
            user.profilePic = profilePic_url
        db.session.commit()
        login_user(user)
        allUsers = User.query.all()
        # return user.to_dict()
        return {'user': current_user.to_dict(),
                'allUsers': [user.to_dict() for user in allUsers]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
