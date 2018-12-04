export class ServiceType {
    
    // 名称
    public name?: string;
    // 协议
    public protocol?: string;

    constructor(name: string, protocol: string) {
        this.name = name;
        this.protocol = protocol;
    }

    public toString() :string {
        return this.appendUnderline(this.name) + "." + this.appendUnderline(this.protocol);
    }

    private appendUnderline(str: string) :string {
        return '_' + str;
    }

}