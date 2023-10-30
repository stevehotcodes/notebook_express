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
exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.addNewNote = void 0;
const dbConnectionService_1 = require("../services/dbConnectionService");
const uuid_1 = require("uuid");
function addNewNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = (0, uuid_1.v4)();
        let note = req.body;
        let { title, content } = note;
        let pool = yield (0, dbConnectionService_1.dbConnectService)();
        if (pool === null || pool === void 0 ? void 0 : pool.connected) {
            console.log('connected');
        }
        pool === null || pool === void 0 ? void 0 : pool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return err;
            }
            else {
                console.log("hey I am the start of the adding function");
                let insertNoteQueryStr = `INSERT INTO notes (id, title, content) VALUES (@id, @title, @content)`;
                yield (pool === null || pool === void 0 ? void 0 : pool.request().input('id', id).input('title', title).input('content', content).query(insertNoteQueryStr));
                // console.log(result)
                return res.status(200).json({ message: "note added" });
            }
        }));
    });
}
exports.addNewNote = addNewNote;
function getAllNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = yield (0, dbConnectionService_1.dbConnectService)();
        pool === null || pool === void 0 ? void 0 : pool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return err;
            }
            else {
                let insertNoteQueryStr = `SELECT * FROM  notes `;
                let result = yield (pool === null || pool === void 0 ? void 0 : pool.request().query(insertNoteQueryStr));
                console.log(result);
                res.status(200).json(result === null || result === void 0 ? void 0 : result.recordset);
            }
        }));
    });
}
exports.getAllNotes = getAllNotes;
function updateNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params;
        let content = req.body;
        let pool = yield (0, dbConnectionService_1.dbConnectService)();
        pool === null || pool === void 0 ? void 0 : pool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            let updatedNoteQueryStr = `UPDATE notes SET content=${content} WHERE id=${id}`;
            let result = yield (pool === null || pool === void 0 ? void 0 : pool.request().query(updatedNoteQueryStr));
            console.log(result);
        }));
    });
}
exports.updateNote = updateNote;
function deleteNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        let pool = yield (0, dbConnectionService_1.dbConnectService)();
        pool === null || pool === void 0 ? void 0 : pool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return err.message;
            }
            let deletedQueryStr = `DELETE FROM  notes  WHERE id=@id`;
            let result = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('id', id).query(deletedQueryStr));
            console.log(result);
        }));
    });
}
exports.deleteNote = deleteNote;
