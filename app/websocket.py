from flask_socketio import SocketIO, emit
import os
from app.models import User, Group, Message, db
from datetime import datetime
from flask_login import current_user


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://qslack-app.herokuapp.com',
        'https://qslack-app.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    # a dictionary with key/value pair sent from frontend by using
    # e.g. socket.emit("chat", { user: user.username, msg: chatInput });
    # print('!!!!!data>>>>>', data)
    # front-end seeding 'action' key/value pair to tell among create, delete, edit

    currentGroup = Group.query.get(data['groupId'])
    if not currentGroup:
        data['errors'] = ['The chat group is deleted by the host.']
        emit(data['groupId'], data, broadcast=True)

    # The following validation:
    # will not show error message at front-end,
    # the message is just simply not created/edit/deleted
    # to indicate the failure,
    # bc all those validation is for fraud/hacker, instead of normal practice
    elif data['action'] == 'create':
        groupMembersId = list(
            map(lambda member: member.id, currentGroup.members))
        if data['userId'] not in groupMembersId or current_user.id not in groupMembersId:
            # Validation: only if user is in the group, the user can send message to the group
            data['errors'] = ['No authorization.']
        elif not len(data['msg']) or data['msg'].isspace():
            # Validation: message has to be not empty or all spaces
            data['errors'] = ['Message cannot be empty.']
        else:
            message = Message(
                groupId=data['groupId'],
                userId=data['userId'],
                message=data['msg'],
            )
            user = User.query.get(data['userId'])
            data['profilePic'] = user.profilePic
            db.session.add(message)
            db.session.commit()
        # emit first parameter would need to be same as socket.on first parameter to recieve the data
        emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'delete':
        messageId = data['messageId']
        messageToDelete = Message.query.get(messageId)
        # validation: only message's owner can delete the message;
        # No error message would need to be returned,
        # bc if cannot pass the validation,
        # the action just cannot be implemented
        if messageToDelete.userId == data['userId'] and messageToDelete.userId == current_user.id:
            db.session.delete(messageToDelete)
            db.session.commit()
            emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'edit':
        messageId = data['messageId']
        messageToEdit = Message.query.get(messageId)
        # validation: only message's owner can edit the message
        # and message has to be not empty or all spaces
        if messageToEdit.userId != data['userId'] or messageToEdit.userId != current_user.id:
            data['errors'] = ['No Authorization.']
        elif not len(data['msg']) or data['msg'].isspace():
            data['errors'] = ['Message cannot be empty.']

        elif messageToEdit.userId == data['userId'] and len(data['msg']) and not data['msg'].isspace():
            messageToEdit.message = data['msg']
            messageToEdit.updatedAt = datetime.now()
            db.session.commit()
        emit(data['groupId'], data, broadcast=True)
