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
Object.defineProperty(exports, "__esModule", { value: true });
class DataProvider {
    constructor(db) {
        this.db = db;
    }
    getPersonalData() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.db;
            const personalData = db.get('personalData').value();
            return Promise.resolve(personalData);
        });
    }
    getExperiences() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.db;
            const experiences = db.get('experiences', []).value();
            return Promise.resolve(experiences);
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.db;
            const projects = db.get('projects', []).value();
            return Promise.resolve(projects);
        });
    }
    getAdminByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.db;
            const administrators = db.get('administrators', []).value();
            return Promise.resolve(administrators.find(admin => admin.username == username));
        });
    }
    updateProject(projectId, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.db;
            yield db.get('projects').find({ id: projectId }).assign(project).write();
        });
    }
}
exports.DataProvider = DataProvider;
//# sourceMappingURL=data-provider.js.map