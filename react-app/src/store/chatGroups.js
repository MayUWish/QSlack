// constants
const GET_CHATGROUPS = 'chatGroups/GET';


const getChatGroupsAction = (groups) => ({
    type: GET_CHATGROUPS,
    payload: groups
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




const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHATGROUPS:
            return { ...action.payload }
        default:
            return state;
    }
}