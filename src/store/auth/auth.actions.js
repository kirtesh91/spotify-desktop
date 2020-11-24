import axios from "axios";

export const actions = {
    login(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("/auth/login", data)
                .then(response => {
                    console.log(response.data);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error.response.data);
                    reject(error);
                });
        });
    }
};
