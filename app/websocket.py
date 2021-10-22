from flask_socketio import SocketIO, emit
import os
from app.models import User, Group, Message


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
    message = Message(

    )
    # emit first parameter would need to be same as socket.on first parameter to revieve the data
    emit(data['groupId'], data, broadcast=True)
