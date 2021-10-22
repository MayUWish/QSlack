// constants
const GET_DMCHANNELS = 'dmChannels/GET';
const CREATE_DMCHANNELS = 'dmChannels/CREATE';
const REMOVE_DMCHANNELS = 'dmChannels/REMOVE';


const getDMChannelsAction = (groups) => ({
    type: GET_DMCHANNELS,
    payload: groups
});

const createDMChannelsAction = (newDM) => ({
    type: CREATE_DMCHANNELS,
    payload: newDM
});

const removeDMChannelsAction = (id) => ({
    type: REMOVE_DMCHANNELS,
    payload: id
});

export const getDMChannelsThunk = () => async (dispatch) => {
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
        dispatch(getDMChannelsAction(data.dmChannels));
    }
}


export const createDMChannelsThunk = ({ name, isDM}) => async (dispatch) => {
    const response = await fetch(`/api/groups/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, isDM}),
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(createDMChannelsAction(data));
        return data
    } else if (response.status < 500) {
        if (data.errors) {
            return data;
        }
    }
    else {
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}


export const removeDMChannelsThunk = (id) => async (dispatch) => {
    // only remove from redux store, not from db        
    dispatch(removeDMChannelsAction(id));
    
}

const initialState = {}
export default function reducer(state = initialState, action) {
    const updatedState = { ...state }
    switch (action.type) {       
        case GET_DMCHANNELS:
            return { ...action.payload }
        case CREATE_DMCHANNELS:
            (!action.payload.dmChannelId) ? updatedState[action.payload.id] = action.payload : updatedState[action.payload.dmChannelId] = action.payload[action.payload.dmChannelId]
            return { ...updatedState }
        case REMOVE_DMCHANNELS:
            delete updatedState[action.payload]
            return { ...updatedState }
        default:
            return state;
    }
}