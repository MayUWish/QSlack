# Welcome to QSlack

QSlack, inspired by Slack and Instagram, is an application that allows users to send direct messages, chat in groups, and share moments.

Live Link: [QSLACK](https://qslack-app.herokuapp.com/)


## QSlack at a Glance
### Chat groups
User can create a chat group, invite other users to join the chat group, edit the information of chat group, and delete the chat group created by the user, or leave the chat group created by other users.

![Chat groups at a glance](/react-app/src/static/readMe/groups.gif)

### Live messages
User can send live messages, edit and delete their own messages in a chat group or directly with the other user.

![Live messages at a glance](/react-app/src/static/readMe/messages.gif)

### Moments
User can create moments, edit and delete their own moments, likes and comments on all the moments.

![Moments at a glance](/react-app/src/static/readMe/moments.gif) 
![Liks & Comments at a glance](/react-app/src/static/readMe/likesAndComments.gif)

## Technologies & Frameworks used
### Backend
* Python
* Flask
* PostgreSQL
* SQLAlchemy

### Frontend
* React
* Redux
* JavaScript
* HTML
* Vanilla CSS

### API

#### AWS S3
Amazon Web Services S3 was used to allow users to upload profile image when signing up and to upload moment image when creating and editing moments.

#### WebSocket
Socket.io was used on the backend to manage creating, editing, deleting live messages and to distribute messages over sockets to the appropriate chat groups for instant messaging. 

Key as 'action' of data dictionary sent to backend, together with value as 'create', 'edit' or 'delete' are used as identifiers to create, edit or delete messages in database. Validations such as empty input of message, authorization, are also implemented to display appropriate error message to users.

##### Instant messaging
``` jsx
@socketio.on("chat")
def handle_chat(data):
    currentGroup = Group.query.get(data['groupId'])
    if not currentGroup:
        data['errorsNoGroup'] = ['The chat group is deleted by the host.']
        emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'create':
        groupMembersId = list(
            map(lambda member: member.id, currentGroup.members))
        if data['userId'] not in groupMembersId or current_user.id not in groupMembersId:
            data['errors'] = ['No authorization.']
        elif not len(data['msg']) or data['msg'].isspace():
            data['errors'] = ['Message cannot be empty.']
        else:
            message = Message(
                groupId=data['groupId'],
                userId=data['userId'],
                message=data['msg'],
                createdAt=datetime.utcnow()
            )
            user = User.query.get(data['userId'])
            data['profilePic'] = user.profilePic
            db.session.add(message)
            db.session.commit()
        emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'delete':
        messageId = data['messageId']
        messageToDelete = Message.query.get(messageId)
        if messageToDelete.userId == data['userId'] and messageToDelete.userId == current_user.id:
            db.session.delete(messageToDelete)
            db.session.commit()
            emit(data['groupId'], data, broadcast=True)
    elif data['action'] == 'edit':
        messageId = data['messageId']
        messageToEdit = Message.query.get(messageId)
        if messageToEdit.userId != data['userId'] or messageToEdit.userId != current_user.id:
            data['errors'] = ['No Authorization.']
        elif not len(data['msg']) or data['msg'].isspace():
            data['errors'] = ['Message cannot be empty.']
        else:
            messageToEdit.message = data['msg']
            messageToEdit.updatedAt = datetime.utcnow()
            db.session.commit()
        emit(data['groupId'], data, broadcast=True)

```


## Future Implementations
- Search message and moment by content
- View and Edit user's profile
- View other user's moment page
