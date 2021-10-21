// constants
const GET_CHATGROUPS = 'chatGroups/GET';
const CREATE_CHATGROUPS = 'chatGroups/CREATE';
const DELETE_CHATGROUPS = 'chatGroups/DELETE';
const ADD_MEMBER = 'members/POST';


const getChatGroupsAction = (groups) => ({
    type: GET_CHATGROUPS,
    payload: groups
});

const createChatGroupsAction  = (newGroup) => ({
    type: CREATE_CHATGROUPS,
    payload: newGroup
});

const deleteChatGroupsAction = (data) => ({
    type: DELETE_CHATGROUPS,
    payload: data
});

const addMemberAction = (members) => ({
    type: ADD_MEMBER,
    payload: members
});


export const getChatGroupsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/groups/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        } 
        dispatch(getChatGroupsAction(data.chatGroups));
    }
}

export const addMemberThunk = ({username,groupId}) => async (dispatch) => {
    const response = await fetch(`/api/memberships/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            groupId,
        }),
    });
    const data = await response.json();
    if (response.ok) {
        
        // console.log('data???',data)
        dispatch(addMemberAction(data));
    } else if (response.status < 500) {
        // console.log('data???has error', data)
        if (data.errors){
            return data;

        }
        
    }
    else{
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}

export const createChatGroupsThunk = (newChatGroup) => async (dispatch) => {
    const response = await fetch(`/api/groups/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newChatGroup}),
    });
    const data = await response.json();
    if (response.ok) {

        // console.log('data???', data)
        dispatch(createChatGroupsAction(data));
    } else if (response.status < 500) {
        // console.log('data???has error', data)
        if (data.errors) {
            return data;

        }

    }
    else {
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}


export const deleteChatGroupsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/groups/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {

        console.log('data???', data)
        dispatch(deleteChatGroupsAction(data));
    } else if (response.status < 500) {
        console.log('data???has error', data)
        if (data.errors) {
            return data;

        }

    }
    else {
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    const updatedState = {...state}
    switch (action.type) {
        case GET_CHATGROUPS:
            return { ...action.payload }

        case CREATE_CHATGROUPS:
            updatedState[action.payload.id] = action.payload
            return { ...updatedState }

        case ADD_MEMBER:
            const groupId = action.payload.groupId
            updatedState[groupId].members = action.payload.members
            return { ...updatedState  }

            
        case DELETE_CHATGROUPS:
            !action.payload.userId && delete updatedState[action.payload.deletedGroupId]
            console.log('!!!!updatedState', updatedState)
            action.payload.userId && delete updatedState[action.payload.deletedGroupId].members[action.payload.userId]
            return { ...updatedState }
            
        default:
            return state;
    }
}