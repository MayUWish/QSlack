// constants
const GET_MOMENTS = 'moments/GET';
const CREATE_MOMENTS = 'moments/CREATE';
const DELETE_MOMENTS = 'moments/DELETE';
const EDIT_MOMENTS = 'moments/EDIT';



const getMomentsAction = (moments) => ({
    type: GET_MOMENTS,
    payload: moments
});

const createMomentsAction = (moment) => ({
    type: CREATE_MOMENTS,
    payload: moment
});

const deleteMomentsAction = (id) => ({
    type: DELETE_MOMENTS,
    payload: id
});

const editMomentsAction = (moment) => ({
    type: EDIT_MOMENTS,
    payload: moment
});


export const getMomentsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/moments/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getMomentsAction(data));
    }
}

export const createMomentsThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/moments/', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        // console.log('data???', data)
        dispatch(createMomentsAction(data));
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

export const deleteMomentsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/moments/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(deleteMomentsAction(data));
    } else if (response.status < 500) {
        if (data.errors) {
            return data;
        }
    }
    else {
        return { 'errors': ['An error occurred. Please try again.'] }
    }
}

export const editMomentsThunk = ({ momentId, formData }) => async (dispatch) => {
    const response = await fetch(`/api/moments/${momentId}`, {
        method: 'PATCH',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        // console.log('data???', data)
        dispatch(editMomentsAction(data));
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
    const updatedState = { ...state }
    switch (action.type) {
        case GET_MOMENTS:
            return { ...action.payload.momentsDic, 'momentsList':action.payload.momentsList }
        case CREATE_MOMENTS:
            updatedState[action.payload.id] = action.payload
            updatedState.momentsList.unshift(action.payload.id)
            return updatedState
        case DELETE_MOMENTS:
            delete updatedState[action.payload]
            updatedState.momentsList.splice(updatedState.momentsList.indexOf(action.payload),1)
            return updatedState
        case EDIT_MOMENTS:
            updatedState[action.payload.id] = action.payload
            return updatedState
        default:
            return state;
    }
}