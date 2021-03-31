import { api_url } from "../config";
import axios from 'axios';

const fetchPlans = () => axios.get(`${api_url}/plans`);

const getRepaymentBreakdown = (data) => axios.post(`${api_url}/pre-approvals`, data);

const submitRequest = (data) => axios.post(`${api_url}/approvals`, data);

export {
    fetchPlans,
    getRepaymentBreakdown,
    submitRequest
}