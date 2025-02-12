import axios from 'axios'
export const AxiosClient =  axios.create({
    baseURL:"http://localhost:1234/api/v1"
})