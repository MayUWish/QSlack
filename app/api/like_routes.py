from flask import Blueprint, jsonify, session, request
from app.models import Like, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages


like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_like(id):
    liked = Like.query.filter_by(
        momentId=id, userId=current_user.id).first()

    if not liked:
        like = Like(momentId=id, userId=current_user.id)
        db.session.add(like)
        db.session.commit()
        return {'like': like.to_dict()}
    else:
        db.session.delete(liked)
        db.session.commit()
        return {'unlike': {'momentId': id, 'userId': current_user.id}}


# @like_routes.route('/<int:id>/')
# @login_required
# def get_like(id):
#     likedbefore = Like.query.filter_by(
#         recipeId=id, userId=int(current_user.to_dict()['id'])).first()

#     if not likedbefore:
#         return {'unlike': 'unlike'}
#     else:
#         return {'like': 'like'}


# @like_routes.route('/')
# def likes():
#     likes = Like.query.all()
#     return {'likes': [like.to_dict() for like in likes]}
