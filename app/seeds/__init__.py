from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .memberships import seed_memberships, undo_memberships
from .moments import seed_moments, undo_moments
from .likes import seed_likes, undo_likes
from .comments import seed_comments, undo_comments


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_groups()
    seed_memberships()
    seed_moments()
    seed_likes()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_memberships()
    undo_moments()
    undo_likes()
    undo_comments()
    # Add other undo functions here
