from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Comment, Moment,db
from app.forms import CreateCommentForm
from app.api.auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    # print('request.form!!!', request.form)
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('!!!form before', form.data)
    if form.data['userId'] != current_user.id:
        return {'errors': ['No authorization.']}, 403

    if form.validate_on_submit():
        # print('!!!form after', form.data)
        comment = Comment(comment=form.data['comment'],
                          momentId=form.data['momentId'],
                          userId=current_user.id)
        db.session.add(comment)
        db.session.commit()
        # return moment with updated comments list to update redux store
        moment = Moment.query.get(form.data['momentId'])  
        return moment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
