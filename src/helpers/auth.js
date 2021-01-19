import axios from "axios";

const keys = {
    token: "@spotify:access_token"
};

export const setLocalData = token => {
    localStorage.setItem(keys.token, token);
};

export const setHeaders = token => {
    if (!token) {
        token = localStorage.getItem(keys.token);
        if (!token) return false;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
};
