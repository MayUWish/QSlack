// constants
const GET_CHATGROUPS = 'chatGroups/GET';
const ADD_MEMBER = 'members/POST';


const getChatGroupsAction = (groups) => ({
    type: GET_CHATGROUPS,
    payload: groups
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
        
        console.log('data???',data)
        dispatch(addMemberAction(data));
    } else if (response.status < 500) {
        console.log('data???has error', data)
        if (data.errors){
            return data;

        }
        
    }
    else{
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    const updatedState = {...state}
    switch (action.type) {
        case GET_CHATGROUPS:
            return { ...action.payload }
        case ADD_MEMBER:
            const groupId = action.payload.groupId
            updatedState[groupId].members = action.payload.members
            return { ...updatedState  }
        default:
            return state;
    }
}