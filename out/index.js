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
const consts_1 = require("./consts");
const hash_handler_1 = require("./services/hash-handler");
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const body_parser_1 = __importDefault(require("body-parser"));
const lowdb = require("lowdb");
const FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
const cors_1 = __importDefault(require("cors"));
const data_provider_1 = require("./services/data-provider");
const authentication_service_1 = require("./services/authentication-service");
const app = express_1.default();
app.use(body_parser_1.default.json());
// app.use(function(req, res, next) { 
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next(); 
// });
app.use(cors_1.default());
app.use(express_jwt_1.default({ secret: consts_1.JWT_SECRET }).unless(request => {
    if (["GET", "OPTIONS"].some(allowedMethod => allowedMethod === request.method)) {
        return true;
    }
    if (request.path == "/auth") {
        return true;
    }
    return false;
}));
app.use(logErrors);
function logErrors(err, req, res, next) {
    console.info(req.headers);
    next(err);
}
const port = 3001;
const localDbPath = 'portfolio-db.json';
const dataProvider = new data_provider_1.DataProvider(lowdb(new FileAsync_1.default(localDbPath)));
const hashHandler = new hash_handler_1.HashHandler("sha512");
const authenticationService = new authentication_service_1.AuthenticationService(dataProvider, hashHandler);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dataProvider.getPersonalData();
    res.json(data);
}));
app.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield dataProvider.getProjects());
}));
app.post('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Create new project
}));
app.put('/projects/:projectId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = req.body.project;
    try {
        yield dataProvider.updateProject(req.params.projectId, newProject);
        return res.sendStatus(200);
    }
    catch (_a) {
        return res.sendStatus(404);
    }
}));
app.get('/experiences', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield dataProvider.getExperiences());
}));
app.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const token = yield authenticationService.authenticate(body.username, body.password);
    if (!token) {
        console.log(`Authentication failed for user ${body.username}`);
        return res.sendStatus(401);
    }
    console.log(`Authentication succeeded for user ${body.username}`);
    res.send({ token });
}));
app.listen(port, () => console.log(`app listening on port ${port}!`));
//# sourceMappingURL=index.js.map