from operator import truediv
from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit, User
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
    # print(CBLUEBG, subreddits[0].to_dict(), CEND)
    return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}

# GETS A SUBREDDIT BY ID
@subreddit_routes.route('/<int:id>')
def get_subreddit_by_id(id):
    subreddit = Subreddit.query.get(id)
    return subreddit.to_dict()

# CREATE A SUBREDDIT
@subreddit_routes.route('/', methods=["POST"])
def create_subreddit():
    form = CreateSubreddit()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_subreddit = Subreddit(name=data['name'], tag=data['tag'], description=data['description'], owner_id=data['owner_id'])
        db.session.add(new_subreddit)
        db.session.commit()

        user = User.query.get(data['owner_id'])
        user.subreddits.append(new_subreddit)

        subreddits = Subreddit.query.all()
        return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

# EDIT A SUBREDDIT
@subreddit_routes.route('/<int:id>/edit', methods=["PUT"])
def edit_subreddit(id):
    form = EditSubreddit()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']

    # print(CREDBG + "\n DATA: \n", data, "\n" + CEND)
    # print(CREDBG + "\n FORM VALIDATED: \n", form.validate_on_submit(), "\n" + CEND)
    # print(CREDBG + "\n FORM ERRORS: \n", validation_errors_to_error_messages(form.errors), "\n" + CEND)

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

# DELETE A SUBREDDIT
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

# GET ALL SUBREDDITS THE LOGGED IN USER FOLLOWS
@subreddit_routes.route('/followed/<int:id>')
def followed_subreddit(id):
    subreddits = Subreddit.query.all()
    subreddits_i_follow = []
    for subreddit in subreddits:
        for member in subreddit.members:
            if member.id == id:
                subreddits_i_follow.append(subreddit.to_dict())
    return {"subreddits":{"subreddits": [subreddit for subreddit in subreddits_i_follow], "ids": [subreddit['id'] for subreddit in subreddits_i_follow]}}


# FOLLOW A SPECIFIC SUBREDDIT
@subreddit_routes.route('/<int:subreddit_id>/follow/<int:user_id>', methods=["POST"])
def follow_subreddit(subreddit_id, user_id):
    
    subreddit = Subreddit.query.get(subreddit_id)
    user = User.query.get(user_id)

    subreddit.members.append(user)
    user.subreddits.append(subreddit)

    db.session.commit()

    subreddits = Subreddit.query.all()  
    subreddits_i_follow = []
    for subreddit in subreddits:
        for member in subreddit.members:
            if member.id == user_id:
                subreddits_i_follow.append(subreddit.to_dict())
    return {"subreddits":{"subreddits": [subreddit for subreddit in subreddits_i_follow], "ids": [subreddit['id'] for subreddit in subreddits_i_follow]}}


# UNFOLLOW A SUBREDDIT
@subreddit_routes.route('/<int:subreddit_id>/unfollow/<int:user_id>', methods=["DELETE"])
def unfollow_subreddit(subreddit_id, user_id):
    
    subreddit = Subreddit.query.get(subreddit_id)    
    user = User.query.get(user_id)

    subreddit.members.remove(user)

    new_subreddits = []
    for subreddit in user.subreddits:
        if subreddit.id != subreddit_id:
            new_subreddits.append(subreddit)

    user.subreddits = new_subreddits

    db.session.commit()

    subreddits = Subreddit.query.all()  
    subreddits_i_follow = []
    for subreddit in subreddits:
        for member in subreddit.members:
            if member.id == user_id:
                subreddits_i_follow.append(subreddit.to_dict())
    return {"subreddits":{"subreddits": [subreddit for subreddit in subreddits_i_follow], "ids": [subreddit['id'] for subreddit in subreddits_i_follow]}}

@subreddit_routes.route('/search/<query>')
def searched_subreddit(query):
    print(CREDBG + "\n QUERY: \n", query, "\n" + CEND)

    subreddits = Subreddit.query.filter(Subreddit.name.startswith(query)).all()
    # print(CREDBG + "\n SUBREDDITS: \n", subreddits, "\n" + CEND)
    return {"subreddits": [subreddit.to_dict() for subreddit in subreddits]}