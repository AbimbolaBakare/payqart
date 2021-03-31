import { appConstants } from "./actionTypes";

export {
    fetchOrdersAction,
    fetchEmploymentAction, 
    fetchPlansAction,
    getRepaymentBreakdownAction
}

function fetchOrdersAction(payload) {
    return {
        type: appConstants.FETCH_ORDERS,
        payload,
    };
}

function fetchEmploymentAction(payload) {
    return {
        type: appConstants.FETCH_EMPLOYMENT_TYPES,
        payload,
    };
}

function fetchPlansAction(payload) {
    return {
        type: appConstants.FETCH_PLANS,
        payload,
    };
}

function getRepaymentBreakdownAction(payload) {
    return {
        type: appConstants.GET_REPAYMENT_BREAKDOWN,
        payload,
    };
}
