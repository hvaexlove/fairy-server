const mdns = require('mdns');

let createServer = () => {
    mdns.createAdvertisement(mdns.tcp('fairy'), 1334, {
        name: '注册名称1',
        txtRecord: { name: 'test' }
    }).start();
}

export { createServer }