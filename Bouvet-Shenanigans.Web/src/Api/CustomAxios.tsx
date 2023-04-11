import axios from "axios"

export const axiosPrivate = axios.create({
    baseURL: 'localhost:7032',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer',
    },
});