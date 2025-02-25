import axios from "axios";
import { config } from "./config";

const api = axios.create({
    baseURL: `${config.API_URL}`,
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// Call this function before login or register
export const getCsrfCookie = async () => {
    await api.get("/sanctum/csrf-cookie");  // This sets the CSRF cookie
};

export default api;
