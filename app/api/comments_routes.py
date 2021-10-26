from flask import Blueprint, jsonify, session, request
from app.forms.posts import EditPost
from app.models import db, Comment, User, Post
from app.forms import CreateComment, EditComment
from flask_login import current_user, login_user, logout_user, login_required
from app.seeds import comments
from colors import *

comments_routes = Blueprint('comments', __name__)


# FUNCTION THAT TURNS WTFORMS VALIDATION ERRORS INTO A LIST
def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GETS ALL POSTS
@comments_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    return {comment.id: comment.to_dict() for comment in comments}

@comments_routes.route('/<int:comment_id>')
def get_one_comment(comment_id):
    comments = Comment.query.get(comment_id)
    return comments.to_dict()

# GETS ALL OF A USERS POSTS
@comments_routes.route('/post/<int:post_id>')
def get_posts_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    print(CREDBG + "\nDATA:", comments,"\n" + CEND)
    return {comment.id: comment.to_dict() for comment in comments}

@comments_routes.route('/', methods=["POST"])
def create_comment():
    form = CreateComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CREDBG + "\nDATA:", data,"\n" + CEND)

    if form.validate_on_submit():
        new_comment = Comment(user_id=data['user_id'], post_id=data['post_id'], content=data['content'])
        db.session.add(new_comment)
        db.session.commit()

        comments = Comment.query.filter(Comment.post_id == data['post_id']).all()
        return {comment.id: comment.to_dict() for comment in comments}
    else:
        print(CREDBG + "\nERROR: BAD DATA\n" + CEND)
        return "BAD DATA"

@comments_routes.route('/<int:comment_id>', methods=["PUT"])
def edit_comment(comment_id):
    form = EditComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CREDBG + "\nDATA:", data,"\n" + CEND)

    if form.validate_on_submit():
        comment_to_edit = Comment.query.filter(Comment.id == comment_id).first()

        comment_to_edit.content = data['content']
        print(CREDBG + "\nCOMMENT_TO_EDIT:", comment_to_edit,"\n" + CEND)
        print(CGREEN + "\nCOMMENT_TO_EDIT:", comment_to_edit.content,"\n" + CEND)
        
        db.session.commit()

        comments = Comment.query.filter(Comment.post_id == data['post_id']).all()
        return {comment.id: comment.to_dict() for comment in comments}
    else:
        print(CREDBG + "\nERROR: BAD DATA\n" + CEND)
        return "BAD DATA"

@comments_routes.route('/<int:post_id>/<int:comment_id>', methods=["DELETE"])
def delete_comment(post_id, comment_id):

    comment_to_delete = Comment.query.get(comment_id)
    print(CREDBG + "\n COMMENT TO DELETE:", comment_to_delete,"\n" + CEND)
    db.session.delete(comment_to_delete)

    db.session.commit()

    comments = Comment.query.filter(Comment.post_id == post_id).all()
    return {comment.id: comment.to_dict() for comment in comments}