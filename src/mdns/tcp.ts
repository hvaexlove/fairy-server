import { ServiceType } from './service_type';

export class TCP extends ServiceType {
    
    constructor(name: string) {
        super(name, 'tcp');
    }

}