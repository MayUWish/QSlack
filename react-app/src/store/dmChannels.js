// constants
const GET_DMCHANNELS = 'dmChannels/GET';
const CREATE_DMCHANNELS = 'dmChannels/CREATE';


const getDMChannelsAction = (groups) => ({
    type: GET_DMCHANNELS,
    payload: groups
});

const createDMChannelsAction = (newDM) => ({
    type: CREATE_DMCHANNELS,
    payload: newDM
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


export const createDMChannelsThunk = ({ username, isDM}) => async (dispatch) => {
    const response = await fetch(`/api/groups/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, isDM}),
    });
    const data = await response.json();
    if (response.ok) {
        // console.log('data???', data)
        dispatch(createDMChannelsAction(data));
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

const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DMCHANNELS:
            return { ...action.payload }
        default:
            return state;
    }
}