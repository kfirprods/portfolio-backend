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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash_handler_1 = require("./services/hash-handler");
var express_1 = __importDefault(require("express"));
var express_jwt_1 = __importDefault(require("express-jwt"));
var body_parser_1 = __importDefault(require("body-parser"));
var lowdb = require("lowdb");
var FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
var data_provider_1 = require("./services/data-provider");
var authentication_service_1 = require("./services/authentication-service");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use(express_jwt_1.default({ secret: 'portfolio-super-secret' }).unless(function (request) {
    if (["GET", "OPTIONS"].includes(request.method)) {
        return true;
    }
    if (request.path == "/auth") {
        return true;
    }
    return false;
}));
var port = 3000;
var localDbPath = 'portfolio-db.json';
var dataProvider = new data_provider_1.DataProvider(lowdb(new FileAsync_1.default(localDbPath)));
var hashHandler = new hash_handler_1.HashHandler("sha512");
var authenticationService = new authentication_service_1.AuthenticationService(dataProvider, hashHandler);
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dataProvider.getPersonalData()];
            case 1:
                data = _a.sent();
                res.json(data);
                return [2 /*return*/];
        }
    });
}); });
app.get('/projects', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, dataProvider.getProjects()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('/experiences', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, dataProvider.getExperiences()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.post('/experiences/{experienceId}', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
app.post('/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, authenticationService.authenticate(body.username, body.password)];
            case 1:
                token = _a.sent();
                if (!token) {
                    console.log("Authentication failed for user " + body.username);
                    return [2 /*return*/, res.sendStatus(401)];
                }
                console.log("Authentication succeeded for user " + body.username);
                res.send({ token: token });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () { return console.log("app listening on port " + port + "!"); });
//# sourceMappingURL=app.js.map