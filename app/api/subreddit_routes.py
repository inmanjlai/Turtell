from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit
from app.forms import CreateSubreddit, EditSubreddit
from flask_login import current_user, login_user, logout_user, login_required
from colors import *

subreddit_routes = Blueprint('subreddits', __name__)


# FUNCTION THAT TURNS WTFORMS VALIDATION ERRORS INTO A LIST
def validation_errors_to_error_messages(validation_errors):
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
        new_subreddit = Subreddit(name=data['name'], tag=data['tag'], description=data['description'], owner_id=data['owner_id'])
        db.session.add(new_subreddit)
        db.session.commit()

        subreddits = Subreddit.query.all()
        return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@subreddit_routes.route('/<int:id>/edit', methods=["PUT"])
def edit_subreddit(id):
    form = EditSubreddit()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']

    print(CREDBG + "\n DATA: \n", data, "\n" + CEND)
    print(CREDBG + "\n FORM VALIDATED: \n", form.validate_on_submit(), "\n" + CEND)
    print(CREDBG + "\n FORM ERRORS: \n", validation_errors_to_error_messages(form.errors), "\n" + CEND)

    if form.validate_on_submit():
        
        subreddit_to_edit = Subreddit.query.get(id)
        
        subreddit_to_edit.name = data['name']
        subreddit_to_edit.tag = data['tag']
        subreddit_to_edit.description = data['description']
        db.session.commit()

        subreddits = Subreddit.query.all()
        return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@subreddit_routes.route('/<int:id>/delete', methods=["DELETE"])
def delete_subreddit(id):
        subreddit_to_delete = Subreddit.query.get(id)
        if subreddit_to_delete:
            db.session.delete(subreddit_to_delete)
            db.session.commit()

            subreddits = Subreddit.query.all()
            return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}
        else:
            return {"message": "subreddit could not be found"}