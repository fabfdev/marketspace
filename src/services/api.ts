import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.15.13:4444"
});

api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
    }
    return Promise.reject(requestError);
})

export { api };