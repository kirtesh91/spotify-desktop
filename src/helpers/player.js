import axios from "axios";
// import { uris } from "@/constants";

export const nextTrack = deviceId => {
    return axios.post("me/player/next", {
        deviceId
    });
};

export const previousTrack = deviceId => {
    return axios.post("me/player/previous", {
        deviceId
    });
};

export const pauseTrack = deviceId => {
    return axios.put("me/player/pause", {
        deviceId
    });
};

export const playTrack = data => {
    return axios.put("me/player/play", data);
    // return axios({
    //     method: "put",
    //     url: "me/player/play",
    //     data: {
    //         offset,
    //         uris,
    //         ...(context_uri && { context_uri })
    //     }
    // });
};

export const volume = (volume_percent, device_id) => {
    return axios({
        method: "put",
        url: "/me/player/volume",
        params: {
            volume_percent,
            device_id
        }
    });
};

export const shuffle = (state, device_id) => {
    return axios({
        method: "put",
        url: "/me/player/shuffle",
        params: {
            state: !state,
            device_id: device_id
        }
    });
};

export const repeat = (state, device_id) => {
    return axios({
        method: "put",
        url: "/me/player/repeat",
        params: {
            state,
            device_id
        }
    });
};

export const seekToPosition = (position_ms, device_id) => {
    return axios({
        method: "put",
        url: "/me/player/seek",
        params: {
            position_ms,
            device_id
        }
    });
};

export const getUserDevices = () => {
    return axios.get("me/player/devices");
};

export const getCurrentPlayback = () => {
    return axios.get("me/player");
};

export const transferUsersPlayback = (device_ids, play = false) => {
    return axios.put("me/player", {
        device_ids,
        play
    });
};
