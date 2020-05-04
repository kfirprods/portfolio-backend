import {PersonalData} from 'portfolio-types/models/personal-data';
import {Project} from 'portfolio-types/models/project';
import {Experience} from 'portfolio-types/models/experience';
import {AdministratorInfo} from 'portfolio-types/models/administrator-info';

import lowdb = require("lowdb");

type Schema = {
    personalData: PersonalData;
    projects: Project[];
    experiences: Experience[];
    administratorInfo: AdministratorInfo;
};

export class DataProvider  {
    constructor(private db: Promise<lowdb.LowdbAsync<Schema>>) {
    }

    async getPersonalData() {
        const db = await this.db;
        const personalData = db.get('personalData').value();
        return Promise.resolve(personalData);
    }

    async getExperiences() {
        const db = await this.db;
        const experiences = db.get('experiences', []).value();
        return Promise.resolve(experiences);
    }

    async getProjects() {
        const db = await this.db;
        const projects = db.get('projects', []).value();
        return Promise.resolve(projects);
    }

    async getAdminByUsername(username: string): Promise<AdministratorInfo> {
        const db = await this.db;
        const administrators: AdministratorInfo[] = db.get('administrators', []).value();
        
        return Promise.resolve(administrators.find(admin => admin.username == username));
    }

    async updateProject(projectId: string, project: Project): Promise<void> {
        const db = await this.db;
        await db.get('projects').find({id: projectId}).assign(project).write();
    }
}
