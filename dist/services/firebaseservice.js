"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
//uso de firebase
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.apikey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectID,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(firebaseApp);
