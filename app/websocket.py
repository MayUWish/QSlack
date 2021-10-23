from flask_socketio import SocketIO, emit
import os
from app.models import User, Group, Message, db


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
    print('!!!!!data>>>>>', data)
    # front-end seeding 'action' key/value pair to tell among create, delete, edit
    if data['action'] == 'create':
        message = Message(
            groupId=data['groupId'],
            userId=data['userId'],
            message=data['msg'],
        )
        user = User.query.get(data['userId'])
        data['profilePic'] = user.profilePic
        db.session.add(message)
        db.session.commit()
        # emit first parameter would need to be same as socket.on first parameter to revieve the data
        emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'delete':
        messageId = data['messageId']
        messageToDelete = Message.query.get(messageId)
        db.session.delete(messageToDelete)
        db.session.commit()
        emit(data['groupId'], data, broadcast=True)


# @socketio.on("delete")
# def handle_chat_delete(data):
#     # a dictionary with key/value pair sent from frontend by using
#     # e.g. socket.emit("chat", { user: user.username, msg: chatInput });
#     print('!!!!!data>>>>>', data)
#     # By having data sent from front-end with different keyName e.g. 'delete',
#     # to handle create, delete, eidt of messages
#     # so that using websockets will ensure the change will affect
#     # all the users connected to the same group
#     # (both chatgroups and dm channels are groups)
    
