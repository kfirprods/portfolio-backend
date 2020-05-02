"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./../consts");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationService {
    constructor(dataProvider, hashHandler) {
        this.dataProvider = dataProvider;
        this.hashHandler = hashHandler;
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchedAdmin = yield this.dataProvider.getAdminByUsername(username);
            if (!matchedAdmin) {
                return null;
            }
            if (this.hashHandler.hash(password) !== matchedAdmin.password) {
                return null;
            }
            return jsonwebtoken_1.default.sign({ username: matchedAdmin.username }, consts_1.JWT_SECRET, { expiresIn: '2h' });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication-service.js.map