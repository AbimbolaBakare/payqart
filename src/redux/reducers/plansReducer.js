import { appConstants } from "../actions/actionTypes";

const initialState = {
    data: [],
    plan: []
};

function plansReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.FETCH_PLANS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state
    }
}

function repaymentPlanReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.GET_REPAYMENT_BREAKDOWN:
            return {
                ...state,
                plan: action.payload,
            };
        default:
            return state
    }
}


export { plansReducer, repaymentPlanReducer };