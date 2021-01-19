export const hashParams = string => {
    string = string.replace("#", "");
    const pairs = string.split("&");
    const params = {};

    pairs.forEach(pair => {
        const split = pair.split("=");
        params[split[0]] = split[1];
    });

    return params;
};

export const time = {
    format: time => {
        return (time - (time %= 60)) / 60 + (9 < time ? ":" : ":0") + time;
    },
    millisToMS: millis => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
};

export const animate = {
    pause: (audio, speed) => {
        return new Promise(resolve => {
            const chunks = 25;
            const decrementor = 1 / chunks;
            let volume = 1;
            let interval;

            interval = setInterval(() => {
                if (audio.volume <= 0) {
                    clearInterval(interval);
                    resolve();
                } else {
                    volume = (volume - decrementor).toFixed(2);
                    if (volume < 0) volume = 0;
                    audio.volume = volume;
                }
            }, speed / chunks);
        });
    }
};
