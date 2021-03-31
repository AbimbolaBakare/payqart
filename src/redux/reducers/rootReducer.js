import { combineReducers } from "redux";
import { ordersReducer } from './ordersReducer';
import { employmentTypesReducer } from './employmentReducer';
import { plansReducer, repaymentPlanReducer } from './plansReducer';

const rootReducer = combineReducers({
    ordersReducer,
    employmentTypesReducer,
    plansReducer,
    repaymentPlanReducer
});

export default rootReducer;
