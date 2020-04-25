import express from "express";
import { DataProvider } from './data-providers/data-provider';
import lowdb = require("lowdb");
import FileAsync from 'lowdb/adapters/FileAsync';

const app = express();
app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); next(); });

const port = 3000;

const localDbPath = 'portfolio-db.json';

const dataProvider = new DataProvider(lowdb(new FileAsync(localDbPath)));

app.get('/', async (req, res) => {
    const data = await dataProvider.GetPersonalData();
    res.json(data);
});

app.get('/projects', async (req, res) => {
    res.json(await dataProvider.GetProjects());
});

app.get('/experiences', async (req, res) => {
    res.json(await dataProvider.GetExperiences());
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
