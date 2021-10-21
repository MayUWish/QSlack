// constants
const GET_DMCHANNELS = 'dmChannels/GET';


const getDMChannelsAction = (groups) => ({
    type: GET_DMCHANNELS,
    payload: groups
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




const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DMCHANNELS:
            return { ...action.payload }
        default:
            return state;
    }
}