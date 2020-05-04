import { JWT_SECRET } from './consts';
import { HashHandler } from './services/hash-handler';
import express from "express";
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import lowdb = require("lowdb");
import FileAsync from 'lowdb/adapters/FileAsync';
import cors from 'cors';

import { DataProvider } from './services/data-provider';
import { AuthenticationService } from './services/authentication-service';

const app = express();
app.use(bodyParser.json());
// app.use(function(req, res, next) { 
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next(); 
// });
app.use(cors());
app.use(expressJwt({secret: JWT_SECRET}).unless(request => {
    if (["GET", "OPTIONS"].some(allowedMethod => allowedMethod === request.method)) {
        return true;
    }

    if (request.path == "/auth") {
        return true;
    }

    return false;
}));
app.use(logErrors);
function logErrors (err, req, res, next) {
    console.info(req.headers);
    next(err)
  }

const port = 3000;

const localDbPath = 'portfolio-db.json';

const dataProvider = new DataProvider(lowdb(new FileAsync(localDbPath)));
const hashHandler = new HashHandler("sha512");
const authenticationService = new AuthenticationService(dataProvider, hashHandler);

app.get('/', async (req, res) => {
    const data = await dataProvider.getPersonalData();
    res.json(data);
});

app.get('/projects', async (req, res) => {
    res.json(await dataProvider.getProjects());
});

app.post('/projects', async (req, res) => {
    // TODO: Create new project
});

app.put('/projects/:projectId', async (req, res) => {
    const newProject = req.body.project;
    try {
        await dataProvider.updateProject(req.params.projectId, newProject);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(404);
    }
});

app.get('/experiences', async (req, res) => {
    res.json(await dataProvider.getExperiences());
});

app.post('/auth', async (req, res) => {
    const body = req.body;

    const token = await authenticationService.authenticate(body.username, body.password);
    if (!token) {
        console.log(`Authentication failed for user ${body.username}`);
        return res.sendStatus(401);
    }

    console.log(`Authentication succeeded for user ${body.username}`);
    res.send({token});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
