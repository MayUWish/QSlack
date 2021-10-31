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

SQLAlchemy, as the Python SQL toolkit and Object Relational Mapper, was used to manage the tables and data seeding in PostgreSQL. The object model provides the flexibility and convenience to seed data randomly and dynamically. The following code was used to randomly populate the memberships and messages tables for chat groups. 

##### Randomly data seeding of memberships and messages for chat groups
```jsx
def seed_memberships():
    groups = Group.query.all()
    for group in groups:
        # user creating the group/as admin should always be in the chat groups
        adminUser = User.query.filter(User.id == group.adminId).first()
        group.members.append(adminUser)
        randomMessage = f'Hi, this is {adminUser.username} saying hello in # {group.name}'
        group.messages.append(Message(
            userId=adminUser.id, groupId=group.id, message=randomMessage))
        # ramdomly select non-Admin users to be added to the group
        nonAdminUsers = User.query.filter(User.id != group.adminId).all()
        if group.isDM:
            randomNum = 1
        else:
            randomNum = random.randint(1, len(nonAdminUsers))

        for randomUser in random.sample(nonAdminUsers, randomNum):
            group.members.append(randomUser)
            randomMessage = f'Hi, this is {randomUser.username} saying hello in # {group.name}'
            group.messages.append(Message(
                userId=randomUser.id, groupId=group.id, message=randomMessage))

    db.session.commit()
```

### Frontend
* HTML
* Vanilla CSS
* JavaScript
* React
* Redux


React, as a JavaScript library, was used to build the user interfaces. The Virtual DOM provides the flexibility of state management, allowing each component dynamically and interactively.
The following code was used to dynamically displaying other users, per changes of input when adding users to chat groups. 

##### Dynamically displaying other users
```jsx
 {allUsers.map((member, i) => (
                (member.username.toLowerCase().includes(username.toLowerCase()) || !username.replace(/ /g, '')) && <div className="eachChatWrapper" key={`message${i}`} style={{ paddingLeft: '2%' }}>
                
                    <img className='chatProfilePic'
                        alt='profilePicture'
                        src={member.profilePic ? member.profilePic : defaultProfilePic} /> 
                    
                    {currentMemberNames.includes(member.username) ? <>{member.username} <div style={{display:'inline-block'}}>(present)</div> </> : <span>{member.username}</span> }
                </div>
            ))}
```
### API

* AWS S3
Amazon Web Services S3 was used to allow users to upload profile image when signing up and to upload moment image when creating and editing moments.

* WebSocket
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
- View other user's moment page
- New message notification
