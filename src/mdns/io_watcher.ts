const dnsSd = require("./dns_sd");
if (typeof dnsSd.SocketWatcher !== 'undefined') {
    exports.IOWatcher = dnsSd.SocketWatcher;
} else {
    exports.IOWatcher = process.binding('io_watcher').IOWatcher;
}
