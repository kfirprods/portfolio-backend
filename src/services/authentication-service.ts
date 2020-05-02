import { JWT_SECRET } from './../consts';
import jwt from 'jsonwebtoken';

import { DataProvider } from './data-provider';
import { HashHandler } from './hash-handler';

export class AuthenticationService {
    constructor(private dataProvider: DataProvider, private hashHandler: HashHandler) {
    }

    async authenticate(username, password) {
        const matchedAdmin = await this.dataProvider.getAdminByUsername(username);
        if (!matchedAdmin) {
            return null;
        }

        if (this.hashHandler.hash(password) !== matchedAdmin.password) {
            return null;
        }

        return jwt.sign({ username: matchedAdmin.username }, JWT_SECRET, { expiresIn: '2h' });
    }
}
