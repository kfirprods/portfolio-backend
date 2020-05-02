import {createHash} from 'crypto';

export class HashHandler {
    constructor(private hashMethod: string) {
    }

    hash(data: string): string {
        return createHash(this.hashMethod).update(data).digest("hex");
    }
}
