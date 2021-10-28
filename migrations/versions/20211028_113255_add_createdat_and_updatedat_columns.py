"""add createdAt and updatedAt columns

Revision ID: a99c4e2255d5
Revises: c8ffa1655f43
Create Date: 2021-10-28 11:32:55.555782

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a99c4e2255d5'
down_revision = 'c8ffa1655f43'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('comments', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    op.add_column('groups', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('groups', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    op.add_column('likes', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('likes', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    op.add_column('messages', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('messages', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    op.add_column('moments', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('moments', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    op.add_column('users', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('users', sa.Column('updatedAt', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updatedAt')
    op.drop_column('users', 'createdAt')
    op.drop_column('moments', 'updatedAt')
    op.drop_column('moments', 'createdAt')
    op.drop_column('messages', 'updatedAt')
    op.drop_column('messages', 'createdAt')
    op.drop_column('likes', 'updatedAt')
    op.drop_column('likes', 'createdAt')
    op.drop_column('groups', 'updatedAt')
    op.drop_column('groups', 'createdAt')
    op.drop_column('comments', 'updatedAt')
    op.drop_column('comments', 'createdAt')
    # ### end Alembic commands ###