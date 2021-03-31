import { appConstants } from "../actions/actionTypes";

const initialState = {
    data: [],
    userVideo: []
};

function employmentTypesReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.FETCH_EMPLOYMENT_TYPES:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state
    }
}


export { employmentTypesReducer };