import { api_url } from "../config";
import axios from 'axios';


const fetchEmploymentTypes = () => axios.get(`${api_url}/employment-types`);

export {
    fetchEmploymentTypes
}