const Config = {
    debug: false,

    cannon: {
        color: 'rgb(0,255,0)',
        reload: 250,
        width: 10,
        height: 10,
        speed: 0.08,
    },

    invader: {
        width: 10,
        height: 10,
        stride: { x: 40, y: 10 },
        speed: 0.01,
        speedIncr: 0.005,
        color: 'rgb(0,255,0)',
        lines: 3,
        points: 10,
    },

    laser: {
        color: 'rgb(0,255,0)',
    },
};

export default Config;
