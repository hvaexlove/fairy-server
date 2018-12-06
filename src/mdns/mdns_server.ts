const dnsSd = require("./dns_sd");
import { TCP } from './tcp';
import { ServiceType } from './service_type';
import { Server } from './server';

export class MDNSServer extends Server {

    constructor() {
        super();
    }

    private objectToTXTRecord(obj: any) {
        let record = new dnsSd.TXTRecordRef();
        let value;
        record.buffer = new Buffer(256);
        dnsSd.TXTRecordCreate(record, record.buffer);
        for (let item in obj) {
            this.ensureLegalKey(item);
            if (obj[item] === undefined || obj[item] === null || Buffer.isBuffer(obj[item])) {
                value = obj[item];
            } else {
                value = "" + obj[item];
            }
            dnsSd.TXTRecordSetValue(record, item, value);
        }
        return record;
    }


    private ensureLegalKey(str: string) {
        let char;
        for (let i = 0; i < str.length; ++i) {
            char = str.charCodeAt(i);
            if (char < 0x20 || char > 0x7e || char === 0x3d) {
                throw new Error(
                    "key must be all printable ascii characters exluding '='"
                );
            }
        }
    }

    public createServiceType(type: string): TCP {
        return new TCP('fairy');
    }

    public createServer(name: string, port: number, txtRecord: any, callback?: Function, options?: any) :MDNSServer {
        options = options || {};
        let flags: number = options.flags || 0;
        let ifaceIdx: number = 0;
        let domain: string = options.domain || null;
        let host: string = options.host || null;
        let context: string = options.context || null;
        let serviceType: ServiceType = this.createServiceType(name);
        let serviceRef: any = this.serviceRef;
        let cloneTxtRecord: any = null;
        if (txtRecord && typeof txtRecord === 'object' && !(txtRecord instanceof dnsSd.TXTRecordRef || Buffer.isBuffer(txtRecord))) {
            cloneTxtRecord = JSON.parse(JSON.stringify(txtRecord));
            txtRecord = this.objectToTXTRecord(txtRecord);
        }

        dnsSd.DNSServiceRegister(serviceRef
            , flags
            , ifaceIdx
            , name
            , serviceType.toString()
            , domain
            , host
            , port
            , txtRecord
            , (serviceRef: any, flags: any, errorCode: any, name: any, serviceType: any, domain: any, context: any) => {
                let error = dnsSd.buildException(errorCode);
                if (!callback) {
                    return;
                }
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    callback(error, cloneTxtRecord);
                }
            }
            , context);
        return this;
    }

}