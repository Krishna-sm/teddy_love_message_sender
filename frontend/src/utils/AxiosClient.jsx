import axios from 'axios'
import { BASE_URL } from '../constant'
export const AxiosClient =  axios.create({
    baseURL: BASE_URL +"/api/v1"
})