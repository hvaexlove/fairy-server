const dnsSd = require("./dns_sd");
let events = require('events');
let IOWatcher = require('./io_watcher').IOWatcher;

export class Server extends events {
    
    protected serviceRef: any;
    private watcher: any;
    private _watcherStarted: boolean = false;

    constructor() {
        super();
        this.serviceRef = new dnsSd.DNSServiceRef();
        this.watcher = new IOWatcher();
        this.watcher.host = this;
        this.watcher.callback = () => {
            if (this._watcherStarted) {
                try {
                    dnsSd.DNSServiceProcessResult.call(this, this.serviceRef);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    protected start() {
        if (this._watcherStarted) {
            throw new Error("mdns service already started");
        }
        this.watcher.set(this.serviceRef.fd, true, false);
        this.watcher.start();
        this._watcherStarted = true;
    }

    protected stop() {
        if (this._watcherStarted) {
            this.watcher.stop();
            dnsSd.DNSServiceRefDeallocate(this.serviceRef);
            this.serviceRef = null;
            this._watcherStarted = false;
        }
    }
    

}