export const time = {
    format: time => {
        return (time - (time %= 60)) / 60 + (9 < time ? ":" : ":0") + time;
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
