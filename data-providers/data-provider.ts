/* 
    A data provider using the lowdb npm package
*/

import lowdb = require("lowdb");

import { PersonalData } from "../models/personal-data";
import { Project } from '../models/project';
import { Experience } from '../models/experience';

type Schema = {
    personalData: PersonalData;
    projects: Project[];
    experiences: Experience[];
};

export class DataProvider  {
    constructor(private db: Promise<lowdb.LowdbAsync<Schema>>) {
    }

    async GetPersonalData() {
        const db = await this.db;
        const personalData = db.get('personalData').value();
        return Promise.resolve(personalData);
    }

    async GetExperiences() {
        const db = await this.db;
        const experiences = db.get('experiences', []).value();
        return Promise.resolve(experiences);
    }

    async GetProjects() {
        const db = await this.db;
        const projects = db.get('projects', []).value();
        return Promise.resolve(projects);
    }
}
