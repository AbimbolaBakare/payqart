import { appConstants } from "../actions/actionTypes";

const initialState = {
    data: [],
    userVideo: []
};

function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.FETCH_ORDERS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state
    }
}


export { ordersReducer };