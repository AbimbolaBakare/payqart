import { api_url } from "../config";
import axios from 'axios';


const fetchOrders = () => axios.get(`${api_url}/orders/60621bf6d185382cb829f5f4`);

export {
    fetchOrders
}