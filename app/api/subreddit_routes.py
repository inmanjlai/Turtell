from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit
from app.forms import CreateSubreddit, subreddits
from flask_login import current_user, login_user, logout_user, login_required

subreddit_routes = Blueprint('subreddits', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GETS ALL SUBREDDITS
@subreddit_routes.route('/')
def get_subreddits():
    subreddits = Subreddit.query.all()
    return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}

# GETS A SUBREDDIT BY ID
@subreddit_routes.route('/<int:id>')
def get_subreddit_by_id(id):
    subreddit = Subreddit.query.get(id)
    return subreddit.to_dict()

@subreddit_routes.route('/', methods=["POST"])
def create_subreddit():
    form = CreateSubreddit()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_subreddit = Subreddit(name=data['name'], tag=data['tag'], description=data['description'])
        db.session.add(new_subreddit)
        db.session.commit()
        return new_subreddit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@subreddit_routes.route('/<int:id>/edit', methods=["PUT"])
def edit_subreddit(id):
    form = CreateSubreddit()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        subreddit_to_edit = Subreddit.query.get(id)
        
        subreddit_to_edit.name = data['name']
        subreddit_to_edit.tag = data['tag']
        subreddit_to_edit.description = data['description']

        db.session.commit()
        return subreddit_to_edit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@subreddit_routes.route('/<int:id>/delete', methods=["DELETE"])
def delete_subreddit(id):
        subreddit_to_delete = Subreddit.query.get(id)
        if subreddit_to_delete:
            db.session.delete(subreddit_to_delete)
            db.session.commit()
            return {"message": "subreddit successfully deleted"}
        else:
            return {"message": "subreddit could not be found"}