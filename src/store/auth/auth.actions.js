import axios from "axios";
import { uris } from "@/constants";

export const actions = {
    login(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(uris.users.me, data)
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
