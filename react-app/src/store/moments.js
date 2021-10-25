// constants
const GET_MOMENTS = 'moments/GET';



const getMomentsAction = (moments) => ({
    type: GET_MOMENTS,
    payload: moments
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




const initialState = {}
export default function reducer(state = initialState, action) {
    // const updatedState = { ...state }
    switch (action.type) {
        case GET_MOMENTS:
            return { ...action.payload.momentsDic, 'momentsList':action.payload.momentsList }
      
        default:
            return state;
    }
}