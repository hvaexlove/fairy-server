const { MDNSServer } = require('../dist/fairy_server');

let service = new MDNSServer();
let hexuService = service.createServer('rdslite-service', 1334, {
    txt: 'hello'
}, (error, txtRecord) => {
    if (error) {
        console.error(error);
    } else {
        console.log('注册成功: ', txtRecord);
    }
});
hexuService.start();