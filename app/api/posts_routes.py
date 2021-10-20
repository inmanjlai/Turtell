from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit, User, Post
from app.forms import CreateSubreddit, EditSubreddit
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