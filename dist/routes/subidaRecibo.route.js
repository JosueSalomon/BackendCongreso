"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subidaRecibo_controller_1 = require("../Controller/subidaRecibo.controller");
const routerRecibo = express_1.default.Router();
routerRecibo.post('/subirRecibo', subidaRecibo_controller_1.subirRecibo);
exports.default = routerRecibo;
