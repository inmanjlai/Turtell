from flask import Blueprint, jsonify, session, request
from app.forms.posts import EditPost
from app.models import db, Subreddit, User, Post
from app.forms import CreatePost
from flask_login import current_user, login_user, logout_user, login_required
from colors import *

post_routes = Blueprint('posts', __name__)


# FUNCTION THAT TURNS WTFORMS VALIDATION ERRORS INTO A LIST
def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GETS ALL POSTS
@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}

# GETS A POST BY ID
@post_routes.route('/<int:id>')
def get_one_post(id):
    post = Post.query.get(id)
    return post.to_dict()

# GETS ALL POSTS FROM A SUBREDDIT
@post_routes.route('/subreddit/<int:subreddit_id>')
def get_subreddits_posts(subreddit_id):
    posts = Post.query.filter(Post.subreddit_id == subreddit_id).all()
    return {post.id: post.to_dict() for post in posts}

# GETS ALL OF A USERS POSTS
@post_routes.route('/user/<int:user_id>')
def get_users_posts(user_id):
    posts = Post.query.filter(Post.user_id == user_id).all()
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/', methods=["POST"])
def create_post():
    form = CreatePost()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CREDBG + "\nDATA:", data,"\n" + CEND)

    if form.validate_on_submit():
        new_post = Post(user_id=data['user_id'], subreddit_id=data['subreddit_id'], title=data['title'], content=data['content'])
        db.session.add(new_post)
        db.session.commit()

        posts = Post.query.filter(Post.subreddit_id == data['subreddit_id']).all()
        return {post.id: post.to_dict() for post in posts}
    else:
        print(CREDBG + "\nERROR: BAD DATA\n" + CEND)
        return "BAD DATA"

@post_routes.route('/<int:post_id>', methods=["PUT"])
def edit_post(post_id):
    form = EditPost()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CREDBG + "\nDATA:", data,"\n" + CEND)

    if form.validate_on_submit():
        post_to_edit = Post.query.get(post_id)

        post_to_edit.title = data['title']
        post_to_edit.content = data['content']

        db.session.commit()

        posts = Post.query.filter(Post.subreddit_id == data['subreddit_id']).all()
        return {post.id: post.to_dict() for post in posts}
    else:
        print(CREDBG + "\nERROR: BAD DATA\n" + CEND)
        return "BAD DATA"

@post_routes.route('/<int:subreddit_id>/<int:post_id>', methods=["DELETE"])
def delete_post(subreddit_id, post_id):

    post_to_delete = Post.query.get(post_id)
    print(CREDBG + "\n POST TO DELETE:", post_to_delete,"\n" + CEND)
    db.session.delete(post_to_delete)

    db.session.commit()

    posts = Post.query.filter(Post.subreddit_id == subreddit_id).all()
    return {post.id: post.to_dict() for post in posts}