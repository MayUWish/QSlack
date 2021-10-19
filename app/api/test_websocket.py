from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
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
    emit("chat", data, broadcast=True)
